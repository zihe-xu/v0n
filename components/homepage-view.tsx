"use client"

import Image from "next/image"
import {
  Search,
  Mic,
  ChevronRight,
  ChevronDown,
  MapPin,
  Bell,
  FileText,
  Stethoscope,
  Baby,
  Car,
  BookOpen,
  UtensilsCrossed,
  Briefcase,
  MessageSquare,
} from "lucide-react"

interface HomepageViewProps {
  onNavigate?: (page: string) => void
}

export function HomepageView({ onNavigate }: HomepageViewProps) {
  const quickLinks = [
    { icon: FileText, label: "社区办事", color: "bg-primary/10 text-primary", page: "services" },
    { icon: Stethoscope, label: "医疗服务", color: "bg-blue-50 text-blue-500", page: "services" },
    { icon: Baby, label: "社区托育", color: "bg-yellow-50 text-yellow-600", page: "childcare" },
    { icon: Car, label: "智慧停车", color: "bg-emerald-50 text-emerald-500", page: "services" },
    { icon: BookOpen, label: "图书借阅", color: "bg-purple-50 text-purple-500", page: "services" },
    { icon: UtensilsCrossed, label: "长者食堂", color: "bg-orange-50 text-orange-500", page: "canteen" },
    { icon: Briefcase, label: "社区招工", color: "bg-rose-50 text-rose-500", page: "job" },
    { icon: MessageSquare, label: "民意速办", color: "bg-cyan-50 text-cyan-500", page: "feedback" },
  ]

  const newsItems = [
    { tag: "社区公告", text: "智慧社区小程序新上线" },
    { tag: "社区动态", text: "智慧社区小程序新上线 最新民生..." },
  ]

  const activities = [
    {
      image: "/images/activity-science.jpg",
      title: "亲子携手科普行，社区共绘文明卷",
      status: "报名中",
      enrolled: "1/10",
    },
    {
      image: "/images/activity-health.jpg",
      title: "社区公益大集合，健康生活、科普知识全都有",
      status: "报名中",
      enrolled: "1/10",
    },
    {
      image: "/images/activity-volunteer.jpg",
      title: "公益进社区，老少齐参与，生活更舒心",
      status: "报名中",
      enrolled: "1/10",
    },
  ]

  return (
    <div className="flex flex-col min-h-full bg-background overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground px-4 pt-2 pb-4">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3">
          <button className="flex items-center gap-1 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>金岭社区</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <h1 className="text-lg font-bold">智慧社区</h1>
          <div className="flex items-center gap-3">
            <button className="w-6 h-6 flex items-center justify-center">
              <span className="text-lg">...</span>
            </button>
            <button className="w-6 h-6 rounded-full border-2 border-primary-foreground/50 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white/95 rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground flex-1">输入关键字进行搜索</span>
            <button className="text-primary">
              <Mic className="w-4 h-4" />
            </button>
          </div>
          <button className="text-sm font-medium whitespace-nowrap flex items-center gap-0.5">
            老年专区
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-28 -mt-1">
        <Image
          src="/images/hero-banner.jpg"
          alt="社区全景"
          fill
          className="object-cover"
        />
      </div>

      {/* Quick Links Card */}
      <div className="mx-3 -mt-6 relative z-10 bg-card rounded-2xl shadow-lg border border-border/50 p-4">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-primary">为您推荐</span>
            <span className="text-sm text-muted-foreground">我的定制</span>
          </div>
          <button className="text-xs text-muted-foreground flex items-center gap-0.5">
            更多
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Icons Grid */}
        <div className="grid grid-cols-4 gap-3">
          {quickLinks.map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1.5"
              onClick={() => onNavigate?.(item.page)}
            >
              <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-foreground">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* News Ticker */}
      <div className="mx-3 mt-3 bg-card rounded-xl border border-border/50 p-3">
        <div className="flex items-start gap-2">
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-primary" />
            </div>
            <span className="text-xs font-bold text-foreground leading-tight">社区<br/>动态</span>
          </div>
          <div className="flex-1 space-y-1 min-w-0">
            {newsItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 ${
                  item.tag === "社区公告" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-amber-100 text-amber-600"
                }`}>
                  {item.tag}
                </span>
                <span className="text-muted-foreground truncate">{item.text}</span>
              </div>
            ))}
          </div>
          <button 
            className="text-xs text-muted-foreground shrink-0"
            onClick={() => onNavigate?.("notice")}
          >
            更多
            <ChevronRight className="w-3 h-3 inline" />
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="mx-3 mt-3 grid grid-cols-2 gap-2">
        <button 
          className="relative h-20 rounded-xl overflow-hidden bg-gradient-to-br from-primary to-orange-400"
          onClick={() => onNavigate?.("services")}
        >
          <div className="absolute inset-0 p-3 text-primary-foreground">
            <h3 className="font-bold text-sm">行街指南</h3>
            <p className="text-[10px] opacity-90 mt-0.5">来一场说走就走的</p>
            <p className="text-[10px] opacity-90">"City Walk"</p>
          </div>
        </button>
        <button 
          className="relative h-20 rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-500"
          onClick={() => onNavigate?.("map-list")}
        >
          <div className="absolute inset-0 p-3 text-primary-foreground">
            <h3 className="font-bold text-sm">掌上地图</h3>
            <p className="text-[10px] opacity-90 mt-0.5">身边资源，</p>
            <p className="text-[10px] opacity-90">轻松掌上查</p>
          </div>
        </button>
      </div>

      {/* Important Notice Banner */}
      <div className="mx-3 mt-3">
        <button 
          className="w-full relative h-16 rounded-xl overflow-hidden bg-gradient-to-r from-primary via-orange-400 to-amber-400"
          onClick={() => onNavigate?.("notice")}
        >
          <div className="absolute inset-0 flex items-center px-4">
            <div className="flex-1">
              <h3 className="font-bold text-primary-foreground text-base">社区重要通知</h3>
            </div>
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/50"}`} 
                />
              ))}
            </div>
          </div>
        </button>
      </div>

      {/* Venue Booking */}
      <div className="mx-3 mt-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-1">
            <span className="text-primary">◆</span>
            场馆预约
          </h2>
          <button 
            className="text-xs text-primary flex items-center gap-0.5"
            onClick={() => onNavigate?.("venue-map")}
          >
            查看地图
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-2">
          <button 
            className="w-full flex items-center gap-3 bg-gradient-to-r from-primary/10 to-orange-50 rounded-xl p-3 border border-primary/20"
            onClick={() => onNavigate?.("venue-detail")}
          >
            <div className="flex-1">
              <h3 className="font-bold text-primary text-sm text-left">图书馆预约</h3>
              <span className="text-[10px] text-primary/70 flex items-center gap-0.5">
                前往预约
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <div className="w-16 h-12 rounded-lg overflow-hidden relative">
              <Image src="/images/venue-library.jpg" alt="图书馆" fill className="object-cover" />
            </div>
          </button>
          <div className="flex items-center gap-2">
            <button 
              className="flex-1 flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100"
              onClick={() => onNavigate?.("venue-detail")}
            >
              <div className="flex-1">
                <h3 className="font-bold text-blue-600 text-sm text-left">博物馆预约</h3>
                <span className="text-[10px] text-blue-500/70 flex items-center gap-0.5">
                  前往预约
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
              <div className="w-12 h-10 rounded-lg overflow-hidden relative">
                <Image src="/images/venue-museum.jpg" alt="博物馆" fill className="object-cover" />
              </div>
            </button>
            <button 
              className="w-24 h-16 rounded-xl bg-gradient-to-br from-violet-50 to-primary/10 border border-primary/20 p-2 flex flex-col justify-center items-center"
              onClick={() => onNavigate?.("venue-map")}
            >
              <span className="text-[10px] text-primary font-medium">场地分布</span>
              <span className="text-[10px] text-primary/70">楼层导视</span>
              <span className="text-[10px] text-primary/50">点击查看</span>
            </button>
          </div>
        </div>
      </div>

      {/* Activity Zone */}
      <div className="mx-3 mt-4 pb-20">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-1">
            <span className="text-primary">◆</span>
            活动专区
          </h2>
          <button 
            className="text-xs text-primary flex items-center gap-0.5"
            onClick={() => onNavigate?.("activity")}
          >
            查看更多
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Activity Tabs */}
        <div className="flex items-center gap-2 mb-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {["社区活动", "党群公益", "长者服务站", "公益及普..."].map((tab, i) => (
            <button
              key={tab}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${
                i === 0 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Activity List */}
        <div className="space-y-3">
          {activities.map((activity, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 bg-card rounded-xl p-3 border border-border/50 text-left"
              onClick={() => onNavigate?.("activity")}
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden relative shrink-0">
                <Image src={activity.image} alt={activity.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground line-clamp-2">{activity.title}</h3>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary">
                  {activity.status}
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">报名人数：{activity.enrolled}</span>
                  <span className="text-xs text-primary">查看详情+</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
