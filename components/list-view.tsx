"use client"

import Image from "next/image"
import { Flame, ThumbsUp, Filter, SlidersHorizontal, MapPin } from "lucide-react"

const places = [
  {
    id: 1,
    name: "大望桥",
    image: "/images/dawang-bridge.jpg",
    hot: 200,
    tags: ["陆家嘴街道", "共赏江景如画"],
    subtitle: "2023年...",
  },
  {
    id: 2,
    name: "正坑水碧道",
    image: "/images/zhengkeng-greenway.jpg",
    hot: 200,
    tags: ["陆家嘴街道", "共赏江景如画"],
  },
  {
    id: 3,
    name: "深圳市兰科植物保护中心",
    image: "/images/orchid-center.jpg",
    tags: ["陆家嘴街道", "共赏江景如画"],
  },
  {
    id: 4,
    name: "大望桥",
    image: "/images/yinfeng-bridge.jpg",
    tags: ["陆家嘴街道", "共赏江景如画"],
  },
  {
    id: 5,
    name: "深圳金石艺术博物馆",
    image: "/images/jinshi-museum.jpg",
    tags: ["文化艺术", "博物馆"],
  },
  {
    id: 6,
    name: "引凤桥",
    image: "/images/city-skyline.jpg",
    tags: ["山水景观", "步行桥"],
  },
]

interface PlaceCardProps {
  name: string
  image: string
  hot?: number
  tags: string[]
  onClick?: () => void
}

function PlaceCard({ name, image, hot, tags, onClick }: PlaceCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col text-left w-full group"
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-2 shadow-sm">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {hot !== undefined && (
          <div className="absolute top-2 right-2 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-primary/90 text-primary-foreground text-[10px] font-semibold backdrop-blur-sm">
            <Flame className="w-2.5 h-2.5" />
            <ThumbsUp className="w-2.5 h-2.5" />
            {hot}
          </div>
        )}
      </div>
      <h3 className="text-sm font-semibold text-foreground leading-tight mb-1 line-clamp-1">
        {name}
      </h3>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
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
    <div className="bg-card">
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
            name={place.name}
            image={place.image}
            hot={place.hot}
            tags={place.tags}
            onClick={() => onPlaceClick?.(place.name)}
          />
        ))}
      </div>
    </div>
  )
}
