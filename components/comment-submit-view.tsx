"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Camera, Star, Loader2, CheckCircle } from "lucide-react"

interface CommentSubmitViewProps {
  placeName?: string
  placeImage?: string
  onClose?: () => void
  onSuccess?: () => void
}

export function CommentSubmitView({ 
  placeName = "思月书院", 
  placeImage = "/images/siyue-academy.jpg",
  onClose, 
  onSuccess 
}: CommentSubmitViewProps) {
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleAddPhoto = () => {
    if (photos.length < 9) {
      setPhotos([...photos, placeImage])
    }
  }

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!content.trim() || rating === 0) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => {
        onSuccess?.()
      }, 1500)
    }, 1000)
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
        <div className="bg-card rounded-2xl p-6 w-full max-w-sm text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">评论发布成功</h2>
          <p className="text-sm text-muted-foreground">感谢你的分享!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center">
          <X className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">发布评论</h1>
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || rating === 0 || isSubmitting}
          className="text-sm font-medium text-primary disabled:text-muted-foreground"
        >
          {isSubmitting ? "发布中..." : "发布"}
        </button>
      </div>

      <div className="p-4">
        {/* Place info */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 mb-4">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={placeImage} alt={placeName} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-medium text-foreground text-sm">{placeName}</h3>
            <p className="text-xs text-muted-foreground">分享你的体验</p>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label className="text-sm font-medium text-foreground mb-2 block">评分</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-0.5"
              >
                <Star 
                  className={`w-7 h-7 ${
                    star <= rating 
                      ? "text-amber-400 fill-amber-400" 
                      : "text-muted-foreground/30"
                  }`} 
                />
              </button>
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              {rating > 0 ? ["", "很差", "较差", "一般", "很好", "非常好"][rating] : "点击评分"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="text-sm font-medium text-foreground mb-2 block">评论内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享你在这里的体验和感受..."
            className="w-full h-32 px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            maxLength={500}
          />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-muted-foreground">{content.length}/500</span>
          </div>
        </div>

        {/* Photos */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">添加图片 (最多9张)</label>
          <div className="grid grid-cols-4 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image src={photo} alt={`图片${index + 1}`} fill className="object-cover" />
                <button
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            {photos.length < 9 && (
              <button
                onClick={handleAddPhoto}
                className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 transition-colors"
              >
                <Camera className="w-5 h-5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">添加图片</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || rating === 0 || isSubmitting}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              发布中...
            </>
          ) : (
            "发布评论"
          )}
        </button>
      </div>
    </div>
  )
}
