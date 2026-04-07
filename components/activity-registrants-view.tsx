"use client"

import { useState } from "react"
import {
  ChevronLeft,
  Users,
  Search,
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Filter,
  UserCheck,
} from "lucide-react"

interface ActivityRegistrantsViewProps {
  onBack?: () => void
}

const registrants = [
  { id: 1,  name: "张小明", phone: "138****6621", registeredAt: "2026-04-06 09:12", status: "checkedin",  statusText: "已打卡" },
  { id: 2,  name: "李红梅", phone: "139****0823", registeredAt: "2026-04-06 10:05", status: "registered", statusText: "已报名" },
  { id: 3,  name: "王建国", phone: "186****5517", registeredAt: "2026-04-06 10:48", status: "checkedin",  statusText: "已打卡" },
  { id: 4,  name: "陈丽芳", phone: "152****7743", registeredAt: "2026-04-06 11:30", status: "registered", statusText: "已报名" },
  { id: 5,  name: "刘伟明", phone: "177****2291", registeredAt: "2026-04-06 13:15", status: "cancelled",  statusText: "已取消" },
  { id: 6,  name: "赵云帆", phone: "135****8834", registeredAt: "2026-04-06 14:02", status: "registered", statusText: "已报名" },
  { id: 7,  name: "孙晓丽", phone: "158****6609", registeredAt: "2026-04-06 14:55", status: "checkedin",  statusText: "已打卡" },
  { id: 8,  name: "周国庆", phone: "131****4422", registeredAt: "2026-04-07 08:30", status: "registered", statusText: "已报名" },
  { id: 9,  name: "吴佳琪", phone: "187****0078", registeredAt: "2026-04-07 09:10", status: "registered", statusText: "已报名" },
  { id: 10, name: "郑明远", phone: "136****3315", registeredAt: "2026-04-07 10:22", status: "cancelled",  statusText: "已取消" },
]

const filterTabs = ["全部", "已报名", "已打卡", "已取消"]

const statusConfig: Record<string, { bg: string; text: string; icon: typeof CheckCircle2 }> = {
  registered: { bg: "bg-primary/10",  text: "text-primary",        icon: Clock       },
  checkedin:  { bg: "bg-emerald-50",  text: "text-emerald-700",    icon: CheckCircle2 },
  cancelled:  { bg: "bg-red-50",      text: "text-red-500",        icon: XCircle      },
}

export function ActivityRegistrantsView({ onBack }: ActivityRegistrantsViewProps) {
  const [activeTab, setActiveTab] = useState("全部")
  const [searchText, setSearchText] = useState("")

  const filtered = registrants
    .filter(r => activeTab === "全部" || r.statusText === activeTab)
    .filter(r =>
      !searchText ||
      r.name.includes(searchText) ||
      r.phone.includes(searchText)
    )

  const checkedinCount  = registrants.filter(r => r.status === "checkedin").length
  const registeredCount = registrants.filter(r => r.status === "registered").length
  const cancelledCount  = registrants.filter(r => r.status === "cancelled").length
  const totalValid      = registrants.filter(r => r.status !== "cancelled").length

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border/60">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-muted transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">报名人员</h1>
        <button className="flex items-center gap-1 text-xs text-primary font-medium">
          <Download className="w-3.5 h-3.5" />
          导出
        </button>
      </div>

      {/* Activity summary */}
      <div className="px-4 pt-4 pb-3 bg-gradient-to-r from-primary/5 to-orange-50 border-b border-border/30">
        <h2 className="text-sm font-bold text-foreground mb-1 line-clamp-1">
          社区亲子自然探索活动
        </h2>
        <p className="text-xs text-muted-foreground">2026-04-15 · 09:00~12:00 · 金岭公园</p>
      </div>

      {/* Stats */}
      <div className="px-4 pt-3 pb-3">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "有效报名", count: totalValid,      color: "text-foreground" },
            { label: "已报名",   count: registeredCount, color: "text-primary"    },
            { label: "已打卡",   count: checkedinCount,  color: "text-emerald-600"},
            { label: "已取消",   count: cancelledCount,  color: "text-red-500"    },
          ].map(stat => (
            <div key={stat.label} className="bg-card rounded-xl p-2.5 text-center shadow-sm border border-border/50">
              <span className={`text-lg font-bold ${stat.color}`}>{stat.count}</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Capacity bar */}
        <div className="mt-3 bg-card rounded-xl p-3 border border-border/50">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              名额使用
            </span>
            <span className="text-xs font-bold text-foreground">
              {totalValid}<span className="text-muted-foreground font-normal">/30 人</span>
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full transition-all"
              style={{ width: `${Math.min((totalValid / 30) * 100, 100)}%` }}
            />
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 text-[10px] text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              已打卡 {checkedinCount}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-primary">
              <span className="w-2 h-2 rounded-full bg-primary" />
              待参与 {registeredCount}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              剩余 {30 - totalValid}
            </span>
          </div>
        </div>
      </div>

      {/* Search + filter */}
      <div className="px-4 pb-3 space-y-2">
        <div className="flex items-center gap-2 px-3 py-2.5 bg-card rounded-xl border border-border/60">
          <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="搜索姓名或手机号"
            className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground"
          />
          {searchText && (
            <button onClick={() => setSearchText("")} className="text-muted-foreground hover:text-foreground">
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 flex-1 overflow-x-auto scrollbar-hide">
            {filterTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground border border-border hover:bg-muted"
                }`}
              >
                {tab}
                {tab !== "全部" && (
                  <span className="ml-1 opacity-70">
                    ({tab === "已报名" ? registeredCount : tab === "已打卡" ? checkedinCount : cancelledCount})
                  </span>
                )}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-border text-xs text-muted-foreground flex-shrink-0">
            <Filter className="w-3 h-3" />
            排序
          </button>
        </div>
      </div>

      {/* Registrant list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
        {filtered.map((person, index) => {
          const cfg = statusConfig[person.status]
          const Icon = cfg.icon
          return (
            <div
              key={person.id}
              className="flex items-center gap-3 bg-card rounded-2xl px-4 py-3 shadow-sm border border-border/50"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-orange-200 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">{person.name.charAt(0)}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">{person.name}</span>
                  <span className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${cfg.bg} ${cfg.text}`}>
                    <Icon className="w-3 h-3" />
                    {person.statusText}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                    <Phone className="w-3 h-3" />
                    {person.phone}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {person.registeredAt}
                  </span>
                </div>
              </div>

              {/* Sequence number */}
              <span className="text-[10px] text-muted-foreground/60 font-mono flex-shrink-0">
                #{String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-3">
              <UserCheck className="w-7 h-7 text-muted-foreground/50" />
            </div>
            <p className="text-sm text-muted-foreground">暂无相关记录</p>
          </div>
        )}
      </div>
    </div>
  )
}
