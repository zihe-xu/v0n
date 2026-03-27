"use client"

import Image from "next/image"
import { MapPin, ChevronRight, Sun, Shield } from "lucide-react"

const childcareCategories = [
  { id: "all", label: "全部", icon: null },
  { id: "public", label: "公立普惠", icon: "🏫" },
  { id: "baby", label: "0-3岁专护", icon: "☀️" },
  { id: "temp", label: "临时托管", icon: "⏰" },
]

const childcareList = [
  {
    id: 1,
    name: "金岭社区托育点",
    image: "/images/nursery-1.jpg",
    openTime: "08:00",
    distance: "200m",
    address: "党群中心2楼",
    tags: ["公立普惠", "0-3岁", "金三银"],
    ratio: "1:5",
    features: ["双语教学", "绘本阅读", "智能监控"],
  },
  {
    id: 2,
    name: "金岭社区托育点",
    image: "/images/nursery-2.jpg",
    openTime: "08:30",
    distance: "450m",
    address: "商业街A座",
    tags: ["公立普惠", "0-3岁", "金三银"],
    ratio: "1:4",
    features: ["双语教学", "绘本阅读", "青禾班"],
  },
]

export function ChildcareListView() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-50/80 to-background">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
            <Sun className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">安心托育</h1>
          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            社区监管
          </span>
        </div>
        <p className="text-xs text-muted-foreground ml-10">
          为您精选家门口的优质托育服务
        </p>
      </div>

      {/* Category Filter */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {childcareCategories.map((cat, idx) => (
            <button
              key={cat.id}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                idx === 0
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {cat.icon && <span>{cat.icon}</span>}
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {childcareList.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50"
          >
            {/* Image */}
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              {/* Time Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-medium text-white">{item.openTime}</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-bold text-foreground">{item.name}</h3>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{item.distance} · {item.address}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.map((tag, idx) => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      idx === 0
                        ? "bg-amber-500/15 text-amber-600 border border-amber-500/20"
                        : idx === 1
                        ? "bg-sky-500/15 text-sky-600 border border-sky-500/20"
                        : "bg-rose-500/15 text-rose-600 border border-rose-500/20"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Features & Action */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>师生比</span>
                  <span className="font-semibold text-foreground">{item.ratio}</span>
                </div>
                <button className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-sm hover:bg-primary/90 transition-colors">
                  去预约
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
