"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Share2, Heart, MapPin, Users, Star, Phone, MessageCircle, Shield, Camera, Award, Apple, Stethoscope } from "lucide-react"

const highlights = [
  { id: 1, icon: Camera, label: "全景监控", color: "text-sky-500", bg: "bg-sky-500/10" },
  { id: 2, icon: Award, label: "持证执教", color: "text-amber-500", bg: "bg-amber-500/10" },
  { id: 3, icon: Apple, label: "营养膳食", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: 4, icon: Stethoscope, label: "每日晨检", color: "text-rose-500", bg: "bg-rose-500/10" },
]

const availableDates = [
  { date: "1/29", weekday: "星期四", active: true },
  { date: "1/30", weekday: "星期五", active: false },
  { date: "1/31", weekday: "星期六", active: false },
  { date: "2/1", weekday: "星期日", active: false },
  { date: "2/2", weekday: "星期一", active: false },
]

const timeSlots = [
  { time: "08:30-11:30", remaining: 0, available: false },
  { time: "14:30-17:30", remaining: 4, available: true },
]

const teacherInfo = [
  { name: "王老师", role: "园长", exp: "15年经验", avatar: "/images/avatar-teacher-1.jpg" },
  { name: "李老师", role: "主班", exp: "8年经验", avatar: "/images/avatar-teacher-2.jpg" },
  { name: "张老师", role: "保育", exp: "5年经验", avatar: "/images/avatar-teacher-3.jpg" },
]

const reviews = [
  { user: "阳阳妈妈", rating: 5, content: "老师很专业，孩子每天都很开心回家，强烈推荐！", time: "3天前" },
  { user: "小米爸爸", rating: 5, content: "环境干净整洁，监控可以随时看，很放心。", time: "1周前" },
]

export function ChildcareDetailView() {
  const [activeDate, setActiveDate] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Cover Image with overlay header */}
      <div className="relative w-full aspect-[16/10] bg-muted">
        <Image
          src="/images/nursery-1.jpg"
          alt="托育点环境"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        
        {/* Header overlay */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <button className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-white" />
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

        {/* Image dots indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/50"}`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Basic Info Card */}
        <div className="px-4 py-4 bg-card border-b border-border/50">
          <h1 className="text-xl font-bold text-foreground mb-2">金岭社区托育点</h1>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-primary" />
              适龄 0-3岁
            </span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>师生比 1:5</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/15 text-amber-600 border border-amber-500/20">
              公立普惠
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-sky-500/15 text-sky-600 border border-sky-500/20">
              0-3岁
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-rose-500/15 text-rose-600 border border-rose-500/20">
              金三银
            </span>
          </div>

          {/* Rating & Distance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">4.9</span>
              <span className="text-xs text-muted-foreground">(128条评价)</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-primary font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>200m</span>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="px-4 py-4 bg-card border-b border-border/50">
          <h2 className="text-sm font-bold text-foreground mb-3">机构亮点</h2>
          <div className="grid grid-cols-4 gap-2">
            {highlights.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-1.5">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <span className="text-[10px] text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Team */}
        <div className="px-4 py-4 bg-card border-b border-border/50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">师资团队</h2>
            <span className="text-xs text-primary">查看全部</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {teacherInfo.map((teacher, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[64px]">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-100 to-primary/20 flex items-center justify-center text-lg font-bold text-primary border-2 border-primary/20">
                  {teacher.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-foreground">{teacher.name}</span>
                <span className="text-[10px] text-muted-foreground">{teacher.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Available Slots */}
        <div className="px-4 py-4 bg-card border-b border-border/50">
          <h2 className="text-sm font-bold text-foreground mb-3">可预约托位</h2>
          
          {/* Date Picker */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
            {availableDates.map((d, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDate(idx)}
                className={`flex flex-col items-center px-3 py-2 rounded-xl min-w-[60px] transition-all ${
                  activeDate === idx
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                <span className="text-sm font-bold">{d.date}</span>
                <span className="text-[10px]">{d.weekday}</span>
              </button>
            ))}
          </div>

          {/* Time Slots */}
          <div className="space-y-2">
            <h3 className="text-xs text-muted-foreground mb-2">预约时间段</h3>
            {timeSlots.map((slot, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  slot.available
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-muted/30"
                }`}
              >
                <span className={`text-sm font-medium ${slot.available ? "text-foreground" : "text-muted-foreground"}`}>
                  {slot.time}
                </span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs ${slot.available ? "text-emerald-600" : "text-muted-foreground"}`}>
                    当日剩余 {slot.remaining}
                  </span>
                  <button
                    disabled={!slot.available}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      slot.available
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    立即预约
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Preview */}
        <div className="px-4 py-4 bg-card border-b border-border/50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">家长评价</h2>
            <span className="text-xs text-primary">128条评价</span>
          </div>
          <div className="space-y-3">
            {reviews.map((review, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-muted/30">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                      {review.user.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-foreground">{review.user}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-2.5 h-2.5 ${i <= review.rating ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{review.content}</p>
                <span className="text-[10px] text-muted-foreground/70 mt-1 block">{review.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location Map Preview */}
        <div className="px-4 py-4 bg-card">
          <h2 className="text-sm font-bold text-foreground mb-3">机构位置</h2>
          <div className="relative w-full aspect-[2/1] rounded-xl bg-gradient-to-br from-emerald-50 to-sky-50 overflow-hidden border border-border/50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-muted-foreground bg-white/80 px-2 py-0.5 rounded-full">党群中心2楼</span>
              </div>
            </div>
            {/* Map grid pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground/30"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">金岭社区党群服务中心 2楼</span>
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
            <MessageCircle className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">咨询</span>
          </button>
        </div>
        <button className="flex-1 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90 transition-colors">
          立即预约
        </button>
      </div>
    </div>
  )
}
