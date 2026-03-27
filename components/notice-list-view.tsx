"use client"

import Image from "next/image"
import { Bell, ChevronRight } from "lucide-react"

const notices = [
  {
    id: 1,
    title: "关于开展2024年社区体检的通知公告",
    time: "2024-10-10 12:00",
    source: "罗湖区委组织部",
    image: "/images/notice-1.jpg",
    isNew: true,
  },
  {
    id: 2,
    title: "关于社区环境整治行动的通知公告",
    time: "2024-10-08 09:30",
    source: "水贝社区党委",
    image: "/images/notice-2.jpg",
    isNew: true,
  },
  {
    id: 3,
    title: "关于加强社区安全防范工作的通知",
    time: "2024-10-05 14:00",
    source: "金岭社区服务中心",
    image: "/images/notice-3.jpg",
    isNew: false,
  },
  {
    id: 4,
    title: "关于举办社区文化节活动的通知公告",
    time: "2024-09-28 10:00",
    source: "罗湖区文化体育局",
    image: "/images/notice-4.jpg",
    isNew: false,
  },
]

export function NoticeListView() {
  return (
    <div className="bg-background min-h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="w-8" />
        <h1 className="text-lg font-semibold text-foreground">通知公告</h1>
        <div className="flex items-center gap-2">
          <button className="relative p-1.5 rounded-full hover:bg-muted transition-colors" aria-label="通知">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
        </div>
      </div>

      {/* Top decoration banner */}
      <div className="mx-4 mt-4 mb-2 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-amber-50 p-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center">
              <Bell className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">社区公告栏</h2>
              <p className="text-[11px] text-muted-foreground">及时了解社区最新动态</p>
            </div>
          </div>
        </div>
        {/* Decorative */}
        <svg className="absolute right-2 bottom-0 w-20 h-20 opacity-[0.06]" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="2" className="text-primary" />
          <path d="M40 15 V40 H60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary" />
          <circle cx="40" cy="40" r="3" fill="currentColor" className="text-primary" />
        </svg>
      </div>

      {/* Tab filters */}
      <div className="flex items-center gap-2 px-4 py-2">
        <button className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-sm">
          全部
        </button>
        <button className="px-4 py-1.5 rounded-full bg-card text-muted-foreground text-xs font-medium border border-border hover:border-primary/30 hover:text-foreground transition-colors">
          最新
        </button>
        <button className="px-4 py-1.5 rounded-full bg-card text-muted-foreground text-xs font-medium border border-border hover:border-primary/30 hover:text-foreground transition-colors">
          重要
        </button>
      </div>

      {/* Notice List */}
      <div className="flex-1 px-4 py-2 flex flex-col gap-3">
        {notices.map((notice) => (
          <button
            key={notice.id}
            className="flex items-stretch gap-3 p-3 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all text-left group"
          >
            {/* Thumbnail */}
            <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={notice.image}
                alt={notice.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {notice.isNew && (
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-red-500 text-[9px] text-white font-bold">
                  NEW
                </div>
              )}
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {notice.title}
              </h3>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                    <path d="M6 3V6L8 7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  {notice.time}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                    <rect x="1.5" y="2.5" width="9" height="7" rx="1" stroke="currentColor" strokeWidth="1" />
                    <path d="M4 1.5V3.5M8 1.5V3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  {notice.source}
                </div>
              </div>
            </div>
            {/* Arrow */}
            <div className="flex items-center flex-shrink-0">
              <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
            </div>
          </button>
        ))}
      </div>

      {/* Load more hint */}
      <div className="py-4 text-center">
        <span className="text-xs text-muted-foreground">
          ---- 已加载全部公告 ----
        </span>
      </div>
    </div>
  )
}
