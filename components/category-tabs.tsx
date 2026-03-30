"use client"

import { useState } from "react"
import { ChevronDown, ArrowRightLeft, Compass, ShoppingBag, PartyPopper, Bike, UtensilsCrossed, BedDouble, Star } from "lucide-react"

interface CategoryTabsProps {
  onToggleView?: () => void
  onRecommendedToggle?: (showRecommended: boolean) => void
  isMapView?: boolean
}

const categories = [
  { label: "逸游金岭", icon: Compass, color: "bg-primary" },
  { label: "乐购金岭", icon: ShoppingBag, color: "bg-red-500" },
  { label: "欢娱金岭", icon: PartyPopper, color: "bg-amber-500" },
  { label: "畅行金岭", icon: Bike, color: "bg-emerald-500" },
  { label: "舌尖金岭", icon: UtensilsCrossed, color: "bg-sky-500" },
  { label: "宿享金岭", icon: BedDouble, color: "bg-indigo-500" },
]

export function CategoryTabs({ onToggleView, onRecommendedToggle, isMapView = true }: CategoryTabsProps) {
  const [showRecommended, setShowRecommended] = useState(false)

  const handleRecommendedClick = () => {
    const newValue = !showRecommended
    setShowRecommended(newValue)
    onRecommendedToggle?.(newValue)
  }

  return (
    <div className="bg-card">
      {/* Community selector & view toggle */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <button className="flex items-center gap-1 text-sm font-medium text-foreground">
          金岭社区
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
        <button
          onClick={onToggleView}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          {isMapView ? "切换图文版" : "切换地图版"}
        </button>
      </div>
      {/* Category pills */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
        {/* Official Recommended Button */}
        <button
          onClick={handleRecommendedClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
            showRecommended 
              ? "bg-primary text-primary-foreground" 
              : "bg-amber-50 text-amber-600 hover:bg-amber-100"
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${showRecommended ? "fill-current" : ""}`} />
          官方推荐
        </button>
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium whitespace-nowrap hover:bg-primary/20 transition-colors flex-shrink-0"
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
