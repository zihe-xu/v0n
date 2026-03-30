"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  Flame, ThumbsUp, Share2, Heart, Star, Phone, MapPin, Navigation, X, 
  Clock, ChevronLeft, ChevronRight, Camera, CheckCircle, MessageCircle, Send, User
} from "lucide-react"
import { placesData, commentsData, formatDistance, isWithinCheckinRange, type Place, type Comment } from "@/lib/explore-data"

interface DetailViewProps {
  placeId?: string
  onClose?: () => void
  onBack?: () => void
  onCheckinSuccess?: (placeId: string) => void
}

// 打卡成功弹窗
function CheckinSuccessModal({ 
  place, 
  onClose, 
  withPhoto 
}: { 
  place: Place
  onClose: () => void
  withPhoto: boolean 
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-card rounded-2xl w-full max-w-[280px] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* 邮戳动画区域 */}
        <div className="relative h-48 bg-gradient-to-br from-primary/10 to-orange-50 flex items-center justify-center">
          <div className="relative">
            {/* 邮戳图片 */}
            <div className="w-32 h-32 rounded-full bg-card shadow-xl flex items-center justify-center border-4 border-primary/20 animate-bounce">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
            </div>
            {/* 成功标记 */}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        </div>
        
        <div className="p-5 text-center">
          <h3 className="text-lg font-bold text-foreground mb-1">打卡成功</h3>
          <p className="text-sm text-muted-foreground mb-2">恭喜获得「{place.name}」邮戳</p>
          {withPhoto && (
            <p className="text-xs text-primary">照片已保存至打卡记录</p>
          )}
          
          <div className="flex gap-2 mt-5">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium"
            >
              关闭
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
            >
              查看邮戳墙
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 打卡确认弹窗
function CheckinConfirmModal({ 
  place, 
  onClose, 
  onConfirm 
}: { 
  place: Place
  onClose: () => void
  onConfirm: (withPhoto: boolean) => void
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="bg-card rounded-t-2xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom duration-300">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-foreground">确认打卡</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 mb-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={place.coverImage}
                alt={place.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground truncate">{place.name}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                距您 {formatDistance(place.distance || 0)}
              </p>
            </div>
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          </div>
          
          <p className="text-sm text-muted-foreground mb-5 text-center">
            您已到达打卡范围内，是否要拍照留念？
          </p>
          
          <div className="flex gap-3">
            <button 
              onClick={() => onConfirm(false)}
              className="flex-1 py-3 rounded-xl bg-muted text-foreground text-sm font-medium"
            >
              直接打卡
            </button>
            <button 
              onClick={() => onConfirm(true)}
              className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-1.5"
            >
              <Camera className="w-4 h-4" />
              拍照打卡
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 距离超出弹窗
function DistanceWarningModal({ 
  place, 
  onClose 
}: { 
  place: Place
  onClose: () => void 
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-card rounded-2xl w-full max-w-[280px] overflow-hidden">
        <div className="p-5 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 mx-auto mb-4 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-base font-bold text-foreground mb-2">距离过远</h3>
          <p className="text-sm text-muted-foreground mb-1">
            您距离「{place.name}」还有 {formatDistance(place.distance || 0)}
          </p>
          <p className="text-xs text-muted-foreground mb-5">
            需要在300米范围内才能打卡哦
          </p>
          <button 
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  )
}

export function DetailView({ placeId, onClose, onBack, onCheckinSuccess }: DetailViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showCheckinConfirm, setShowCheckinConfirm] = useState(false)
  const [showCheckinSuccess, setShowCheckinSuccess] = useState(false)
  const [showDistanceWarning, setShowDistanceWarning] = useState(false)
  const [checkedInWithPhoto, setCheckedInWithPhoto] = useState(false)
  const [hasCheckedIn, setHasCheckedIn] = useState(false)
  const [commentText, setCommentText] = useState("")
  
  // 获取点位数据
  const place = placeId 
    ? placesData.find(p => p.id === placeId) 
    : placesData[0]
  
  if (!place) return null
  
  // 获取该点位的评论
  const placeComments = commentsData.filter(c => c.placeId === place.id && c.status === "approved")
  
  const handleCheckin = () => {
    // 检查距离
    if (!isWithinCheckinRange(place.distance || 0)) {
      setShowDistanceWarning(true)
      return
    }
    setShowCheckinConfirm(true)
  }
  
  const handleConfirmCheckin = (withPhoto: boolean) => {
    setShowCheckinConfirm(false)
    setCheckedInWithPhoto(withPhoto)
    setShowCheckinSuccess(true)
    setHasCheckedIn(true)
    onCheckinSuccess?.(place.id)
  }

  return (
    <div className="bg-card overflow-y-auto h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* 图片轮播 */}
      <div className="relative w-full aspect-[4/3] bg-muted overflow-hidden">
        <Image
          src={place.images[currentImageIndex] || place.coverImage}
          alt={place.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        
        {/* 返回按钮 */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-3 top-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        
        {/* 关闭按钮 */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        
        {/* 导航按钮 */}
        <button 
          className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
          aria-label="导航"
        >
          <Navigation className="w-5 h-5" />
        </button>
        
        {/* 图片指示器 */}
        {place.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {place.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
        
        {/* 推荐角标 */}
        {place.isRecommended && (
          <div className="absolute top-3 left-12 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            <Star className="w-3 h-3 fill-current" />
            官方推荐
          </div>
        )}
      </div>

      {/* Detail content */}
      <div className="px-4 py-4">
        {/* Title row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground">{place.name}</h2>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-xs font-medium">
                <Flame className="w-3 h-3" />
                热门
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <ThumbsUp className="w-3 h-3" />
                {place.likes}
              </span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                {place.checkins}人已打卡
              </span>
            </div>
          </div>
          {place.distance && (
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-xs text-muted-foreground">距您</p>
              <p className="text-sm font-semibold text-primary">{formatDistance(place.distance)}</p>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {place.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/80 leading-relaxed mb-2">
          {place.description}
        </p>
        {place.detailDescription && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {place.detailDescription}
          </p>
        )}

        {/* Interaction buttons */}
        <div className="flex items-center gap-2 mb-4">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isLiked 
                ? "bg-red-500 text-white" 
                : "bg-red-50 text-red-500 hover:bg-red-100"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            点赞({place.likes + (isLiked ? 1 : 0)})
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
            <Share2 className="w-4 h-4" />
            分享
          </button>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-2.5 p-3 rounded-xl bg-muted/50 mb-4">
          {place.phone && (
            <div className="flex items-center gap-2.5 text-sm text-foreground/80">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground">联系电话</span>
                <p className="font-medium text-foreground">{place.phone}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2.5 text-sm text-foreground/80">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">详细地址</span>
              <p className="font-medium text-foreground">{place.address}</p>
            </div>
          </div>
          {place.openingHours && (
            <div className="flex items-center gap-2.5 text-sm text-foreground/80">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground">开放时间</span>
                <p className="font-medium text-foreground">{place.openingHours}</p>
              </div>
            </div>
          )}
        </div>

        {/* Comments section */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-primary" />
            评论 ({placeComments.length})
          </h3>
          
          {placeComments.length > 0 ? (
            <div className="space-y-3">
              {placeComments.map(comment => (
                <div key={comment.id} className="flex gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium text-foreground">{comment.userName}</span>
                      <span className="text-[10px] text-muted-foreground">{comment.createdAt}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{comment.content}</p>
                    <button className="flex items-center gap-0.5 mt-1 text-[10px] text-muted-foreground">
                      <ThumbsUp className="w-3 h-3" />
                      {comment.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-4">暂无评论，快来抢沙发吧</p>
          )}
          
          {/* Comment input */}
          <div className="flex items-center gap-2 mt-3 p-2 rounded-xl bg-muted/50">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="发表评论（140字以内）"
              maxLength={140}
              className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Send className="w-3.5 h-3.5 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Fixed bottom checkin button */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <button 
          onClick={handleCheckin}
          disabled={hasCheckedIn}
          className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
            hasCheckedIn 
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          {hasCheckedIn ? "已打卡（每个点位仅限一次）" : "去打卡"}
        </button>
      </div>
      
      {/* Modals */}
      {showCheckinConfirm && (
        <CheckinConfirmModal
          place={place}
          onClose={() => setShowCheckinConfirm(false)}
          onConfirm={handleConfirmCheckin}
        />
      )}
      
      {showCheckinSuccess && (
        <CheckinSuccessModal
          place={place}
          onClose={() => setShowCheckinSuccess(false)}
          withPhoto={checkedInWithPhoto}
        />
      )}
      
      {showDistanceWarning && (
        <DistanceWarningModal
          place={place}
          onClose={() => setShowDistanceWarning(false)}
        />
      )}
    </div>
  )
}
