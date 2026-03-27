"use client"

import { ChevronLeft, ChevronRight, Clock, CheckCircle, MessageSquare, Plus, Filter, AlertCircle, RotateCcw } from "lucide-react"

const feedbacks = [
  {
    id: 1,
    title: "小区路灯损坏需维修",
    category: "公共设施",
    content: "金岭花园A区3栋楼下路灯已损坏一周，夜间出行不便，存在安全隐患，请尽快维修。",
    submitDate: "2025-01-10",
    status: "processing",
    statusText: "处理中",
    department: "物业管理处",
  },
  {
    id: 2,
    title: "垃圾分类桶配置不足",
    category: "环境卫生",
    content: "小区内垃圾分类桶数量不够，尤其是厨余垃圾桶经常满溢，希望增加配置。",
    submitDate: "2025-01-08",
    status: "replied",
    statusText: "已回复",
    department: "城管执法队",
    replyDate: "2025-01-09",
  },
  {
    id: 3,
    title: "申请老年人助餐补贴",
    category: "民生服务",
    content: "我父亲今年68岁，行动不便，想申请社区长者食堂的助餐补贴，请问如何办理？",
    submitDate: "2025-01-05",
    status: "completed",
    statusText: "已办结",
    department: "民政服务窗口",
    replyDate: "2025-01-06",
  },
  {
    id: 4,
    title: "噪音扰民投诉",
    category: "邻里纠纷",
    content: "楼上住户经常深夜装修，严重影响休息，多次沟通无果，请社区协调处理。",
    submitDate: "2025-01-03",
    status: "pending",
    statusText: "待受理",
    department: "社区调解中心",
  },
]

const filterTabs = ["全部", "待受理", "处理中", "已回复", "已办结"]

const statusConfig: Record<string, { bg: string; text: string; icon: typeof Clock; border: string }> = {
  pending: { bg: "bg-gray-100", text: "text-gray-600", icon: Clock, border: "border-l-gray-400" },
  processing: { bg: "bg-amber-100", text: "text-amber-700", icon: RotateCcw, border: "border-l-amber-500" },
  replied: { bg: "bg-blue-100", text: "text-blue-700", icon: MessageSquare, border: "border-l-blue-500" },
  completed: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle, border: "border-l-emerald-500" },
}

const categoryColors: Record<string, string> = {
  "公共设施": "bg-orange-100 text-orange-700",
  "环境卫生": "bg-green-100 text-green-700",
  "民生服务": "bg-blue-100 text-blue-700",
  "邻里纠纷": "bg-purple-100 text-purple-700",
}

export function FeedbackListView() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-50/50 to-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-orange-500">
        <button className="p-1 rounded-full hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">我的留言</h1>
        <button className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
          <Filter className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Stats banner */}
      <div className="px-4 py-4">
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <span className="text-xl font-bold text-foreground">4</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">总留言</p>
            </div>
            <div>
              <span className="text-xl font-bold text-amber-600">1</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">处理中</p>
            </div>
            <div>
              <span className="text-xl font-bold text-blue-600">1</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">已回复</p>
            </div>
            <div>
              <span className="text-xl font-bold text-emerald-600">1</span>
              <p className="text-[10px] text-muted-foreground mt-0.5">已办结</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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

      {/* Feedback List */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {feedbacks.map((feedback) => {
          const config = statusConfig[feedback.status]
          const StatusIcon = config.icon
          
          return (
            <div
              key={feedback.id}
              className={`bg-card rounded-2xl p-4 shadow-sm border border-border/50 border-l-4 ${config.border}`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${categoryColors[feedback.category]}`}>
                      {feedback.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${config.bg} ${config.text}`}>
                      <StatusIcon className="w-3 h-3" />
                      {feedback.statusText}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{feedback.title}</h3>
                </div>
              </div>

              {/* Content preview */}
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {feedback.content}
              </p>

              {/* Department */}
              <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-border/50">
                <AlertCircle className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  承办部门：<span className="text-foreground font-medium">{feedback.department}</span>
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground">
                    提交时间：{feedback.submitDate}
                  </span>
                  {feedback.replyDate && (
                    <span className="text-[10px] text-primary">
                      回复时间：{feedback.replyDate}
                    </span>
                  )}
                </div>
                <button className="flex items-center gap-1 text-xs text-primary font-medium hover:text-primary/80 transition-colors">
                  查看详情
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Floating action button */}
      <div className="absolute bottom-6 right-4">
        <button className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-orange-500 text-white shadow-lg shadow-primary/30 flex items-center justify-center hover:shadow-xl transition-shadow">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
