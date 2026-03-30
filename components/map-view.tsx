"use client"

import Image from "next/image"
import { Flame, ThumbsUp, MapPin, Navigation, Star } from "lucide-react"

interface MapMarkerProps {
  name: string
  x: number
  y: number
  hot?: number
  isRecommended?: boolean
  onClick?: () => void
}

function MapMarker({ name, x, y, hot, isRecommended, onClick }: MapMarkerProps) {
  return (
    <button
      onClick={onClick}
      className="absolute flex flex-col items-center gap-0.5 group"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -100%)" }}
    >
      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg shadow-lg border text-xs font-medium transition-all ${
        isRecommended 
          ? "bg-primary text-primary-foreground border-primary" 
          : "bg-card border-border text-foreground group-hover:bg-primary group-hover:text-primary-foreground"
      }`}>
        {isRecommended && <Star className="w-3 h-3 fill-current" />}
        <MapPin className={`w-3 h-3 ${isRecommended ? "text-primary-foreground" : "text-primary group-hover:text-primary-foreground"}`} />
        {name}
      </div>
      {hot !== undefined && (
        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
          <Flame className="w-2.5 h-2.5" />
          <ThumbsUp className="w-2.5 h-2.5" />
          {hot}
        </div>
      )}
    </button>
  )
}

interface MapViewProps {
  onMarkerClick?: (name: string) => void
  showRecommendedOnly?: boolean
}

export function MapView({ onMarkerClick, showRecommendedOnly = false }: MapViewProps) {
  const markers = [
    { name: "正坑水碧道", x: 62, y: 25, hot: 200, isRecommended: true },
    { name: "大望桥", x: 38, y: 32, isRecommended: false },
    { name: "深圳市兰科植物保护中心", x: 50, y: 42, isRecommended: true },
    { name: "深圳金石艺术博物馆", x: 48, y: 52, isRecommended: false },
    { name: "引凤桥", x: 40, y: 62, isRecommended: false },
    { name: "梧桐山", x: 68, y: 60, isRecommended: true },
    { name: "思月书院", x: 52, y: 75, hot: 200, isRecommended: true },
    { name: "绿道", x: 15, y: 78, hot: 10, isRecommended: false },
    { name: "东部过境高速", x: 30, y: 90, isRecommended: false },
  ]

  const filteredMarkers = showRecommendedOnly 
    ? markers.filter(m => m.isRecommended) 
    : markers

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
      {filteredMarkers.map((m) => (
        <MapMarker
          key={m.name}
          {...m}
          onClick={() => onMarkerClick?.(m.name)}
        />
      ))}
      
      {/* Navigation button */}
      <button className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors" aria-label="导航">
        <Navigation className="w-5 h-5" />
      </button>
    </div>
  )
}
