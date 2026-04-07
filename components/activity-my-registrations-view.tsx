"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle, QrCode, X } from "lucide-react"

const registrations = [
  {
    id: 1,
    title: "学雷锋·文明实践我行动 志愿服务主题活动",
    date: "2024-10-10 12:00 ~ 18:00",
    location: "西丽街道366志愿者岗亭",
    registeredAt: "2024-10-05 09:30",
    status: "upcoming",
    statusText: "即将开始",
    orderNo: "HY2024101000078",
    count: 1,
    tag: "志愿服务",
    tagColor: "bg-sky-500",
    canCancel: true,
    checkedIn: false,
  },
  {
    id: 2,
    title: "艺润山海——深喀艺术家采风创作交流展",
    date: "2025-12-14 10:00 ~ 17:00",
    location: "洪湖公园文化广场",
    registeredAt: "2025-12-10 14:20",
    status: "checkedin",
    statusText: "已打卡",
    orderNo: "HY2025121400023",
    count: 2,
    tag: "艺术展演",
    tagColor: "bg-emerald-500",
    canCancel: false,
    checkedIn: true,
  },
  {
    id: 3,
    title: "社区亲子运动会暨家庭趣味竞技活动",
    date: "2024-09-28 09:00 ~ 12:00",
    location: "金岭社区广场",
    registeredAt: "2024-09-20 11:15",
    status: "finished",
    statusText: "已结束",
    orderNo: "HY2024092800056",
    count: 3,
    tag: "体育健身",
    tagColor: "bg-orange-500",
    canCancel: false,
    checkedIn: false,
  },
  {
    id: 4,
    title: "长者生日会暨重阳节敬老主题活动",
    date: "2024-10-11 14:00 ~ 16:00",
    location: "金岭社区党群服务中心",
    registeredAt: "2024-10-08 16:40",
    status: "cancelled",
    statusText: "已取消",
    orderNo: "HY2024101100012",
    count: 1,
    tag: "为老服务",
    tagColor: "bg-rose-500",
    canCancel: false,
    checkedIn: false,
  },
]

const filterTabs = ["全部", "即将开始", "已打卡", "已结束", "已取消"]

const statusConfig: Record<string, { bg: string; text: string; border: string }> = {
  upcoming: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
  checkedin: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  finished: { bg: "bg-muted", text: "text-muted-foreground", border: "border-border" },
  cancelled: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
}

interface ActivityMyRegistrationsViewProps {
  onBack?: () => void
  onCheckin?: () => void
}

export function ActivityMyRegistrationsView({ onBack, onCheckin }: ActivityMyRegistrationsViewProps) {
  const [activeTab, setActiveTab] = useState("全部")

  const filtered = activeTab === "全部"
    ? registrations
    : registrations.filter(r => r.statusText === activeTab)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-muted transition-colors" aria-label="返回">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">我的报名</h1>
        <div className="w-8" />
      </div>

      {/* Stats */}
      <div className="px-4 pt-4 pb-3">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "全部", count: 4, color: "text-foreground" },
            { label: "即将开始", count: 1, color: "text-primary" },
            { label: "已打卡", count: 1, color: "text-emerald-600" },
            { label: "已结束", count: 1, color: "text-muted-foreground" },
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

      {/* Registration list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {filtered.map(reg => {
          const cfg = statusConfig[reg.status]
          return (
            <div key={reg.id} className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
              {/* Top stripe for upcoming */}
              {reg.status === "upcoming" && (
                <div className="h-1 bg-gradient-to-r from-primary to-orange-400" />
              )}
              <div className="p-4">
                {/* Title row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2 flex-1">{reg.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-semibold flex-shrink-0 ${cfg.bg} ${cfg.text}`}>
                    {reg.statusText}
                  </span>
                </div>

                {/* Tag */}
                <span className={`inline-block text-[10px] font-medium text-primary-foreground px-2 py-0.5 rounded-full mb-3 ${reg.tagColor}`}>
                  {reg.tag}
                </span>

                {/* Info */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{reg.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{reg.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>报名时间：{reg.registeredAt}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border/50 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>编号：<span className="font-mono">{reg.orderNo}</span></span>
                    <span>{reg.count}人</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {reg.canCancel && (
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted transition-colors">
                        <X className="w-3 h-3" />
                        取消报名
                      </button>
                    )}
                    {reg.status === "upcoming" && (
                      <button
                        onClick={onCheckin}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
                      >
                        <QrCode className="w-3 h-3" />
                        活动打卡
                      </button>
                    )}
                    {reg.status === "checkedin" && (
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        已打卡
                      </div>
                    )}
                    {reg.status === "finished" && !reg.checkedIn && (
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs">
                        <AlertCircle className="w-3 h-3" />
                        未打卡
                      </div>
                    )}
                    {reg.status === "cancelled" && (
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs">
                        <XCircle className="w-3 h-3" />
                        已取消
                      </div>
                    )}
                    <button className="flex items-center gap-0.5 text-xs text-primary font-medium">
                      详情
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">暂无相关记录</p>
            <p className="text-xs text-muted-foreground/70 mt-1">快去发现精彩活动吧</p>
          </div>
        )}
      </div>
    </div>
  )
}
