"use client"

import { ChevronLeft, CheckCircle, Clock, Phone, FileText, Share2, Home, ClipboardList } from "lucide-react"

export function JobSuccessView() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-emerald-50/80 to-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button className="p-1 rounded-full hover:bg-muted transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">申请结果</h1>
        <div className="w-8" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Success icon and message */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">申请已提交</h2>
          <p className="text-sm text-muted-foreground">您的报名申请已成功提交，请耐心等待审核结果</p>
        </div>

        {/* Application info card */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full" />
              申请信息
            </h3>
            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-semibold rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              审核中
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">申请编号</span>
              <span className="font-mono text-foreground font-medium">JL2025011000123</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">申请岗位</span>
              <span className="text-primary font-medium">社区专职工作者</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">申请人</span>
              <span className="text-foreground font-medium">张建国</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">提交时间</span>
              <span className="text-foreground">2025-01-10 14:30</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">预计审核</span>
              <span className="text-foreground">3-5个工作日</span>
            </div>
          </div>
        </div>

        {/* Process timeline */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 mb-4">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full" />
            审核流程
          </h3>

          <div className="relative pl-6">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-500 via-amber-400 to-border" />

            <div className="space-y-4">
              {/* Step 1 - Completed */}
              <div className="relative flex items-start gap-3">
                <div className="absolute left-[-20px] w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">提交申请</p>
                  <p className="text-xs text-muted-foreground">2025-01-10 14:30</p>
                </div>
              </div>

              {/* Step 2 - In progress */}
              <div className="relative flex items-start gap-3">
                <div className="absolute left-[-20px] w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-sm animate-pulse" />
                <div>
                  <p className="text-sm font-medium text-foreground">资料审核</p>
                  <p className="text-xs text-muted-foreground">预计1-2个工作日</p>
                </div>
              </div>

              {/* Step 3 - Pending */}
              <div className="relative flex items-start gap-3">
                <div className="absolute left-[-20px] w-4 h-4 rounded-full bg-border border-2 border-white shadow-sm" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">面试通知</p>
                  <p className="text-xs text-muted-foreground">审核通过后短信通知</p>
                </div>
              </div>

              {/* Step 4 - Pending */}
              <div className="relative flex items-start gap-3">
                <div className="absolute left-[-20px] w-4 h-4 rounded-full bg-border border-2 border-white shadow-sm" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">录用结果</p>
                  <p className="text-xs text-muted-foreground">面试后3个工作日内通知</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips card */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
          <h3 className="text-sm font-bold text-amber-700 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            温馨提示
          </h3>
          <ul className="text-xs text-amber-600/80 space-y-1.5">
            <li className="flex items-start gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary mt-1.5" />
              请保持手机畅通，以便接收审核结果通知
            </li>
            <li className="flex items-start gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary mt-1.5" />
              如有疑问，请致电：0755-25666751
            </li>
            <li className="flex items-start gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary mt-1.5" />
              您可以在"我的申请"中查看申请进度
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-muted text-foreground text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-muted/80 transition-colors">
            <Home className="w-4 h-4" />
            返回首页
          </button>
          <button className="flex-1 py-3 bg-gradient-to-r from-primary to-orange-500 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow">
            <ClipboardList className="w-4 h-4" />
            我的申请
          </button>
        </div>
      </div>
    </div>
  )
}
