"use client"

import { useState } from "react"
import Image from "next/image"
import { Flame, ThumbsUp, Share2, Heart, Star, Phone, MapPin, Navigation, X, Stamp, MessageCircle, Send, ChevronRight, CalendarCheck } from "lucide-react"

interface Comment {
  id: number
  user: string
  avatar: string
  content: string
  time: string
  likes: number
  images?: string[]
}

interface DetailViewProps {
  onClose?: () => void
  onCheckin?: () => void
  onComment?: () => void
  onBookVenue?: () => void
}

// 可预约场所列表（与景点名称对应）
const BOOKABLE_PLACES = ["深圳市兰科植物保护中心", "深圳金石艺术术博物馆", "思月书院", "深圳金石艺术博物馆"]

export function DetailView({ onClose, onCheckin, onComment, onBookVenue }: DetailViewProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(200)
  const placeName = "思月书院"
  const isBookable = BOOKABLE_PLACES.includes(placeName)

  const comments: Comment[] = [
    {
      id: 1,
      user: "小明",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
      content: "这里太美了!周末带家人来的，环境清幽，很适合放松身心。强烈推荐!",
      time: "2小时前",
      likes: 12,
      images: ["/images/siyue-academy.jpg"]
    },
    {
      id: 2,
      user: "历史爱好者",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      content: "了解深圳历史的好地方，建筑保存得很好，讲解员也很专业。",
      time: "1天前",
      likes: 8
    }
  ]

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div className="bg-card">
      {/* Mini Map */}
      <div className="relative w-full h-48 bg-emerald-50 overflow-hidden">
        <Image
          src="/images/community-map.jpg"
          alt="金岭社区地图"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/50" />
        {/* Active marker */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-lg flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            思月书院
          </div>
          <div className="w-0.5 h-4 bg-primary" />
          <div className="w-2 h-2 rounded-full bg-primary shadow" />
        </div>
        
        {/* Navigation arrow button */}
        <button className="absolute right-3 top-3 w-8 h-8 rounded-full bg-primary/90 text-primary-foreground shadow-md flex items-center justify-center hover:bg-primary transition-colors" aria-label="导航">
          <Navigation className="w-4 h-4" />
        </button>
        
        {onClose && (
          <button
            onClick={onClose}
            className="absolute left-3 top-3 w-8 h-8 rounded-full bg-card/90 text-foreground shadow-md flex items-center justify-center hover:bg-card transition-colors"
            aria-label="关闭"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Detail card */}
      <div className="px-4 py-4">
        {/* Title row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-foreground">思月书院</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-xs font-medium">
                <Flame className="w-3 h-3" />
                热门
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <ThumbsUp className="w-3 h-3" />
                {likeCount}
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-xs font-medium">
                <Stamp className="w-3 h-3" />
                已有128人打卡
              </span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-md">
          <Image
            src="/images/siyue-academy.jpg"
            alt="思月书院"
            fill
            className="object-cover"
          />
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          始建于清康熙年间，原为张姓宗祠，曾作为省港大罢工接待站，现为市级文物保护单位。书院重建后保留了岭南建筑风格，展示东门历史文化，是了解深圳城市变迁的重要窗口。
        </p>

        {/* Action buttons row */}
        <div className={`grid gap-2 mb-4 ${isBookable ? "grid-cols-2" : "grid-cols-1"}`}>
          <button 
            onClick={onCheckin}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
          >
            <Stamp className="w-5 h-5" />
            立即打卡
          </button>
          {isBookable && (
            <button 
              onClick={onBookVenue}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
            >
              <CalendarCheck className="w-5 h-5" />
              预约场地
            </button>
          )}
        </div>

        {/* Interaction buttons */}
        <div className="flex items-center gap-2 mb-4">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
            <Share2 className="w-4 h-4" />
            分享(2)
          </button>
          <button 
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              liked 
                ? "bg-red-500 text-white" 
                : "bg-red-50 text-red-500 hover:bg-red-100"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            点赞({likeCount})
          </button>
          <button 
            onClick={onComment}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-50 text-amber-600 text-sm font-medium hover:bg-amber-100 transition-colors"
          >
            <Star className="w-4 h-4" />
            评论(2)
          </button>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-2.5 p-3 rounded-xl bg-muted/50 mb-4">
          <div className="flex items-center gap-2.5 text-sm text-foreground/80">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">联系电话</span>
              <p className="font-medium text-foreground">58801784</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-foreground/80">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">详细地址</span>
              <p className="font-medium text-foreground">雪野路34弄</p>
            </div>
          </div>
        </div>

        {/* Comments section */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-primary" />
              评论区 ({comments.length})
            </h3>
            <button 
              onClick={onComment}
              className="text-xs text-primary font-medium flex items-center gap-0.5"
            >
              写评论
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Comments list */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={comment.avatar} alt={comment.user} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{comment.user}</span>
                    <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                  </div>
                  <p className="text-sm text-foreground/80 mb-2">{comment.content}</p>
                  {comment.images && comment.images.length > 0 && (
                    <div className="flex gap-1 mb-2">
                      {comment.images.map((img, idx) => (
                        <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image src={img} alt="" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ThumbsUp className="w-3 h-3" />
                    {comment.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comment input */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
                alt="我的头像" 
                fill 
                className="object-cover" 
              />
            </div>
            <button 
              onClick={onComment}
              className="flex-1 px-3 py-2 rounded-full bg-muted text-sm text-muted-foreground text-left"
            >
              写下你的评论...
            </button>
            <button 
              onClick={onComment}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
            >
              <Send className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
