"use client"

import { useState } from "react"
import Image from "next/image"
import { Flame, ThumbsUp, MapPin, Navigation, X, ChevronRight, Share2, Star } from "lucide-react"
import { placesData, type Place, type PlaceCategory, formatDistance } from "@/lib/explore-data"

interface MapMarkerProps {
  place: Place
  isSelected: boolean
  onClick: () => void
}

function MapMarker({ place, isSelected, onClick }: MapMarkerProps) {
  if (!place.markerPosition || !place.hasMarker) return null
  
  return (
    <button
      onClick={onClick}
      className={`absolute flex flex-col items-center gap-0.5 group z-10 transition-all duration-200 ${isSelected ? "z-20 scale-110" : ""}`}
      style={{ 
        left: `${place.markerPosition.x}%`, 
        top: `${place.markerPosition.y}%`, 
        transform: "translate(-50%, -100%)" 
      }}
    >
      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg shadow-lg border text-xs font-medium transition-all ${
        isSelected 
          ? "bg-primary text-primary-foreground border-primary scale-105" 
          : "bg-card text-foreground border-border group-hover:bg-primary group-hover:text-primary-foreground"
      }`}>
        <MapPin className={`w-3 h-3 ${isSelected ? "text-primary-foreground" : "text-primary group-hover:text-primary-foreground"}`} />
        <span className="max-w-[100px] truncate">{place.name}</span>
        {place.isRecommended && (
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
        )}
      </div>
      {place.likes > 100 && (
        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
          <Flame className="w-2.5 h-2.5" />
          <ThumbsUp className="w-2.5 h-2.5" />
          {place.likes}
        </div>
      )}
    </button>
  )
}

// 点位卡片弹窗
interface PlaceCardProps {
  place: Place
  onClose: () => void
  onViewDetail: () => void
  onLike: () => void
  onShare: () => void
}

function PlaceCard({ place, onClose, onViewDetail, onLike, onShare }: PlaceCardProps) {
  return (
    <div className="absolute bottom-4 left-3 right-3 bg-card rounded-2xl shadow-xl border border-border overflow-hidden z-30 animate-in slide-in-from-bottom-4 duration-300">
      <div className="relative">
        {/* 关闭按钮 */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
        >
          <X className="w-3.5 h-3.5 text-white" />
        </button>
        
        {/* 封面图 */}
        <div className="relative h-32 w-full">
          <Image
            src={place.coverImage}
            alt={place.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* 推荐标签 */}
          {place.isRecommended && (
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
              <Star className="w-3 h-3 fill-current" />
              官方推荐
            </div>
          )}
          
          {/* 距离 */}
          {place.distance && (
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] backdrop-blur-sm">
              距您 {formatDistance(place.distance)}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-3">
        {/* 标题行 */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground truncate">{place.name}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {place.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2">
            <ThumbsUp className="w-3.5 h-3.5" />
            {place.likes}
          </div>
        </div>
        
        {/* 简介 */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{place.description}</p>
        
        {/* 操作按钮 */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onViewDetail}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium"
          >
            查看详情
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={onLike}
            className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center"
          >
            <ThumbsUp className="w-4 h-4 text-red-500" />
          </button>
          <button 
            onClick={onShare}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
          >
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}

interface MapViewProps {
  selectedCategory?: PlaceCategory | "全部"
  onMarkerClick?: (placeId: string) => void
  onViewDetail?: (placeId: string) => void
}

export function MapView({ selectedCategory = "全部", onMarkerClick, onViewDetail }: MapViewProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  
  // 筛选点位
  const filteredPlaces = placesData.filter(place => {
    if (!place.isOnline || !place.hasMarker) return false
    if (selectedCategory === "全部") return true
    return place.category === selectedCategory
  })

  const handleMarkerClick = (place: Place) => {
    setSelectedPlace(place)
    onMarkerClick?.(place.id)
  }

  const handleViewDetail = () => {
    if (selectedPlace) {
      onViewDetail?.(selectedPlace.id)
    }
  }

  return (
    <div className="relative w-full aspect-[3/4] bg-emerald-50 overflow-hidden">
      {/* Map background */}
      <Image
        src="/images/community-map.jpg"
        alt="金岭社区地图"
        fill
        className="object-cover"
        priority
      />
      {/* Map overlay for better marker visibility */}
      <div className="absolute inset-0 bg-card/10" />
      
      {/* Road labels */}
      <div className="absolute left-[10%] top-[10%] text-[10px] text-muted-foreground/80 font-medium -rotate-45">
        丹平快速路
      </div>
      <div className="absolute left-[25%] top-[5%] text-[10px] text-muted-foreground/80 font-medium">
        沙湾路
      </div>
      <div className="absolute right-[15%] top-[8%] text-[10px] text-muted-foreground/80 font-medium -rotate-12">
        武深高速
      </div>
      
      {/* Markers */}
      {filteredPlaces.map((place) => (
        <MapMarker
          key={place.id}
          place={place}
          isSelected={selectedPlace?.id === place.id}
          onClick={() => handleMarkerClick(place)}
        />
      ))}
      
      {/* Place Card */}
      {selectedPlace && (
        <PlaceCard
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onViewDetail={handleViewDetail}
          onLike={() => {}}
          onShare={() => {}}
        />
      )}
      
      {/* Navigation button */}
      <button 
        className="absolute right-3 top-3 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-20" 
        aria-label="导航"
      >
        <Navigation className="w-5 h-5" />
      </button>
      
      {/* User location indicator */}
      <div className="absolute left-[45%] top-[50%] z-10">
        <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg animate-pulse" />
        <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-500/30 animate-ping" />
      </div>
    </div>
  )
}
