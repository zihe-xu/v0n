"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Plus,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  MoreHorizontal,
  CircleDot,
  CircleOff,
  Clock,
} from "lucide-react"

interface ActivityMyPublishedViewProps {
  onBack?: () => void
  onPublish?: () => void
  onViewRegistrations?: (id: number) => void
}

const myActivities = [
  {
    id: 1,
    title: "社区亲子自然探索活动",
    type: "亲子家庭",
    typeColor: "bg-amber-500",
    date: "2026-04-15",
    time: "09:00 ~ 12:00",
    location: "金岭公园",
    maxCount: 30,
    registeredCount: 18,
    status: "published",
    statusText: "已发布",
    createdAt: "2026-03-28",
  },
  {
    id: 2,
    title: "长者生日会暨重阳节敬老主题活动",
    type: "为老服务",
    typeColor: "bg-rose-500",
    date: "2026-04-20",
    time: "14:00 ~ 16:00",
    location: "金岭社区党群服务中心",
    maxCount: 50,
    registeredCount: 50,
    status: "full",
    statusText: "已满员",
    createdAt: "2026-04-01",
  },
  {
    id: 3,
    title: "社区志愿者清洁行动",
    type: "志愿服务",
    typeColor: "bg-sky-500",
    date: "2026-03-10",
    time: "08:00 ~ 11:00",
    location: "金岭社区广场",
    maxCount: 40,
    registeredCount: 35,
    status: "finished",
    statusText: "已结束",
    createdAt: "2026-02-25",
  },
  {
    id: 4,
    title: "非遗文化体验工作坊",
    type: "文化艺术",
    typeColor: "bg-emerald-500",
    date: "2026-04-28",
    time: "10:00 ~ 17:00",
    location: "思月书院",
    maxCount: 20,
    registeredCount: 5,
    status: "draft",
    statusText: "草稿",
    createdAt: "2026-04-05",
  },
]

const filterTabs = ["全部", "已发布", "已满员", "已结束", "草稿"]

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  published: { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary" },
  full:      { bg: "bg-amber-50",   text: "text-amber-700", dot: "bg-amber-500" },
  finished:  { bg: "bg-muted",      text: "text-muted-foreground", dot: "bg-muted-foreground" },
  draft:     { bg: "bg-slate-100",  text: "text-slate-500", dot: "bg-slate-400" },
}

export function ActivityMyPublishedView({ onBack, onPublish, onViewRegistrations }: ActivityMyPublishedViewProps) {
  const [activeTab, setActiveTab] = useState("全部")
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  const filtered = activeTab === "全部"
    ? myActivities
    : myActivities.filter(a => a.statusText === activeTab)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border/60">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-muted transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">我发布的活动</h1>
        <button
          onClick={onPublish}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
        >
          <Plus className="w-3.5 h-3.5" />
          发布活动
        </button>
      </div>

      {/* Stats bar */}
      <div className="px-4 pt-4 pb-3">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "全部", count: myActivities.length, color: "text-foreground" },
            { label: "进行中", count: myActivities.filter(a => a.status === "published" || a.status === "full").length, color: "text-primary" },
            { label: "已结束", count: myActivities.filter(a => a.status === "finished").length, color: "text-muted-foreground" },
            { label: "草稿", count: myActivities.filter(a => a.status === "draft").length, color: "text-slate-500" },
          ].map(stat => (
            <div key={stat.label} className="bg-card rounded-xl p-2.5 text-center shadow-sm border border-border/50">
              <span className={`text-lg font-bold ${stat.color}`}>{stat.count}</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Activity list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {filtered.map(activity => {
          const cfg = statusConfig[activity.status]
          const isMenuOpen = openMenuId === activity.id
          const fillRate = Math.round((activity.registeredCount / activity.maxCount) * 100)

          return (
            <div
              key={activity.id}
              className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden"
            >
              {/* Top accent */}
              {(activity.status === "published" || activity.status === "full") && (
                <div className="h-1 bg-gradient-to-r from-primary to-orange-400" />
              )}

              <div className="p-4">
                {/* Title row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-foreground leading-snug flex-1 line-clamp-2">
                    {activity.title}
                  </h3>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {activity.statusText}
                    </span>
                    {/* More menu */}
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(isMenuOpen ? null : activity.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                      {isMenuOpen && (
                        <div className="absolute right-0 top-8 z-20 bg-card border border-border rounded-xl shadow-lg py-1 min-w-[120px]">
                          <button
                            onClick={() => setOpenMenuId(null)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-muted transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5 text-primary" />
                            编辑活动
                          </button>
                          {activity.status === "published" && (
                            <button
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-muted transition-colors"
                            >
                              <CircleOff className="w-3.5 h-3.5 text-amber-500" />
                              下线活动
                            </button>
                          )}
                          {activity.status === "draft" && (
                            <button
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-muted transition-colors"
                            >
                              <CircleDot className="w-3.5 h-3.5 text-primary" />
                              发布活动
                            </button>
                          )}
                          {activity.status !== "finished" && (
                            <button
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              删除活动
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Type tag */}
                <span className={`inline-block text-[10px] font-medium text-primary-foreground px-2 py-0.5 rounded-full mb-3 ${activity.typeColor}`}>
                  {activity.type}
                </span>

                {/* Info */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{activity.location}</span>
                  </div>
                </div>

                {/* Registration progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      已报名 <span className="font-bold text-foreground">{activity.registeredCount}</span>/{activity.maxCount}人
                    </span>
                    <span className={`text-xs font-semibold ${fillRate >= 100 ? "text-amber-600" : fillRate >= 80 ? "text-primary" : "text-muted-foreground"}`}>
                      {fillRate}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${fillRate >= 100 ? "bg-amber-500" : "bg-primary"}`}
                      style={{ width: `${Math.min(fillRate, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="text-[10px] text-muted-foreground">
                    发布于 {activity.createdAt}
                  </span>
                  <button
                    onClick={() => onViewRegistrations?.(activity.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    查看报名
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">暂无活动</p>
            <button
              onClick={onPublish}
              className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              发布第一个活动
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
