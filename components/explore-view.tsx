"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { CategoryTabs } from "@/components/category-tabs"
import { MapView } from "@/components/map-view"
import { ListView } from "@/components/list-view"
import { DetailView } from "@/components/detail-view"

type ViewMode = "map" | "list" | "detail"

interface ExploreViewProps {
  onBack?: () => void
}

export function ExploreView({ onBack }: ExploreViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("map")
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null)

  const handleToggleView = () => {
    if (viewMode === "detail") {
      setSelectedPlace(null)
      setViewMode("map")
    } else {
      setViewMode(viewMode === "map" ? "list" : "map")
    }
  }

  const handleMarkerClick = (name: string) => {
    setSelectedPlace(name)
    setViewMode("detail")
  }

  const handlePlaceClick = (name: string) => {
    setSelectedPlace(name)
    setViewMode("detail")
  }

  const handleCloseDetail = () => {
    setSelectedPlace(null)
    setViewMode("map")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <AppHeader />
      <CategoryTabs 
        onToggleView={handleToggleView} 
        isMapView={viewMode === "map" || viewMode === "detail"} 
      />
      
      <div className="flex-1 overflow-hidden">
        {viewMode === "map" && (
          <MapView onMarkerClick={handleMarkerClick} />
        )}
        {viewMode === "list" && (
          <ListView onPlaceClick={handlePlaceClick} />
        )}
        {viewMode === "detail" && selectedPlace && (
          <DetailView 
            placeName={selectedPlace} 
            onClose={handleCloseDetail}
          />
        )}
      </div>
    </div>
  )
}
