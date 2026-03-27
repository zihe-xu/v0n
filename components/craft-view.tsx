"use client"

import Image from "next/image"
import { Heart, MessageCircle, Calendar } from "lucide-react"

const craftPosts = [
  {
    id: 1,
    title: "社区活动 | 萌马手作，挂件载好运...",
    image: "/images/craft-horse.jpg",
    author: "小酱在柯桥",
    avatar: "J",
    avatarBg: "bg-rose-500",
    date: "2025-12-29",
    likes: 10,
    comments: 10,
  },
  {
    id: 2,
    title: "社区活动 | 萌马手作，挂件载好运...",
    image: "/images/craft-ornament.jpg",
    author: "小酱在柯桥",
    avatar: "J",
    avatarBg: "bg-rose-500",
    date: "2025-12-29",
    likes: 10,
    comments: 10,
  },
  {
    id: 3,
    title: "新年福结 | 手工编织中国结挂饰",
    image: "/images/product-rope.jpg",
    author: "手工达人",
    avatar: "H",
    avatarBg: "bg-amber-500",
    date: "2025-12-28",
    likes: 28,
    comments: 5,
  },
  {
    id: 4,
    title: "布艺花束 | 永不凋谢的春日花园",
    image: "/images/craft-horse.jpg",
    author: "花艺小组",
    avatar: "F",
    avatarBg: "bg-pink-500",
    date: "2025-12-25",
    likes: 42,
    comments: 8,
  },
  {
    id: 5,
    title: "DIY手绘帆布包 | 周末亲子活动",
    image: "/images/craft-ornament.jpg",
    author: "亲子乐园",
    avatar: "Q",
    avatarBg: "bg-sky-500",
    date: "2025-12-22",
    likes: 35,
    comments: 12,
  },
  {
    id: 6,
    title: "陶艺工坊 | 用泥土塑造温度",
    image: "/images/product-rope.jpg",
    author: "陶艺大师",
    avatar: "T",
    avatarBg: "bg-orange-500",
    date: "2025-12-20",
    likes: 56,
    comments: 15,
  },
]

export function CraftView() {
  return (
    <div className="bg-background">
      {/* Section title */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-base font-bold text-foreground">社区手工工社</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2.5 px-3 pb-4">
        {craftPosts.map((post) => (
          <CraftCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

interface CraftCardProps {
  post: {
    id: number
    title: string
    image: string
    author: string
    avatar: string
    avatarBg: string
    date: string
    likes: number
    comments: number
  }
}

function CraftCard({ post }: CraftCardProps) {
  return (
    <button className="flex flex-col text-left bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 group">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-2.5 flex flex-col gap-1.5">
        <h3 className="text-xs font-semibold text-foreground leading-snug line-clamp-2">
          {post.title}
        </h3>

        {/* Date */}
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Calendar className="w-2.5 h-2.5" />
          {post.date}
        </div>

        {/* Author + stats */}
        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <div className="flex items-center gap-1">
            <div
              className={`w-4.5 h-4.5 rounded-full ${post.avatarBg} flex items-center justify-center text-[8px] font-bold text-card`}
              style={{ width: 18, height: 18 }}
            >
              {post.avatar}
            </div>
            <span className="text-[10px] text-muted-foreground line-clamp-1 max-w-[60px]">
              {post.author}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
              <Heart className="w-3 h-3" />
              {post.likes}
            </span>
            <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
              <MessageCircle className="w-3 h-3" />
              {post.comments}
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}
