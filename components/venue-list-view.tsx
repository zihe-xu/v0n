"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, SlidersHorizontal, Users, Clock, MapPin, Star, Flame, ChevronDown, X } from "lucide-react"

const venueList = [
  {
    id: "lecture-hall",
    name: "新时代大讲堂",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=280&fit=crop",
    capacity: 90,
    openDays: "每日",
    address: "金岭社区文化活动中心 1楼",
    status: "available",
    rating: 4.9,
    isHot: true,
    category: "lecture",
    tags: ["大型活动", "讲座", "培训"],
  },
  {
    id: "multi-room",
    name: "多功能室",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=280&fit=crop",
    capacity: 50,
    openDays: "每日",
    address: "金岭社区文化活动中心 2楼",
    status: "available",
    rating: 4.7,
    isHot: true,
    category: "multi",
    tags: ["会议", "培训", "工作坊"],
  },
  {
    id: "dance-room",
    name: "舞蹈室",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=280&fit=crop",
    capacity: 20,
    openDays: "每日",
    address: "金岭社区长者服务站 2楼",
    status: "available",
    rating: 4.8,
    isHot: false,
    category: "sport",
    tags: ["舞蹈", "瑜伽", "健身"],
  },
  {
    id: "children-space",
    name: "儿童友好空间",
    image: "https://images.unsplash.com/photo-1576674184622-2e6af4fa9494?w=400&h=280&fit=crop",
    capacity: 30,
    openDays: "每日",
    address: "金岭社区文化活动中心 3楼",
    status: "available",
    rating: 4.9,
    isHot: true,
    category: "children",
    tags: ["亲子", "儿童活动", "教育"],
  },
  {
    id: "library",
    name: "悠·图书馆",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=280&fit=crop",
    capacity: 40,
    openDays: "周一至周六",
    address: "金岭社区文化活动中心 3楼",
    status: "full",
    rating: 5.0,
    isHot: true,
    category: "culture",
    tags: ["阅读", "学习", "安静"],
  },
  {
    id: "tcm-room",
    name: "中医理疗室",
    image: "https://images.unsplash.com/photo-1611689102192-1f6f55ef1db4?w=400&h=280&fit=crop",
    capacity: 10,
    openDays: "周二、四、六",
    address: "金岭社区长者服务站 2楼",
    status: "available",
    rating: 4.6,
    isHot: false,
    category: "health",
    tags: ["健康", "理疗", "长者"],
  },
  {
    id: "theater",
    name: "09剧场",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=280&fit=crop",
    capacity: 120,
    openDays: "按需开放",
    address: "金岭社区文化活动中心 4楼",
    status: "available",
    rating: 4.7,
    isHot: false,
    category: "culture",
    tags: ["演出", "剧场", "文艺"],
  },
  {
    id: "growth-center",
    name: "金小蒙成长中心",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=280&fit=crop",
    capacity: 25,
    openDays: "每日",
    address: "金岭社区文化活动中心 1-2楼",
    status: "available",
    rating: 4.8,
    isHot: false,
    category: "children",
    tags: ["青少年", "成长", "教育"],
  },
]

const categoryOptions = [
  { id: "all", label: "全部" },
  { id: "lecture", label: "讲堂" },
  { id: "multi", label: "多功能" },
  { id: "sport", label: "运动健身" },
  { id: "children", label: "亲子" },
  { id: "culture", label: "文化" },
  { id: "health", label: "健康" },
]

const capacityOptions = [
  { id: "all", label: "不限人数" },
  { id: "small", label: "20人以下" },
  { id: "medium", label: "20-50人" },
  { id: "large", label: "50人以上" },
]

interface VenueListViewProps {
  onVenueClick?: (venueId: string) => void
  onViewMap?: () => void
}

export function VenueListView({ onVenueClick, onViewMap }: VenueListViewProps) {
  const [searchText, setSearchText] = useState("")
  const [activeSort, setActiveSort] = useState<"hot" | "category" | "capacity">("hot")
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeCapacity, setActiveCapacity] = useState("all")
  const [showCategorySheet, setShowCategorySheet] = useState(false)
  const [showCapacitySheet, setShowCapacitySheet] = useState(false)

  const filtered = venueList.filter((v) => {
    const matchSearch = !searchText || v.name.includes(searchText) || v.tags.some(t => t.includes(searchText))
    const matchCategory = activeCategory === "all" || v.category === activeCategory
    const matchCapacity =
      activeCapacity === "all" ||
      (activeCapacity === "small" && v.capacity < 20) ||
      (activeCapacity === "medium" && v.capacity >= 20 && v.capacity <= 50) ||
      (activeCapacity === "large" && v.capacity > 50)
    return matchSearch && matchCategory && matchCapacity
  })

  const sorted = [...filtered].sort((a, b) => {
    if (activeSort === "hot") return (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0)
    return 0
  })

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-4 pt-4 pb-4">
        <h1 className="text-white font-bold text-lg mb-3">场地预约</h1>
        {/* Search bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl shadow-sm">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="请输入活动场地名称"
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
          />
          {searchText && (
            <button onClick={() => setSearchText("")}>
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-card border-b border-border/50 px-4 py-2 flex items-center gap-2">
        <button
          onClick={() => setActiveSort("hot")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeSort === "hot" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          热门场地
        </button>
        <button
          onClick={() => setShowCategorySheet(true)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeCategory !== "all" ? "bg-primary/10 text-primary border border-primary/30" : "bg-muted text-muted-foreground"
          }`}
        >
          场地类型
          <ChevronDown className="w-3 h-3" />
        </button>
        <button
          onClick={() => setShowCapacitySheet(true)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeCapacity !== "all" ? "bg-primary/10 text-primary border border-primary/30" : "bg-muted text-muted-foreground"
          }`}
        >
          容纳人数
          <ChevronDown className="w-3 h-3" />
        </button>
        <button
          onClick={onViewMap}
          className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          分布图
        </button>
      </div>

      {/* Venue Grid */}
      <div className="flex-1 overflow-y-auto px-3 py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <p className="text-xs text-muted-foreground mb-3 px-1">共 {sorted.length} 个场地</p>
        <div className="grid grid-cols-2 gap-3">
          {sorted.map((venue) => (
            <button
              key={venue.id}
              onClick={() => onVenueClick?.(venue.id)}
              className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm text-left active:scale-[0.98] transition-transform"
            >
              {/* Image */}
              <div className="relative aspect-[4/3]">
                <Image src={venue.image} alt={venue.name} fill className="object-cover" />
                {venue.isHot && (
                  <div className="absolute top-2 left-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-medium">
                    <Flame className="w-2.5 h-2.5" />
                    热门
                  </div>
                )}
                <div className={`absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                  venue.status === "available"
                    ? "bg-emerald-500/90 text-white"
                    : "bg-gray-500/90 text-white"
                }`}>
                  {venue.status === "available" ? "可预约" : "已约满"}
                </div>
              </div>
              {/* Info */}
              <div className="p-2.5">
                <h3 className="text-sm font-bold text-foreground line-clamp-1">{venue.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[11px] font-medium text-foreground">{venue.rating}</span>
                </div>
                <div className="mt-1.5 space-y-1">
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Users className="w-3 h-3 shrink-0" />
                    <span>{venue.capacity}人</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>{venue.openDays}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="line-clamp-2 leading-tight">{venue.address}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Category Bottom Sheet */}
      {showCategorySheet && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/40" onClick={() => setShowCategorySheet(false)}>
          <div className="bg-card rounded-t-3xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">场地类型</h3>
              <button onClick={() => setShowCategorySheet(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setActiveCategory(opt.id); setShowCategorySheet(false) }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === opt.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Capacity Bottom Sheet */}
      {showCapacitySheet && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/40" onClick={() => setShowCapacitySheet(false)}>
          <div className="bg-card rounded-t-3xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">容纳人数</h3>
              <button onClick={() => setShowCapacitySheet(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {capacityOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setActiveCapacity(opt.id); setShowCapacitySheet(false) }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCapacity === opt.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
