"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, User, MapPin, Calendar, Camera, Grid3X3, List, ChevronRight } from "lucide-react"
import { placesData, checkinRecordsData, type CheckinRecord } from "@/lib/explore-data"

interface StampWallViewProps {
  onBack?: () => void
  onViewPlace?: (placeId: string) => void
}

// 模拟用户打卡数据
const userCheckins: CheckinRecord[] = checkinRecordsData.filter(r => r.userId === "u1")
const checkedPlaceIds = new Set(userCheckins.map(c => c.placeId))

export function StampWallView({ onBack, onViewPlace }: StampWallViewProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  
  const totalPlaces = placesData.filter(p => p.isOnline).length
  const checkedCount = userCheckins.length
  const progress = Math.round((checkedCount / totalPlaces) * 100)

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary to-orange-400 px-4 pt-3 pb-20 relative">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          {onBack && (
            <button onClick={onBack} className="w-8 h-8 flex items-center justify-center -ml-2">
              <ChevronLeft className="w-5 h-5 text-primary-foreground" />
            </button>
          )}
          <h1 className="text-lg font-bold text-primary-foreground flex-1 text-center">我的邮戳墙</h1>
          <div className="w-8" />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-16 right-8 w-16 h-16 rounded-full bg-white/5" />
      </div>

      {/* User info card */}
      <div className="mx-4 -mt-16 relative z-10 bg-card rounded-2xl shadow-lg border border-border/50 p-4 mb-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-orange-100 flex items-center justify-center ring-4 ring-white shadow-md">
            <User className="w-8 h-8 text-primary" />
          </div>
          {/* Info */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">李阿姨</h2>
            <p className="text-sm text-muted-foreground">金岭社区居民</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">打卡进度</span>
            <span className="text-sm font-semibold text-primary">{checkedCount}/{totalPlaces}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            已收集 {progress}% 的邮戳，继续加油！
          </p>
        </div>
      </div>

      {/* View mode toggle */}
      <div className="flex items-center justify-between px-4 mb-3">
        <h3 className="text-sm font-bold text-foreground">我的邮戳</h3>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          <button 
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-card shadow-sm" : ""}`}
            aria-label="网格视图"
          >
            <Grid3X3 className={`w-3.5 h-3.5 ${viewMode === "grid" ? "text-primary" : "text-muted-foreground"}`} />
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-card shadow-sm" : ""}`}
            aria-label="列表视图"
          >
            <List className={`w-3.5 h-3.5 ${viewMode === "list" ? "text-primary" : "text-muted-foreground"}`} />
          </button>
        </div>
      </div>

      {/* Stamps content */}
      <div className="flex-1 px-4 pb-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-3 gap-3">
            {placesData.filter(p => p.isOnline).map((place) => {
              const isChecked = checkedPlaceIds.has(place.id)
              const checkinRecord = userCheckins.find(c => c.placeId === place.id)
              
              return (
                <button
                  key={place.id}
                  onClick={() => isChecked && onViewPlace?.(place.id)}
                  disabled={!isChecked}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                    isChecked 
                      ? "bg-card border border-border/50 shadow-sm hover:border-primary/30" 
                      : "bg-muted/30 opacity-40"
                  }`}
                >
                  {/* Stamp icon */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                    isChecked 
                      ? "bg-gradient-to-br from-primary/10 to-orange-50 ring-2 ring-primary/20" 
                      : "bg-muted"
                  }`}>
                    {isChecked ? (
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                    ) : (
                      <MapPin className="w-6 h-6 text-muted-foreground/30" />
                    )}
                  </div>
                  
                  {/* Place name */}
                  <p className={`text-[11px] text-center font-medium line-clamp-2 ${
                    isChecked ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {place.name}
                  </p>
                  
                  {/* Checkin date */}
                  {isChecked && checkinRecord && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {checkinRecord.checkinTime.split(" ")[0]}
                    </p>
                  )}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {userCheckins.map((record) => {
              const place = placesData.find(p => p.id === record.placeId)
              if (!place) return null
              
              return (
                <button
                  key={record.id}
                  onClick={() => onViewPlace?.(place.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 shadow-sm text-left hover:border-primary/30 transition-colors"
                >
                  {/* Stamp */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-orange-50 flex items-center justify-center flex-shrink-0 ring-2 ring-primary/20">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground truncate">{place.name}</h4>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {record.checkinTime}
                      </span>
                      {record.photo && (
                        <span className="flex items-center gap-0.5 text-[10px] text-primary">
                          <Camera className="w-3 h-3" />
                          有照片
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </button>
              )
            })}
            
            {userCheckins.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <MapPin className="w-12 h-12 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">暂无打卡记录</p>
                <p className="text-xs text-muted-foreground mt-1">快去探索社区，收集专属邮戳吧</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
