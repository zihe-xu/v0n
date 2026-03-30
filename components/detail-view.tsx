"use client"

import Image from "next/image"
import { Flame, ThumbsUp, Share2, Heart, Star, Phone, MapPin, Navigation, X, Clock } from "lucide-react"
import { places, type Place, getPlaceByName } from "@/lib/explore-data"

interface DetailViewProps {
  onClose?: () => void
  placeName?: string
}

export function DetailView({ onClose, placeName }: DetailViewProps) {
  // 根据名称获取地点数据，默认使用思月书院
  const place: Place = placeName 
    ? (getPlaceByName(placeName) || places[0])
    : places[0]

  return (
    <div className="bg-card flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Mini Map */}
      <div className="relative w-full h-48 bg-emerald-50 overflow-hidden">
        <Image
          src="/images/community-map.jpg"
          alt="金岭社区地图"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/50" />
        {/* Active marker */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-lg flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {place.name}
          </div>
          <div className="w-0.5 h-4 bg-primary" />
          <div className="w-2 h-2 rounded-full bg-primary shadow" />
        </div>
        
        {/* Navigation arrow button */}
        <button className="absolute right-3 top-3 w-8 h-8 rounded-full bg-primary/90 text-primary-foreground shadow-md flex items-center justify-center hover:bg-primary transition-colors" aria-label="导航">
          <Navigation className="w-4 h-4" />
        </button>
        
        {onClose && (
          <button
            onClick={onClose}
            className="absolute left-3 top-3 w-8 h-8 rounded-full bg-card/90 text-foreground shadow-md flex items-center justify-center hover:bg-card transition-colors"
            aria-label="关闭"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Detail card */}
      <div className="px-4 py-4">
        {/* Title row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-foreground">{place.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              {place.hot && (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-50 text-red-500 text-xs font-medium">
                  <Flame className="w-3 h-3" />
                  热门
                </span>
              )}
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <ThumbsUp className="w-3 h-3" />
                {place.likes}
              </span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-md">
          <Image
            src={place.image}
            alt={place.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          {place.description}
        </p>

        {/* Tags */}
        {place.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {place.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Interaction buttons */}
        <div className="flex items-center gap-2 mb-4">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
            <Share2 className="w-4 h-4" />
            分享({place.shares})
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-500 text-sm font-medium hover:bg-red-100 transition-colors">
            <Heart className="w-4 h-4" />
            点赞({place.likes})
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-50 text-amber-600 text-sm font-medium hover:bg-amber-100 transition-colors">
            <Star className="w-4 h-4" />
            评论({place.comments})
          </button>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-2.5 p-3 rounded-xl bg-muted/50">
          {place.phone && (
            <div className="flex items-center gap-2.5 text-sm text-foreground/80">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground">联系电话</span>
                <p className="font-medium text-foreground">{place.phone}</p>
              </div>
            </div>
          )}
          {place.hours && (
            <div className="flex items-center gap-2.5 text-sm text-foreground/80">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground">开放时间</span>
                <p className="font-medium text-foreground">{place.hours}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2.5 text-sm text-foreground/80">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">详细地址</span>
              <p className="font-medium text-foreground">{place.address}</p>
            </div>
          </div>
        </div>

        {/* Navigate button */}
        <button className="w-full mt-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
          <Navigation className="w-4 h-4" />
          导航前往
        </button>
      </div>
    </div>
  )
}
