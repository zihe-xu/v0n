"use client"

import Image from "next/image"
import { Flame, ThumbsUp, Filter, SlidersHorizontal, MapPin } from "lucide-react"
import { places, type Place } from "@/lib/explore-data"

interface PlaceCardProps {
  place: Place
  onClick?: () => void
}

function PlaceCard({ place, onClick }: PlaceCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col text-left w-full group"
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2 shadow-sm">
        <Image
          src={place.image}
          alt={place.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {place.hot !== undefined && (
          <div className="absolute top-2 right-2 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-semibold backdrop-blur-sm">
            <Flame className="w-2.5 h-2.5" />
            <ThumbsUp className="w-2.5 h-2.5" />
            {place.hot}
          </div>
        )}
        {!place.hot && place.likes > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-card/90 text-foreground text-[10px] font-semibold backdrop-blur-sm">
            <ThumbsUp className="w-2.5 h-2.5 text-primary" />
            {place.likes}
          </div>
        )}
      </div>
      <h3 className="text-sm font-semibold text-foreground leading-tight mb-1 line-clamp-1">
        {place.name}
      </h3>
      <div className="flex flex-wrap gap-1">
        {place.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="text-[10px] text-primary font-medium px-1.5 py-0.5 rounded bg-primary/10">
            {tag}
          </span>
        ))}
      </div>
    </button>
  )
}

interface ListViewProps {
  onPlaceClick?: (name: string) => void
}

export function ListView({ onPlaceClick }: ListViewProps) {
  return (
    <div className="bg-card flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Filter bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button className="flex items-center gap-1 text-sm font-semibold text-primary">
          <MapPin className="w-3.5 h-3.5" />
          家门口的好去处
        </button>
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Filter className="w-3.5 h-3.5" />
          点赞量排序
        </button>
        <div className="flex-1" />
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors" aria-label="筛选">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          宫格
        </button>
      </div>

      {/* Place grid */}
      <div className="grid grid-cols-2 gap-3 px-4 py-3">
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onClick={() => onPlaceClick?.(place.name)}
          />
        ))}
      </div>
    </div>
  )
}
