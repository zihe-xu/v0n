"use client"

import Image from "next/image"
import { Search, MapPin, Clock, ChevronRight } from "lucide-react"

const canteens = [
  {
    id: 1,
    name: "金岭社区中心大食堂",
    image: "/images/canteen-1.jpg",
    status: "营业中",
    tags: ["菜品丰富", "自助选餐", "长者优惠"],
    cuisine: "家常菜 / 粤菜 / 面点",
    hours: "11:00-13:30, 17:00-19:30",
    address: "金岭社区党群中心 1楼",
    distance: "150m",
  },
  {
    id: 2,
    name: "金岭长者助餐点 (二分店)",
    image: "/images/canteen-2.jpg",
    status: "预约",
    tags: ["低盐低糖", "软烂易嚼", "环境安静"],
    cuisine: "营养套餐 / 炖汤",
    hours: "11:30-13:00",
    address: "金岭花园 A区 3栋架空层",
    distance: "400m",
  },
]

export function CanteenListView() {
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="w-8" />
        <h1 className="text-lg font-semibold text-foreground">社区食堂</h1>
        <button className="p-1 rounded-full hover:bg-muted transition-colors" aria-label="搜索">
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {canteens.map((canteen) => (
          <div
            key={canteen.id}
            className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50"
          >
            {/* Image */}
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <Image
                src={canteen.image}
                alt={canteen.name}
                fill
                className="object-cover"
              />
              {/* Status badge */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-card ${
                  canteen.status === "营业中"
                    ? "bg-emerald-500"
                    : "bg-primary"
                }`}
              >
                {canteen.status}
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-foreground">{canteen.name}</h3>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {canteen.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🍜</span>
                  <span>{canteen.cuisine}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary/70" />
                  <span>{canteen.hours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary/70" />
                    <span>{canteen.address}</span>
                  </div>
                  <span className="text-primary font-semibold flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" />
                    {canteen.distance}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
