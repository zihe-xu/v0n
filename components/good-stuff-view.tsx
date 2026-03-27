"use client"

import Image from "next/image"
import { MessageCircle, ThumbsUp, Heart, ChevronRight } from "lucide-react"

const posts = [
  {
    id: 1,
    title: "沃尔玛无限回购好物分享来咯！",
    avatar: "W",
    avatarBg: "bg-emerald-500",
    author: "好物蓬蓬的一半",
    content:
      "沃尔玛无限回购好物分享来咯！这三样真的是我每次去必买的宝藏零食 -- 一年四季都要囤！",
    images: ["/images/good-stuff-1.jpg", "/images/good-stuff-2.jpg", "/images/dongmen-food.jpg"],
    replies: 1,
    likes: 41,
    time: "2个月前",
    tags: ["好物"],
    highlighted: ["好物分享", "好物"],
  },
  {
    id: 2,
    title: "好物分享 | 分享能提升你幸福感的好物吧",
    avatar: "F",
    avatarBg: "bg-pink-500",
    author: "社区福利官",
    content:
      "宝藏琳琅！搭配了猫头的硅胶套和喵喵挤压器，看上更萌了，还送了联名的贴纸和包装袋，小女生一定很喜欢！",
    images: ["/images/good-stuff-2.jpg", "/images/good-stuff-1.jpg"],
    replies: 48,
    likes: 136,
    time: "3个月前",
    tags: ["好物"],
    highlighted: ["好物分享", "好物"],
  },
]

export function GoodStuffView() {
  return (
    <div className="bg-background">
      {/* Section header */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-base font-bold text-foreground">好物分享</h2>
      </div>

      {/* Posts list */}
      <div className="flex flex-col">
        {posts.map((post, index) => (
          <div key={post.id}>
            {index > 0 && <div className="h-2 bg-muted/50" />}
            <PostItem post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

function highlightText(text: string, highlights: string[]) {
  let result = text
  highlights.forEach((h) => {
    result = result.replace(
      new RegExp(h, "g"),
      `<span class="text-primary font-semibold">${h}</span>`
    )
  })
  return result
}

interface PostItemProps {
  post: {
    id: number
    title: string
    avatar: string
    avatarBg: string
    author: string
    content: string
    images: string[]
    replies: number
    likes: number
    time: string
    tags: string[]
    highlighted: string[]
  }
}

function PostItem({ post }: PostItemProps) {
  return (
    <div className="px-4 py-3">
      {/* Title */}
      <h3
        className="text-sm font-bold text-foreground mb-2 leading-snug"
        dangerouslySetInnerHTML={{ __html: highlightText(post.title, post.highlighted) }}
      />

      {/* Stats */}
      <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2.5">
        <span>{post.replies}{'回答'}</span>
        <span>{post.likes}{'赞'}</span>
      </div>

      {/* Author row */}
      <div className="flex items-start gap-2.5 mb-2.5">
        <div
          className={`w-7 h-7 rounded-full ${post.avatarBg} flex items-center justify-center text-[11px] font-bold text-card flex-shrink-0`}
        >
          {post.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground mb-0.5">{post.author}</p>
          <p
            className="text-xs text-foreground/80 leading-relaxed line-clamp-3"
            dangerouslySetInnerHTML={{ __html: highlightText(post.content, post.highlighted) }}
          />
        </div>
      </div>

      {/* Images row */}
      {post.images.length > 0 && (
        <div className="flex gap-1.5 mb-2.5 overflow-x-auto scrollbar-hide">
          {post.images.map((img, i) => (
            <div
              key={i}
              className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted"
            >
              <Image src={img} alt={`分享图片 ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Time */}
      <p className="text-[10px] text-muted-foreground">{post.time}</p>
    </div>
  )
}
