"use client"

import { ChevronLeft, ChevronRight, Clock, CheckCircle, XCircle, Calendar, Briefcase, Filter } from "lucide-react"

const applications = [
  {
    id: 1,
    position: "社区专职工作者",
    location: "金岭社区社区服务站",
    applyDate: "2025-01-10",
    status: "pending",
    statusText: "审核中",
    salary: "4000-5500",
  },
  {
    id: 2,
    position: "网格员",
    location: "金岭社区社区服务站",
    applyDate: "2025-01-05",
    status: "interview",
    statusText: "待面试",
    interviewDate: "2025-01-15 14:00",
    salary: "3500-4500",
  },
  {
    id: 3,
    position: "社区志愿者协调员",
    location: "金岭社区志愿服务站",
    applyDate: "2024-12-20",
    status: "rejected",
    statusText: "未通过",
    reason: "不符合学历要求",
    salary: "3500-4500",
  },
  {
    id: 4,
    position: "党群服务中心前台",
    location: "金岭社区党群服务中心",
    applyDate: "2024-12-15",
    status: "hired",
    statusText: "已录用",
    salary: "3000-4000",
  },
]

const filterTabs = ["全部", "审核中", "待面试", "已录用", "未通过"]

const statusConfig: Record<string, { bg: string; text: string; icon: typeof Clock }> = {
  pending: { bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
  interview: { bg: "bg-orange-100", text: "text-orange-700", icon: Calendar },
  rejected: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
  hired: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle },
}

export function JobMyApplicationsView() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-50/50 to-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button className="p-1 rounded-full hover:bg-muted transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">我的申请</h1>
        <div className="w-8" />
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-card rounded-xl p-3 text-center shadow-sm border border-border/50">
            <span className="text-lg font-bold text-foreground">4</span>
            <p className="text-[10px] text-muted-foreground">总申请</p>
          </div>
          <div className="bg-card rounded-xl p-3 text-center shadow-sm border border-border/50">
            <span className="text-lg font-bold text-amber-600">1</span>
            <p className="text-[10px] text-muted-foreground">审核中</p>
          </div>
          <div className="bg-card rounded-xl p-3 text-center shadow-sm border border-border/50">
            <span className="text-lg font-bold text-orange-600">1</span>
            <p className="text-[10px] text-muted-foreground">待面试</p>
          </div>
          <div className="bg-card rounded-xl p-3 text-center shadow-sm border border-border/50">
            <span className="text-lg font-bold text-emerald-600">1</span>
            <p className="text-[10px] text-muted-foreground">已录用</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {filterTabs.map((tab, index) => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                index === 0
                  ? "bg-primary text-white"
                  : "bg-card text-muted-foreground border border-border hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {applications.map((app) => {
          const config = statusConfig[app.status]
          const StatusIcon = config.icon
          
          return (
            <div
              key={app.id}
              className="bg-card rounded-2xl p-4 shadow-sm border border-border/50"
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{app.position}</h3>
                    <p className="text-xs text-muted-foreground">{app.location}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 ${config.bg} ${config.text}`}>
                  <StatusIcon className="w-3 h-3" />
                  {app.statusText}
                </span>
              </div>

              {/* Salary */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/50">
                <span className="text-xs text-muted-foreground">薪资待遇</span>
                <span className="text-sm font-semibold text-primary">{app.salary}元/月</span>
              </div>

              {/* Status-specific info */}
              {app.status === "interview" && (
                <div className="flex items-center gap-2 mb-3 p-2 bg-orange-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span className="text-xs text-orange-700">
                    面试时间: <strong>{app.interviewDate}</strong>
                  </span>
                </div>
              )}
              {app.status === "rejected" && (
                <div className="flex items-center gap-2 mb-3 p-2 bg-red-50 rounded-lg">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-red-700">
                    原因: {app.reason}
                  </span>
                </div>
              )}
              {app.status === "hired" && (
                <div className="flex items-center gap-2 mb-3 p-2 bg-emerald-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-emerald-700">
                    恭喜您已被录用！请查看入职须知
                  </span>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  申请时间: {app.applyDate}
                </span>
                <button className="flex items-center gap-1 text-xs text-primary font-medium hover:text-primary/80 transition-colors">
                  查看详情
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
