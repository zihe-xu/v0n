"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Camera, X, CheckCircle, Navigation, Loader2 } from "lucide-react"

interface CheckinViewProps {
  placeName?: string
  placeImage?: string
  onClose?: () => void
  onSuccess?: () => void
}

export function CheckinView({ 
  placeName = "思月书院", 
  placeImage = "/images/siyue-academy.jpg",
  onClose, 
  onSuccess 
}: CheckinViewProps) {
  const [isLocating, setIsLocating] = useState(false)
  const [isInRange, setIsInRange] = useState(false)
  const [hasPhoto, setHasPhoto] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleLocate = () => {
    setIsLocating(true)
    // Simulate location check
    setTimeout(() => {
      setIsLocating(false)
      setIsInRange(true)
    }, 1500)
  }

  const handleTakePhoto = () => {
    setHasPhoto(true)
  }

  const handleSubmit = () => {
    if (!isInRange) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => {
        onSuccess?.()
      }, 2000)
    }, 1000)
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6">
        <div className="bg-card rounded-2xl p-6 w-full max-w-sm text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">打卡成功!</h2>
          <p className="text-sm text-muted-foreground mb-4">恭喜你完成 {placeName} 的打卡</p>
          
          {/* Stamp card */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="absolute inset-0 rounded-xl border-4 border-primary rotate-12 opacity-30" />
            <div className="absolute inset-2 rounded-lg bg-primary/10 flex flex-col items-center justify-center p-2">
              <span className="text-xs text-primary font-medium">已收集</span>
              <span className="text-lg font-bold text-primary">{placeName}</span>
              <span className="text-[10px] text-muted-foreground mt-1">邮戳</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">邮戳已添加到你的收藏</p>
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
        <h1 className="text-base font-semibold text-foreground">景点打卡</h1>
        <div className="w-8" />
      </div>

      <div className="p-4">
        {/* Place info */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 mb-6">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={placeImage} alt={placeName} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{placeName}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">完成打卡即可收集邮戳</p>
          </div>
        </div>

        {/* Step 1: Location */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isInRange ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              1
            </div>
            <span className="font-medium text-foreground">位置验证</span>
            {isInRange && <CheckCircle className="w-4 h-4 text-primary ml-auto" />}
          </div>
          
          <div className="p-4 rounded-xl border border-border">
            {!isInRange ? (
              <>
                <p className="text-sm text-muted-foreground mb-3">
                  请确保您在景点 <span className="text-primary font-medium">300米</span> 范围内
                </p>
                <button
                  onClick={handleLocate}
                  disabled={isLocating}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-medium disabled:opacity-50"
                >
                  {isLocating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      定位中...
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4" />
                      获取位置
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">已确认在打卡范围内</span>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Photo (Optional) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              hasPhoto ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              2
            </div>
            <span className="font-medium text-foreground">拍照留念</span>
            <span className="text-xs text-muted-foreground">(可选)</span>
            {hasPhoto && <CheckCircle className="w-4 h-4 text-primary ml-auto" />}
          </div>
          
          <div className="p-4 rounded-xl border border-border">
            {!hasPhoto ? (
              <button
                onClick={handleTakePhoto}
                className="w-full flex flex-col items-center justify-center gap-2 py-6 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Camera className="w-6 h-6 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">点击拍照</span>
              </button>
            ) : (
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                <Image src={placeImage} alt="打卡照片" fill className="object-cover" />
                <button 
                  onClick={() => setHasPhoto(false)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!isInRange || isSubmitting}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              提交中...
            </>
          ) : (
            "确认打卡"
          )}
        </button>
        
        {!isInRange && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            请先完成位置验证
          </p>
        )}
      </div>
    </div>
  )
}
