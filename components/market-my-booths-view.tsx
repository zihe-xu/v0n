"use client"

import { ChevronLeft, Calendar, MapPin, Clock, MoreHorizontal, Store } from "lucide-react"
import Image from "next/image"

const myBooths = [
  {
    id: 1,
    marketName: "金岭周末后备箱集市",
    boothId: "A-04",
    boothLabel: "转角C位",
    date: "2024.01.20",
    time: "18:00-21:00",
    location: "社区外围停车场",
    image: "/images/market-trunk.jpg",
    status: "upcoming",
    stallName: "小明的宝贝铺",
    category: "手工饰品",
  },
  {
    id: 2,
    marketName: "新年手工艺品展",
    boothId: "B-02",
    boothLabel: "",
    date: "2024.01.27",
    time: "10:00-17:00",
    location: "党群中心大厅",
    image: "/images/market-handcraft.jpg",
    status: "pending",
    stallName: "创意手作坊",
    category: "手工艺品",
  },
  {
    id: 3,
    marketName: "亲子跳蚤市场·儿童专场",
    boothId: "C-05",
    boothLabel: "",
    date: "2023.12.15",
    time: "14:00-18:00",
    location: "中心花园广场",
    image: "/images/market-kids.jpg",
    status: "completed",
    stallName: "童趣小铺",
    category: "儿童用品",
  },
]

const statusConfig = {
  upcoming: { label: "即将开始", bg: "bg-primary", text: "text-primary-foreground" },
  pending: { label: "审核中", bg: "bg-amber-100", text: "text-amber-700" },
  completed: { label: "已结束", bg: "bg-muted", text: "text-muted-foreground" },
}

export function MarketMyBoothsView() {
  return (
    <div className="flex-1 bg-background overflow-auto flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="w-8 h-8 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">我的摊位</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 mt-4 p-4 bg-gradient-to-r from-primary/10 to-orange-100/50 rounded-2xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Store className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-lg font-bold text-foreground">我的摊主之旅</div>
            <div className="text-xs text-muted-foreground">累计参与 3 场集市</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-card rounded-xl">
            <div className="text-lg font-bold text-primary">1</div>
            <div className="text-xs text-muted-foreground">即将开始</div>
          </div>
          <div className="text-center p-2 bg-card rounded-xl">
            <div className="text-lg font-bold text-amber-600">1</div>
            <div className="text-xs text-muted-foreground">审核中</div>
          </div>
          <div className="text-center p-2 bg-card rounded-xl">
            <div className="text-lg font-bold text-muted-foreground">1</div>
            <div className="text-xs text-muted-foreground">已结束</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mt-4">
        <div className="flex gap-2">
          {["全部", "即将开始", "审核中", "已结束"].map((tab, i) => (
            <button
              key={tab}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Booth List */}
      <div className="px-4 py-4 flex-1 space-y-4">
        {myBooths.map((booth) => {
          const status = statusConfig[booth.status as keyof typeof statusConfig]
          return (
            <div
              key={booth.id}
              className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
            >
              {/* Image Header */}
              <div className="relative h-28">
                <Image
                  src={booth.image}
                  alt={booth.marketName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                    {status.label}
                  </span>
                </div>

                {/* Booth Number */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg">
                    <span className="text-sm font-bold text-primary">{booth.boothId}</span>
                    {booth.boothLabel && (
                      <span className="text-xs text-muted-foreground ml-1">{booth.boothLabel}</span>
                    )}
                  </div>
                </div>

                {/* More Button */}
                <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MoreHorizontal className="w-4 h-4 text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-2">{booth.marketName}</h3>
                
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{booth.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>{booth.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>{booth.location}</span>
                  </div>
                </div>

                {/* Stall Info */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Store className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{booth.stallName}</div>
                      <div className="text-xs text-muted-foreground">{booth.category}</div>
                    </div>
                  </div>
                  
                  {booth.status === "upcoming" && (
                    <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                      查看详情
                    </button>
                  )}
                  {booth.status === "pending" && (
                    <button className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                      等待审核
                    </button>
                  )}
                  {booth.status === "completed" && (
                    <button className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                      查看回顾
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="p-4 bg-card border-t border-border">
        <button className="w-full py-3 bg-primary text-primary-foreground rounded-full font-medium">
          报名新集市
        </button>
      </div>
    </div>
  )
}
