"use client"

import Image from "next/image"
import { Heart, Edit3 } from "lucide-react"

const posts = [
  {
    id: 1,
    title: "来深圳总要去一趟东门老街吧",
    image: "/images/dongmen-street.jpg",
    aspectTall: true,
    likes: 200,
    liked: true,
    description: "东门老街游玩攻略，助你轻松逛完这条老街",
    avatar: "S",
    author: "深圳小探",
  },
  {
    id: 2,
    title: "老街站citywalk | 东门游玩攻略（美食版）",
    image: "/images/dongmen-food.jpg",
    aspectTall: false,
    likes: 200,
    liked: true,
    avatar: "M",
    author: "美食猎手",
  },
  {
    id: 3,
    title: "东门老街 -- 深圳人记忆中的时光",
    image: "/images/shopping-street.jpg",
    aspectTall: true,
    likes: 200,
    liked: false,
    avatar: "L",
    author: "老深圳",
  },
  {
    id: 4,
    title: "都市里的\"购物天堂\" | 东门步行街",
    image: "/images/city-skyline.jpg",
    aspectTall: false,
    likes: 136,
    liked: false,
    avatar: "D",
    author: "都市漫步",
  },
]

export function RecommendView() {
  const leftPosts = posts.filter((_, i) => i % 2 === 0)
  const rightPosts = posts.filter((_, i) => i % 2 === 1)

  return (
    <div className="relative bg-background">
      {/* Masonry layout */}
      <div className="flex gap-2.5 px-3 py-3">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-2.5">
          {leftPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {/* Right column */}
        <div className="flex-1 flex flex-col gap-2.5">
          {rightPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Floating action button */}
      <button
        className="sticky bottom-4 left-full ml-auto mr-4 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:bg-primary/90 active:scale-95 transition-all z-10"
        aria-label="发布"
      >
        <Edit3 className="w-5 h-5" />
      </button>
    </div>
  )
}

interface PostCardProps {
  post: {
    id: number
    title: string
    image: string
    aspectTall: boolean
    likes: number
    liked: boolean
    description?: string
    avatar: string
    author: string
  }
}

function PostCard({ post }: PostCardProps) {
  return (
    <div className="rounded-xl bg-card overflow-hidden shadow-sm border border-border/50">
      {/* Image */}
      <div className={`relative w-full ${post.aspectTall ? "aspect-[3/4]" : "aspect-[4/3]"} overflow-hidden`}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      {/* Content */}
      <div className="p-2.5">
        <h3 className="text-xs font-semibold text-foreground leading-snug line-clamp-2 mb-1.5">
          {post.title}
        </h3>
        {post.description && (
          <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2 mb-1.5">
            {post.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] font-bold text-primary">
              {post.avatar}
            </div>
            <span className="text-[10px] text-muted-foreground">{post.author}</span>
          </div>
          <button className="flex items-center gap-0.5">
            <Heart
              className={`w-3.5 h-3.5 ${
                post.liked ? "fill-red-500 text-red-500" : "text-muted-foreground"
              }`}
            />
            <span className={`text-[10px] font-medium ${post.liked ? "text-red-500" : "text-muted-foreground"}`}>
              {post.likes}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
