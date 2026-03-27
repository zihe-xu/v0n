"use client"

import { useState } from "react"
import { ChevronLeft, Calendar, MapPin, Clock, Users, Share2, Heart } from "lucide-react"
import Image from "next/image"

const boothLayout = [
  { id: "A-01", status: "occupied" },
  { id: "A-02", status: "occupied" },
  { id: "A-03", status: "occupied" },
  { id: "A-04", status: "available", label: "转角C位" },
  { id: "B-01", status: "available" },
  { id: "B-02", status: "available" },
  { id: "B-03", status: "occupied" },
  { id: "B-04", status: "available" },
  { id: "C-01", status: "available" },
  { id: "C-02", status: "available" },
  { id: "C-03", status: "available" },
  { id: "C-04", status: "occupied" },
]

export function MarketDetailView() {
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null)

  return (
    <div className="flex-1 bg-background overflow-auto flex flex-col">
      {/* Header with Image */}
      <div className="relative h-48">
        <Image
          src="/images/market-trunk.jpg"
          alt="集市"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Back Button */}
        <button className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
            <Share2 className="w-4 h-4 text-foreground" />
          </button>
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
            <Heart className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-xl font-bold text-white">金岭周末后备箱集市</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded text-xs font-medium">
              正在招募
            </span>
            <span className="text-white/80 text-xs">剩余 12 个摊位</span>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="px-4 -mt-2 relative z-10">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">活动日期</div>
                <div className="text-sm font-medium">2024.01.20 (周六)</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">活动时间</div>
                <div className="text-sm font-medium">18:00-21:00</div>
              </div>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">活动地点</div>
                <div className="text-sm font-medium">社区外围停车场</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Introduction */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-4 bg-primary rounded-full" />
          <h2 className="font-bold text-foreground">活动介绍</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          这是年轻人的聚会！不仅有琳琅满目的商品，还有现场乐队演出。欢迎自带车辆参与后备箱摆摊，展示你的创意生活。现场还将提供免费饮品和小食，更有抽奖环节等你参与！
        </p>
      </div>

      {/* Booth Rules */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-4 bg-primary rounded-full" />
          <h2 className="font-bold text-foreground">摊位须知</h2>
        </div>
        <div className="bg-amber-50/50 rounded-xl p-3 space-y-2">
          <div className="flex items-start gap-2 text-sm">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium shrink-0">1</span>
            <span className="text-muted-foreground">每个摊位尺寸约 3m x 2m，可停放一辆小型车辆</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium shrink-0">2</span>
            <span className="text-muted-foreground">请于活动开始前 1 小时到场布置</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium shrink-0">3</span>
            <span className="text-muted-foreground">禁止销售食品、仿冒品及违禁物品</span>
          </div>
        </div>
      </div>

      {/* Booth Selection */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-primary rounded-full" />
            <h2 className="font-bold text-foreground">选择您的摊位</h2>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded border-2 border-border bg-white" />
              <span className="text-muted-foreground">可选</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-muted" />
              <span className="text-muted-foreground">已占</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-primary" />
              <span className="text-muted-foreground">已选</span>
            </div>
          </div>
        </div>

        {/* Booth Grid */}
        <div className="grid grid-cols-4 gap-2">
          {boothLayout.map((booth) => {
            const isSelected = selectedBooth === booth.id
            const isOccupied = booth.status === "occupied"
            
            return (
              <button
                key={booth.id}
                disabled={isOccupied}
                onClick={() => setSelectedBooth(isSelected ? null : booth.id)}
                className={`relative p-2 rounded-lg border-2 text-center transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : isOccupied
                    ? "border-transparent bg-muted cursor-not-allowed"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className={`text-sm font-medium ${isSelected ? "text-primary" : isOccupied ? "text-muted-foreground" : "text-foreground"}`}>
                  {booth.id}
                </div>
                <div className={`text-xs ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                  {booth.label || (isOccupied ? "已占" : "")}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-auto p-4 bg-card border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">当前选择</div>
            <div className={`font-bold ${selectedBooth ? "text-primary" : "text-muted-foreground"}`}>
              {selectedBooth || "未选择"}
            </div>
          </div>
          <button
            disabled={!selectedBooth}
            className={`px-8 py-2.5 rounded-full font-medium transition-colors ${
              selectedBooth
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            确认报名
          </button>
        </div>
      </div>
    </div>
  )
}
