"use client"

import { useState } from "react"
import { ChevronLeft, Navigation, MapPin, Clock, Users, ChevronRight } from "lucide-react"

// Building data matching the prototype image
const buildings = [
  {
    id: "cultural-center",
    name: "金岭社区文化活动中心导视图",
    floors: [
      {
        floor: "4F",
        rooms: [
          { id: "theater", name: "09剧场", status: "available", slots: 3, color: "bg-violet-100", borderColor: "border-violet-300" },
        ]
      },
      {
        floor: "3F",
        rooms: [
          { id: "library", name: "悠·图书馆", status: "full", slots: 0, color: "bg-violet-50", borderColor: "border-violet-200" },
          { id: "heritage", name: "非物质文化遗产传承活动基地", status: "available", slots: 2, color: "bg-violet-100", borderColor: "border-violet-300" },
          { id: "anti-drug", name: "罗湖区禁毒教育基地", status: "available", slots: 5, color: "bg-amber-50", borderColor: "border-amber-200" },
          { id: "children-space", name: "儿童友好空间", status: "available", slots: 4, color: "bg-sky-50", borderColor: "border-sky-200" },
        ]
      },
      {
        floor: "2F",
        rooms: [
          { id: "growth-2f", name: "金小蒙成长中心(二楼)", status: "available", slots: 6, color: "bg-violet-50", borderColor: "border-violet-200" },
          { id: "exhibition", name: "圆梦安居—罗湖棚改展览馆", status: "closed", slots: 0, color: "bg-gray-100", borderColor: "border-gray-300" },
        ]
      },
      {
        floor: "1F",
        rooms: [
          { id: "lecture", name: "新时代大讲堂—岭上学苑", status: "available", slots: 2, color: "bg-violet-100", borderColor: "border-violet-300" },
          { id: "growth-1f", name: "金小蒙成长中心(一楼)", status: "available", slots: 3, color: "bg-violet-50", borderColor: "border-violet-200" },
        ]
      },
    ]
  },
  {
    id: "elder-center",
    name: "金岭社区长者服务站导视图(金洲路16号)",
    floors: [
      {
        floor: "2F",
        rooms: [
          { id: "dance", name: "舞蹈室", status: "available", slots: 4, color: "bg-rose-100", borderColor: "border-rose-300" },
          { id: "daycare", name: "日间照料中心", status: "full", slots: 0, color: "bg-amber-50", borderColor: "border-amber-200" },
          { id: "tcm", name: "中医理疗室", status: "available", slots: 2, color: "bg-emerald-50", borderColor: "border-emerald-200" },
        ]
      },
      {
        floor: "1F",
        rooms: [
          { id: "multi-function", name: "多功能活动室", status: "available", slots: 5, color: "bg-sky-100", borderColor: "border-sky-300" },
        ]
      },
    ]
  }
]

interface VenueMapViewProps {
  onNavigate?: (page: string, data?: Record<string, unknown>) => void
}

export function VenueMapView({ onNavigate }: VenueMapViewProps) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  const handleRoomClick = (roomId: string, roomName: string) => {
    setSelectedRoom(roomId)
    // Navigate to venue detail page
    onNavigate?.("venue-detail", { roomId, roomName })
  }

  const getStatusBadge = (status: string, slots: number) => {
    switch (status) {
      case "available":
        return (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-emerald-500/15 text-emerald-600 border border-emerald-500/20">
            余{slots}位
          </span>
        )
      case "full":
        return (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-rose-500/15 text-rose-600 border border-rose-500/20">
            已满
          </span>
        )
      case "closed":
        return (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-gray-500/15 text-gray-500 border border-gray-500/20">
            暂停
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold">金岭社区党群服务中心</h1>
              <p className="text-xs opacity-90">场地分布导视图</p>
            </div>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 text-xs font-medium">
            <Navigation className="w-3.5 h-3.5" />
            回到地图
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 py-2 bg-card border-b border-border/50 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">点击场地查看详情并预约</span>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            可预约
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            已满
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-400" />
            暂停
          </span>
        </div>
      </div>

      {/* Building Floor Maps */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {buildings.map((building) => (
          <div key={building.id} className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-sm">
            {/* Building Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-violet-500/10 to-primary/10 border-b border-border/50">
              <h2 className="text-sm font-bold text-foreground">{building.name}</h2>
            </div>

            {/* Floors */}
            <div className="p-3 space-y-3">
              {building.floors.map((floor) => (
                <div key={floor.floor} className="flex gap-3">
                  {/* Floor Label */}
                  <div className="w-10 shrink-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-violet-600">{floor.floor}</span>
                  </div>

                  {/* Rooms Grid */}
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    {floor.rooms.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => handleRoomClick(room.id, room.name)}
                        className={`relative p-2.5 rounded-xl ${room.color} border ${room.borderColor} text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
                          selectedRoom === room.id ? "ring-2 ring-primary ring-offset-1" : ""
                        }`}
                      >
                        {/* Status Badge */}
                        <div className="absolute top-1.5 right-1.5">
                          {getStatusBadge(room.status, room.slots)}
                        </div>
                        
                        {/* Room Name */}
                        <p className="text-[11px] font-medium text-foreground leading-tight pr-10 line-clamp-2">
                          {room.name}
                        </p>
                        
                        {/* Click hint */}
                        {room.status === "available" && (
                          <div className="mt-1.5 flex items-center gap-0.5 text-[9px] text-primary">
                            <Clock className="w-2.5 h-2.5" />
                            <span>点击预约</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Quick Stats */}
      <div className="px-4 py-3 bg-card border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">12</p>
                <p className="text-[10px] text-muted-foreground">场地总数</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">36</p>
                <p className="text-[10px] text-muted-foreground">今日可约</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => onNavigate?.("venue-list")}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium"
          >
            查看列表
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
