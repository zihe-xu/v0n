"use client"

import { useState } from "react"
import Image from "next/image"
import { Flame, ThumbsUp, Filter, SlidersHorizontal, MapPin, Star, Grid3X3, List, CheckCircle } from "lucide-react"
import { placesData, type Place, type PlaceCategory, formatDistance, categoryConfig } from "@/lib/explore-data"

interface PlaceCardProps {
  place: Place
  viewMode: "grid" | "list"
  onClick?: () => void
}

function PlaceCard({ place, viewMode, onClick }: PlaceCardProps) {
  if (viewMode === "list") {
    return (
      <button
        onClick={onClick}
        className="flex gap-3 p-3 rounded-xl bg-card border border-border/50 text-left w-full hover:border-primary/30 transition-colors"
      >
        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={place.coverImage}
            alt={place.name}
            fill
            className="object-cover"
          />
          {place.isRecommended && (
            <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Star className="w-3 h-3 text-primary-foreground fill-current" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <h3 className="text-sm font-semibold text-foreground truncate mb-1">{place.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{place.description}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${categoryConfig[place.category].bgColor} ${categoryConfig[place.category].color}`}>
              {place.category}
            </span>
            {place.distance && (
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <MapPin className="w-3 h-3" />
                {formatDistance(place.distance)}
              </span>
            )}
            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
              <ThumbsUp className="w-3 h-3" />
              {place.likes}
            </span>
            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
              <CheckCircle className="w-3 h-3" />
              {place.checkins}
            </span>
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className="flex flex-col text-left w-full group"
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2 shadow-sm">
        <Image
          src={place.coverImage}
          alt={place.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {place.isRecommended && (
          <div className="absolute top-2 left-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
            <Star className="w-2.5 h-2.5 fill-current" />
            推荐
          </div>
        )}
        {place.likes > 100 && (
          <div className="absolute top-2 right-2 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-semibold backdrop-blur-sm">
            <Flame className="w-2.5 h-2.5" />
            <ThumbsUp className="w-2.5 h-2.5" />
            {place.likes}
          </div>
        )}
        {place.distance && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-full bg-black/50 text-white text-[10px] backdrop-blur-sm">
            {formatDistance(place.distance)}
          </div>
        )}
      </div>
      <h3 className="text-sm font-semibold text-foreground leading-tight mb-1 line-clamp-1">
        {place.name}
      </h3>
      <div className="flex flex-wrap gap-1">
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${categoryConfig[place.category].bgColor} ${categoryConfig[place.category].color}`}>
          {place.category}
        </span>
        {place.tags.slice(0, 1).map((tag) => (
          <span key={tag} className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded bg-muted">
            {tag}
          </span>
        ))}
      </div>
    </button>
  )
}

type SortType = "likes" | "distance" | "checkins"

interface ListViewProps {
  selectedCategory?: PlaceCategory | "全部"
  onPlaceClick?: (placeId: string) => void
}

export function ListView({ selectedCategory = "全部", onPlaceClick }: ListViewProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortType, setSortType] = useState<SortType>("likes")
  const [showSortMenu, setShowSortMenu] = useState(false)
  
  // 筛选和排序
  let filteredPlaces = placesData.filter(place => {
    if (!place.isOnline) return false
    if (selectedCategory === "全部") return true
    return place.category === selectedCategory
  })
  
  // 排序
  filteredPlaces = [...filteredPlaces].sort((a, b) => {
    switch (sortType) {
      case "likes":
        return b.likes - a.likes
      case "distance":
        return (a.distance || 0) - (b.distance || 0)
      case "checkins":
        return b.checkins - a.checkins
      default:
        return 0
    }
  })

  const sortLabels: Record<SortType, string> = {
    likes: "点赞量排序",
    distance: "距离排序",
    checkins: "打卡量排序",
  }

  return (
    <div className="bg-card flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Filter bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border sticky top-0 bg-card z-10">
        <button className="flex items-center gap-1 text-sm font-semibold text-primary">
          <MapPin className="w-3.5 h-3.5" />
          家门口的好去处
        </button>
        
        {/* Sort dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Filter className="w-3.5 h-3.5" />
            {sortLabels[sortType]}
          </button>
          
          {showSortMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowSortMenu(false)} />
              <div className="absolute top-full left-0 mt-1 bg-card rounded-lg shadow-lg border border-border py-1 z-20 min-w-[120px]">
                {(Object.keys(sortLabels) as SortType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setSortType(type)
                      setShowSortMenu(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-muted transition-colors ${
                      sortType === type ? "text-primary font-medium" : "text-foreground"
                    }`}
                  >
                    {sortLabels[type]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="flex-1" />
        
        {/* View mode toggle */}
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

      {/* Results count */}
      <div className="px-4 py-2 text-xs text-muted-foreground">
        共 {filteredPlaces.length} 个点位
      </div>

      {/* Place grid/list */}
      <div className={`px-4 pb-4 ${viewMode === "grid" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3"}`}>
        {filteredPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            viewMode={viewMode}
            onClick={() => onPlaceClick?.(place.id)}
          />
        ))}
      </div>
      
      {filteredPlaces.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <MapPin className="w-12 h-12 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">该分类暂无点位</p>
        </div>
      )}
    </div>
  )
}
