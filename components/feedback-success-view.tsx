"use client"

import {
  ChevronLeft,
  CheckCircle,
  Clock,
  Building2,
  FileText,
  Bell,
  Home,
  MessageSquare,
  Copy,
} from "lucide-react"

export function FeedbackSuccessView() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-50/50 to-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-orange-500">
        <button className="p-1 rounded-full hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">提交成功</h1>
        <div className="w-8" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Success animation */}
        <div className="flex flex-col items-center pt-10 pb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 animate-pulse" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-primary animate-pulse delay-100" />
          </div>
          <h2 className="text-xl font-bold text-foreground mt-4">留言提交成功！</h2>
          <p className="text-sm text-muted-foreground mt-1">我们将尽快处理您的反馈</p>
        </div>

        {/* Order info card */}
        <div className="px-4">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground">工单信息</span>
              </div>
              <button className="flex items-center gap-1 text-xs text-primary">
                <Copy className="w-3 h-3" />
                复制工单号
              </button>
            </div>

            <div className="space-y-3 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">工单编号</span>
                <span className="text-sm font-semibold text-primary">LY202501100002</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">问题分类</span>
                <span className="text-sm text-foreground">公共设施</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">问题标题</span>
                <span className="text-sm text-foreground">小区路灯损坏需维修</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">提交时间</span>
                <span className="text-sm text-foreground">2025-01-10 14:30</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">当前状态</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-600">
                  待受理
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Process timeline */}
        <div className="px-4 pt-4">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              办理流程
            </h3>

            <div className="flex items-center justify-between">
              {[
                { step: 1, label: "已提交", active: true },
                { step: 2, label: "受理中", active: false },
                { step: 3, label: "处理中", active: false },
                { step: 4, label: "已回复", active: false },
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        item.active
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {item.step}
                    </div>
                    <span
                      className={`text-[10px] mt-1 ${
                        item.active ? "text-primary font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`w-8 h-0.5 mx-1 ${item.active ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="px-4 pt-4">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200/50">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              温馨提示
            </h3>
            <ul className="space-y-2">
              {[
                "您的留言将在1-3个工作日内受理",
                "受理后将分派至相关部门进行处理",
                "处理进度和结果将通过短信通知您",
                "您可随时在「我的留言」中查看进度",
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Department info */}
        <div className="px-4 pt-4">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-orange-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">金岭社区服务中心</h4>
                <p className="text-xs text-muted-foreground mt-0.5">咨询电话：0755-12345678</p>
                <p className="text-xs text-muted-foreground">工作时间：周一至周五 9:00-18:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <div className="flex gap-3">
          <button className="flex-1 py-3 border border-border text-foreground text-sm font-semibold rounded-xl hover:bg-muted transition-colors flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            返回首页
          </button>
          <button className="flex-1 py-3 bg-gradient-to-r from-primary to-orange-500 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" />
            查看留言
          </button>
        </div>
      </div>
    </div>
  )
}
