"use client"

import { ChevronDown, ArrowRightLeft, Compass, ShoppingBag, PartyPopper, Bike, UtensilsCrossed, BedDouble, User } from "lucide-react"
import { type PlaceCategory } from "@/lib/explore-data"

interface CategoryTabsProps {
  onToggleView?: () => void
  isMapView?: boolean
  selectedCategory?: PlaceCategory | "全部"
  onCategoryChange?: (category: PlaceCategory | "全部") => void
  onProfileClick?: () => void
}

const categories: { label: string; value: PlaceCategory | "全部"; icon: typeof Compass; color: string }[] = [
  { label: "全部", value: "全部", icon: Compass, color: "bg-gray-500" },
  { label: "逸游金岭", value: "逸游", icon: Compass, color: "bg-primary" },
  { label: "乐购金岭", value: "乐购", icon: ShoppingBag, color: "bg-red-500" },
  { label: "欢娱金岭", value: "欢娱", icon: PartyPopper, color: "bg-amber-500" },
  { label: "畅行金岭", value: "畅行", icon: Bike, color: "bg-emerald-500" },
  { label: "舌尖金岭", value: "舌尖", icon: UtensilsCrossed, color: "bg-sky-500" },
  { label: "宿享金岭", value: "宿享", icon: BedDouble, color: "bg-indigo-500" },
]

export function CategoryTabs({ 
  onToggleView, 
  isMapView = true, 
  selectedCategory = "全部",
  onCategoryChange,
  onProfileClick 
}: CategoryTabsProps) {
  return (
    <div className="bg-card">
      {/* Community selector & view toggle */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <button className="flex items-center gap-1 text-sm font-medium text-foreground">
          金岭社区
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleView}
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            {isMapView ? "切换图文版" : "切换地图版"}
          </button>
          {/* 个人中心入口 */}
          <button
            onClick={onProfileClick}
            className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
            aria-label="个人中心"
          >
            <User className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>
      {/* Category pills */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isSelected = selectedCategory === cat.value
          return (
            <button
              key={cat.value}
              onClick={() => onCategoryChange?.(cat.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
