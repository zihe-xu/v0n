"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
  ChevronDown,
  MapPin,
  CalendarDays,
  Navigation,
} from "lucide-react"

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"]

interface DayData {
  day: number
  count: number
  isCurrentMonth: boolean
}

function generateCalendarData(): DayData[] {
  const prevMonthDays = [29, 30, 31]
  const data: DayData[] = prevMonthDays.map((d) => ({
    day: d,
    count: 0,
    isCurrentMonth: false,
  }))

  const dayCounts = [0, 0, 6, 5, 4, 3, 31, 3, 3, 3, 10, 3, 2, 13, 2, 2, 2, 17, 2, 18, 2, 2, 2, 2, 2, 21, 2, 25, 21, 1, 1]
  for (let i = 1; i <= 31; i++) {
    data.push({
      day: i,
      count: dayCounts[i - 1] || 0,
      isCurrentMonth: true,
    })
  }
  return data
}

const activities = [
  {
    id: 1,
    title: "艺润山海——深喀艺术家采风创作交流展",
    dateRange: "2025-12-14 ~ 2026-01-10",
    district: "罗湖区",
    venue: "洪湖公园",
    tags: ["艺术展演"],
    tagColor: "bg-emerald-500",
    distance: "1.8km",
    image: "/images/art-exhibition.jpg",
  },
  {
    id: 2,
    title: "学雷锋·文明实践我行动 志愿服务活动",
    dateRange: "2026-01-06 ~ 2026-01-06",
    district: "罗湖区",
    venue: "水贝社区",
    tags: ["志愿服务"],
    tagColor: "bg-sky-500",
    distance: "2.3km",
    image: "/images/volunteer-activity.jpg",
  },
]

interface ActivityCalendarViewProps {
  onActivityClick?: (id: number) => void
}

export function ActivityCalendarView({ onActivityClick }: ActivityCalendarViewProps) {
  const [selectedDay, setSelectedDay] = useState(6)
  const [calendarExpanded, setCalendarExpanded] = useState(true)
  const calendarData = generateCalendarData()

  return (
    <div className="bg-background min-h-full">
      {/* Banner */}
      <div className="relative w-full h-[120px] overflow-hidden">
        <Image
          src="/images/calendar-banner.jpg"
          alt="活动日历横幅"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        <div className="absolute inset-0 flex items-center justify-end pr-5">
          <h2 className="text-2xl font-bold text-primary-foreground drop-shadow-md tracking-wider">
            活动日历
          </h2>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="mx-3 -mt-4 relative z-10 rounded-2xl bg-card shadow-lg overflow-hidden border border-border/50">
        {/* Month Navigation */}
        <div className="flex items-center justify-between px-4 py-3 bg-primary/5">
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors" aria-label="上个月">
              <ChevronLeft className="w-4 h-4 text-primary" />
            </button>
            <span className="text-sm font-bold text-foreground">2026年1月</span>
            <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors" aria-label="下个月">
              <ChevronRight className="w-4 h-4 text-primary" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              共77场
            </span>
            <button
              onClick={() => setCalendarExpanded(!calendarExpanded)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {calendarExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  收起日历
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  展开日历
                </>
              )}
            </button>
          </div>
        </div>

        {calendarExpanded && (
          <div className="px-2 pb-3">
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {WEEKDAYS.map((d) => (
                <div key={d} className="text-center py-2 text-xs font-semibold text-muted-foreground">
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-0.5">
              {calendarData.map((d, i) => {
                const isSelected = d.isCurrentMonth && d.day === selectedDay
                const isToday = d.isCurrentMonth && d.day === 6

                return (
                  <button
                    key={i}
                    onClick={() => d.isCurrentMonth && setSelectedDay(d.day)}
                    disabled={!d.isCurrentMonth}
                    className={`relative flex flex-col items-center py-1.5 rounded-xl transition-all ${
                      !d.isCurrentMonth
                        ? "text-muted-foreground/30"
                        : isSelected
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                        : "text-foreground hover:bg-primary/5"
                    }`}
                  >
                    <span className={`text-sm font-semibold leading-tight ${
                      isToday && !isSelected ? "text-primary" : ""
                    }`}>
                      {d.day}
                    </span>
                    {d.isCurrentMonth && d.count > 0 && (
                      <span className={`text-[9px] leading-tight mt-0.5 ${
                        isSelected
                          ? "text-primary-foreground/80"
                          : "text-primary/70"
                      }`}>
                        {d.count}场
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 px-4 py-3 mt-2">
        <button className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-sm">
          全部
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-card text-foreground text-xs font-medium border border-border hover:bg-muted transition-colors">
          按类型
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-card text-foreground text-xs font-medium border border-border hover:bg-muted transition-colors">
          按区域
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </button>
        <div className="flex-1" />
        <button className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="搜索">
          <Search className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Activity List */}
      <div className="px-3 pb-4 flex flex-col gap-3">
        {activities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => onActivityClick?.(activity.id)}
            className="flex gap-3 p-3 rounded-2xl bg-card shadow-sm border border-border/50 text-left hover:shadow-md transition-shadow group"
          >
            {/* Thumbnail */}
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div>
                <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2 mb-1">
                  {activity.title}
                </h3>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <CalendarDays className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{activity.dateRange}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span>{activity.district}</span>
                  <span className="text-border">|</span>
                  <span>{activity.venue}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <div className="flex gap-1">
                  {activity.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-medium text-primary-foreground px-2 py-0.5 rounded-full ${activity.tagColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                  <Navigation className="w-3 h-3" />
                  {activity.distance}
                </div>
              </div>
            </div>
          </button>
        ))}

        {/* Load more indicator */}
        <div className="flex justify-center py-2">
          <span className="text-xs text-muted-foreground">上拉加载更多活动</span>
        </div>
      </div>
    </div>
  )
}
