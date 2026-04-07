"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, Share2, Heart, MapPin, Clock, Users, Star, Phone, Calendar, Info, ChevronRight } from "lucide-react"

const venueImages = [
  "/images/venue-library.jpg",
  "/images/venue-museum.jpg",
]

const availableDates = [
  { date: "3/8", weekday: "今天", slots: 4 },
  { date: "3/9", weekday: "周日", slots: 6 },
  { date: "3/10", weekday: "周一", slots: 2 },
  { date: "3/11", weekday: "周二", slots: 5 },
  { date: "3/12", weekday: "周三", slots: 3 },
  { date: "3/13", weekday: "周四", slots: 0 },
  { date: "3/14", weekday: "周五", slots: 4 },
]

const timeSlots = [
  { id: 1, time: "09:00-10:00", status: "booked", bookedBy: "李女士" },
  { id: 2, time: "10:00-11:00", status: "booked", bookedBy: "社区舞蹈队" },
  { id: 3, time: "11:00-12:00", status: "available" },
  { id: 4, time: "14:00-15:00", status: "available" },
  { id: 5, time: "15:00-16:00", status: "available" },
  { id: 6, time: "16:00-17:00", status: "selected" },
  { id: 7, time: "17:00-18:00", status: "available" },
  { id: 8, time: "19:00-20:00", status: "booked", bookedBy: "瑜伽班" },
  { id: 9, time: "20:00-21:00", status: "available" },
]

const facilities = [
  { icon: "🪞", label: "落地镜" },
  { icon: "🔊", label: "音响设备" },
  { icon: "❄️", label: "空调" },
  { icon: "🚿", label: "更衣室" },
  { icon: "💧", label: "饮水机" },
  { icon: "🅿️", label: "免费停车" },
]

interface VenueDetailViewProps {
  onNavigate?: (page: string, data?: Record<string, unknown>) => void
}

export function VenueDetailView({ onNavigate }: VenueDetailViewProps) {
  const [activeDate, setActiveDate] = useState(0)
  const [selectedSlots, setSelectedSlots] = useState<number[]>([6])
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const toggleSlot = (slotId: number) => {
    const slot = timeSlots.find(s => s.id === slotId)
    if (slot?.status === "booked") return
    
    setSelectedSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    )
  }

  const getSlotStyle = (slot: typeof timeSlots[0]) => {
    if (slot.status === "booked") {
      return "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
    }
    if (selectedSlots.includes(slot.id)) {
      return "bg-primary text-primary-foreground border-primary"
    }
    return "bg-white border-border hover:border-primary/50 text-foreground"
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Cover Image */}
      <div className="relative w-full aspect-[16/10] bg-muted">
        <Image
          src={venueImages[activeImage]}
          alt="舞蹈室"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <button className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-white"}`} />
            </button>
            <button className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <Share2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Image dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {venueImages.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveImage(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeImage ? "bg-white w-4" : "bg-white/50"}`} 
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Basic Info */}
        <div className="px-4 py-4 bg-card border-b border-border/50">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-xl font-bold text-foreground">舞蹈室</h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-600 border border-emerald-500/20">
              可预约
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>金岭社区长者服务站 2楼</span>
          </div>

          {/* Quick Info */}
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              容纳20人
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              80㎡
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-medium text-foreground">4.8</span>
              <span className="text-muted-foreground">(56评价)</span>
            </span>
          </div>
        </div>

        {/* Venue Introduction */}
        <div className="px-4 py-4 bg-card border-b border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">场地简介</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            舞蹈室位于金岭社区长者服务站二楼，配备专业木质地板、落地镜面墙、音响设备等设施。
            适合舞蹈排练、瑜伽健身、太极练习等活动。场地宽敞明亮，通风良好，欢迎社区居民预约使用。
          </p>
        </div>

        {/* Facilities */}
        <div className="px-4 py-4 bg-card border-b border-border/50">
          <h2 className="text-sm font-bold text-foreground mb-3">配套设施</h2>
          <div className="grid grid-cols-6 gap-2">
            {facilities.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Date Picker */}
        <div className="px-4 py-4 bg-card border-b border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground">选择日期</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {availableDates.map((d, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDate(idx)}
                className={`flex flex-col items-center px-3 py-2 rounded-xl min-w-[56px] transition-all ${
                  activeDate === idx
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : d.slots === 0
                    ? "bg-gray-100 text-gray-400"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <span className="text-sm font-bold">{d.date}</span>
                <span className="text-[10px]">{d.weekday}</span>
                {d.slots > 0 ? (
                  <span className={`text-[9px] mt-0.5 ${activeDate === idx ? "opacity-90" : "text-emerald-600"}`}>
                    余{d.slots}场
                  </span>
                ) : (
                  <span className="text-[9px] mt-0.5">已满</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="px-4 py-4 bg-card border-b border-border/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold text-foreground">选择时段</h2>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-white border border-border" />
                可选
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-primary" />
                已选
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-gray-200" />
                已约
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => toggleSlot(slot.id)}
                disabled={slot.status === "booked"}
                className={`relative px-2 py-2.5 rounded-xl border text-center transition-all ${getSlotStyle(slot)}`}
              >
                <span className="text-xs font-medium block">{slot.time}</span>
                {slot.status === "booked" && slot.bookedBy && (
                  <span className="text-[9px] opacity-70 block mt-0.5 truncate">{slot.bookedBy}</span>
                )}
              </button>
            ))}
          </div>

          {selectedSlots.length > 0 && (
            <div className="mt-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">已选时段</span>
                <span className="font-medium text-primary">
                  {selectedSlots.length}个时段 ({selectedSlots.length}小时)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Usage Rules */}
        <div className="px-4 py-4 bg-card">
          <h2 className="text-sm font-bold text-foreground mb-3">使用须知</h2>
          <div className="space-y-2">
            {[
              "请提前10分钟到场签到，超时15分钟视为放弃",
              "场地免费向社区居民开放，需实名预约",
              "使用后请保持场地整洁，关闭电源设备",
              "禁止在场地内吸烟、饮酒或进行商业活动",
            ].map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="px-4 py-3 bg-card border-t border-border flex items-center justify-between gap-3">
        <div className="flex gap-4">
          <button className="flex flex-col items-center gap-0.5">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">电话</span>
          </button>
          <button className="flex flex-col items-center gap-0.5">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">导航</span>
          </button>
        </div>
        <button 
          onClick={() => onNavigate?.("venue-booking-form")}
          disabled={selectedSlots.length === 0}
          className={`flex-1 py-2.5 rounded-full font-semibold text-sm shadow-md transition-colors ${
            selectedSlots.length > 0 
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {selectedSlots.length > 0 ? `立即预约 (${selectedSlots.length}个时段)` : "请选择时段"}
        </button>
      </div>
    </div>
  )
}
