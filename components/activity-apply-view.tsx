"use client"

import { useState } from "react"
import { ChevronLeft, User, Phone, Calendar, MapPin, CheckCircle2 } from "lucide-react"

interface ActivityApplyViewProps {
  onBack?: () => void
  onSuccess?: () => void
}

export function ActivityApplyView({ onBack, onSuccess }: ActivityApplyViewProps) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-muted transition-colors" aria-label="返回">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">活动报名</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto pb-28">
        {/* Activity summary card */}
        <div className="mx-4 mt-4 rounded-2xl bg-gradient-to-r from-primary to-orange-400 p-4 text-primary-foreground shadow-md shadow-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold leading-snug line-clamp-2">
                学雷锋·文明实践我行动 志愿服务主题活动
              </h2>
              <div className="flex items-center gap-1 mt-1.5 text-[11px] text-primary-foreground/80">
                <Calendar className="w-3 h-3" />
                <span>2024-10-10 12:00 ~ 18:00</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-[11px] text-primary-foreground/80">
                <MapPin className="w-3 h-3" />
                <span className="truncate">西丽街道366志愿者岗亭</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-primary-foreground/20 flex items-center justify-between">
            <span className="text-[11px] text-primary-foreground/70">当前已报名</span>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />
              <span className="text-sm font-bold">3 / 10 人</span>
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mt-5 mb-1 px-4">
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">1</span>
            <span className="text-xs font-semibold text-primary">填写信息</span>
          </div>
          <div className="w-8 h-0.5 bg-border rounded-full" />
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-border text-muted-foreground text-xs font-bold flex items-center justify-center">2</span>
            <span className="text-xs text-muted-foreground">确认提交</span>
          </div>
          <div className="w-8 h-0.5 bg-border rounded-full" />
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-border text-muted-foreground text-xs font-bold flex items-center justify-center">3</span>
            <span className="text-xs text-muted-foreground">报名成功</span>
          </div>
        </div>

        {/* Form */}
        <div className="px-4 mt-4 space-y-3">
          {/* Basic info */}
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              报名人信息
            </h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2">
                  <User className="w-4 h-4 text-primary" />
                  姓名
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="请输入真实姓名"
                  defaultValue="张建国"
                  className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2">
                  <Phone className="w-4 h-4 text-primary" />
                  联系电话
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="请输入手机号码"
                  defaultValue="138****8888"
                  className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

            </div>
          </div>

          {/* Notice */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
            <h3 className="text-sm font-bold text-amber-700 mb-2">报名须知</h3>
            <ul className="text-xs text-amber-600/90 space-y-1.5">
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                报名成功后请准时参加，如需取消请提前24小时告知
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                活动当天请携带本人身份证，配合现场签到
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
                如遇名额已满，系统将自动取消报名并通知您
              </li>
            </ul>
          </div>

          {/* Agreement */}
          <button
            onClick={() => setAgreed(!agreed)}
            className="flex items-start gap-2.5 px-1"
          >
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-colors ${agreed ? "bg-primary border-primary" : "border-border"}`}>
              {agreed && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-left">
              我已阅读并同意
              <span className="text-primary">《社区活动报名须知》</span>
              及
              <span className="text-primary">《个人信息保护协议》</span>
            </p>
          </button>
        </div>
      </div>

      {/* Bottom action */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-gradient-to-t from-card via-card to-card/0">
        <button
          onClick={() => agreed && onSuccess?.()}
          className={`w-full py-3.5 rounded-2xl text-base font-bold shadow-lg transition-all ${
            agreed
              ? "bg-primary text-primary-foreground shadow-primary/30 active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          确认报名
        </button>
      </div>
    </div>
  )
}
