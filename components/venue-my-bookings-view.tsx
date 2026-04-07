"use client"

import { useState } from "react"
import { ChevronLeft, Calendar, Clock, MapPin, ChevronRight, CheckCircle2, XCircle, Loader2, AlertCircle, X } from "lucide-react"

const myBookings = [
  {
    id: "VN20240407001",
    venueName: "舞蹈室",
    venueLocation: "金岭社区长者服务站 2楼",
    date: "2024年4月7日（周日）",
    timeSlot: "16:00 - 17:00",
    purpose: "社区舞蹈队排练",
    participants: 12,
    status: "pending",
    submitTime: "2024-04-05 14:23",
    reviewNote: "",
  },
  {
    id: "VN20240403002",
    venueName: "多功能室",
    venueLocation: "金岭社区文化活动中心 2楼",
    date: "2024年4月10日（周三）",
    timeSlot: "09:00 - 11:00",
    purpose: "党员学习活动",
    participants: 30,
    status: "approved",
    submitTime: "2024-04-03 10:05",
    reviewNote: "已审核通过，请按时到场",
  },
  {
    id: "VN20240401003",
    venueName: "新时代大讲堂",
    venueLocation: "金岭社区文化活动中心 1楼",
    date: "2024年4月15日（周一）",
    timeSlot: "14:00 - 16:00",
    purpose: "健康知识讲座",
    participants: 60,
    status: "approved",
    submitTime: "2024-04-01 09:30",
    reviewNote: "",
  },
  {
    id: "VN20240328004",
    venueName: "儿童友好空间",
    venueLocation: "金岭社区文化活动中心 3楼",
    date: "2024年4月2日（周二）",
    timeSlot: "10:00 - 12:00",
    purpose: "亲子阅读活动",
    participants: 15,
    status: "rejected",
    submitTime: "2024-03-28 16:45",
    reviewNote: "该时段已有活动占用，请选择其他时段重新申请",
  },
  {
    id: "VN20240320005",
    venueName: "舞蹈室",
    venueLocation: "金岭社区长者服务站 2楼",
    date: "2024年3月25日（周一）",
    timeSlot: "19:00 - 21:00",
    purpose: "广场舞培训",
    participants: 18,
    status: "completed",
    submitTime: "2024-03-20 11:20",
    reviewNote: "",
  },
  {
    id: "VN20240310006",
    venueName: "中医理疗室",
    venueLocation: "金岭社区长者服务站 2楼",
    date: "2024年3月16日（周六）",
    timeSlot: "09:00 - 10:00",
    purpose: "老年健康服务",
    participants: 8,
    status: "cancelled",
    submitTime: "2024-03-10 08:55",
    reviewNote: "",
  },
]

const tabs = [
  { id: "all", label: "全部" },
  { id: "pending", label: "审批中" },
  { id: "approved", label: "已通过" },
  { id: "rejected", label: "已拒绝" },
  { id: "completed", label: "已完成" },
  { id: "cancelled", label: "已取消" },
]

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending: {
    label: "审批中",
    color: "text-amber-600",
    bg: "bg-amber-50 border-amber-200",
    icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
  },
  approved: {
    label: "已通过",
    color: "text-emerald-600",
    bg: "bg-emerald-50 border-emerald-200",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  rejected: {
    label: "已拒绝",
    color: "text-red-500",
    bg: "bg-red-50 border-red-200",
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
  completed: {
    label: "已完成",
    color: "text-muted-foreground",
    bg: "bg-muted border-border",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  cancelled: {
    label: "已取消",
    color: "text-muted-foreground",
    bg: "bg-muted border-border",
    icon: <X className="w-3.5 h-3.5" />,
  },
}

interface VenueMyBookingsViewProps {
  onBack?: () => void
}

export function VenueMyBookingsView({ onBack }: VenueMyBookingsViewProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [cancelTarget, setCancelTarget] = useState<string | null>(null)

  const filtered = activeTab === "all" ? myBookings : myBookings.filter(b => b.status === activeTab)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary to-primary/80">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-white font-bold flex-1">我的预约</h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-0 border-b border-border/50 bg-card">
        {[
          { label: "全部", count: myBookings.length, color: "text-foreground" },
          { label: "审批中", count: myBookings.filter(b => b.status === "pending").length, color: "text-amber-600" },
          { label: "已通过", count: myBookings.filter(b => b.status === "approved").length, color: "text-emerald-600" },
          { label: "已完成", count: myBookings.filter(b => b.status === "completed").length, color: "text-muted-foreground" },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center py-3 border-r border-border/30 last:border-0">
            <span className={`text-xl font-bold ${s.color}`}>{s.count}</span>
            <span className="text-[10px] text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border/50 px-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-1 py-2 min-w-max">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Booking List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <AlertCircle className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">暂无预约记录</p>
          </div>
        )}
        {filtered.map((booking) => {
          const cfg = statusConfig[booking.status]
          return (
            <div key={booking.id} className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/20">
                <div>
                  <h3 className="text-sm font-bold text-foreground">{booking.venueName}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{booking.venueLocation}</p>
                </div>
                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color}`}>
                  {cfg.icon}
                  {cfg.label}
                </span>
              </div>

              {/* Card Body */}
              <div className="px-4 py-3 space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{booking.timeSlot}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="line-clamp-1">{booking.purpose}（{booking.participants}人）</span>
                </div>

                {/* Review note for rejected */}
                {booking.status === "rejected" && booking.reviewNote && (
                  <div className="mt-1 p-2.5 bg-red-50 rounded-xl border border-red-100 text-xs text-red-600">
                    <span className="font-medium">拒绝原因：</span>{booking.reviewNote}
                  </div>
                )}
                {booking.status === "approved" && booking.reviewNote && (
                  <div className="mt-1 p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-700">
                    <span className="font-medium">审核备注：</span>{booking.reviewNote}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-border/30 bg-muted/10">
                <span className="text-[10px] text-muted-foreground">提交时间 {booking.submitTime}</span>
                <div className="flex items-center gap-2">
                  {booking.status === "pending" && (
                    <button
                      onClick={() => setCancelTarget(booking.id)}
                      className="px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium border border-red-100"
                    >
                      取消申请
                    </button>
                  )}
                  {booking.status === "rejected" && (
                    <button className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                      重新申请
                    </button>
                  )}
                  <button className="flex items-center gap-0.5 text-xs text-muted-foreground">
                    详情
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelTarget && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="bg-card rounded-3xl p-6 w-full shadow-2xl">
            <h3 className="text-base font-bold text-foreground text-center mb-2">确认取消预约？</h3>
            <p className="text-xs text-muted-foreground text-center mb-5">取消后无法恢复，如需使用请重新申请</p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelTarget(null)}
                className="flex-1 py-3 rounded-2xl bg-muted text-foreground text-sm font-semibold"
              >
                我再想想
              </button>
              <button
                onClick={() => setCancelTarget(null)}
                className="flex-1 py-3 rounded-2xl bg-red-500 text-white text-sm font-semibold"
              >
                确认取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
