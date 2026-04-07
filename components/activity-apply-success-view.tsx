"use client"

import { CheckCircle, Calendar, MapPin, Clock, QrCode, Home, ClipboardList, Share2 } from "lucide-react"

interface ActivityApplySuccessViewProps {
  onBack?: () => void
  onMyRegistrations?: () => void
}

export function ActivityApplySuccessView({ onBack, onMyRegistrations }: ActivityApplySuccessViewProps) {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-emerald-50/80 to-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="w-8" />
        <h1 className="text-base font-semibold text-foreground">报名结果</h1>
        <button className="p-1 rounded-full hover:bg-muted transition-colors" aria-label="分享">
          <Share2 className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Success icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1">报名成功！</h2>
          <p className="text-sm text-muted-foreground">您已成功报名，期待您的参与</p>
        </div>

        {/* Order card */}
        <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden mb-4">
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <span className="w-1 h-4 bg-emerald-500 rounded-full" />
                报名信息
              </h3>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-semibold rounded-full">
                已确认
              </span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">报名编号</span>
                <span className="font-mono text-foreground font-medium text-xs">HY2024101000078</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground flex-shrink-0">活动名称</span>
                <span className="text-foreground font-medium text-right text-xs ml-3 line-clamp-2">
                  学雷锋·文明实践我行动 志愿服务主题活动
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />活动时间
                </span>
                <span className="text-foreground text-xs">2024-10-10 12:00</span>
              </div>
              <div className="flex items-start justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground flex items-center gap-1 flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5" />活动地点
                </span>
                <span className="text-foreground text-xs text-right ml-3">西丽街道366志愿者岗亭</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-muted-foreground">报名人</span>
                <span className="text-foreground font-medium">张建国</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">报名人数</span>
                <span className="text-primary font-bold">1 人</span>
              </div>
            </div>
          </div>

          {/* QR Code area */}
          <div className="mx-4 mb-4 p-4 bg-muted/40 rounded-xl border border-border/50 flex items-center gap-4">
            <div className="w-16 h-16 bg-card rounded-xl border-2 border-dashed border-border flex items-center justify-center flex-shrink-0">
              <QrCode className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground mb-1">现场签到凭证</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                活动当天请出示此二维码配合工作人员签到，也可通过"活动打卡"完成签到
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 mb-4">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full" />
            参与流程
          </h3>
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-500 via-amber-400 to-border" />
            <div className="space-y-4">
              {[
                { label: "报名成功", desc: "2024-10-10 已提交报名", done: true },
                { label: "活动提醒", desc: "活动前一天短信/系统通知", done: false, active: true },
                { label: "现场签到", desc: "持报名凭证到场签到或打卡", done: false },
                { label: "活动参与", desc: "跟随工作人员完成活动", done: false },
                { label: "获得积分", desc: "完成后自动发放社区积分", done: false },
              ].map((step, i) => (
                <div key={i} className="relative flex items-start gap-3">
                  <div className={`absolute left-[-20px] w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${
                    step.done ? "bg-emerald-500" : step.active ? "bg-amber-400 animate-pulse" : "bg-border"
                  }`}>
                    {step.done && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${step.done || step.active ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
          <h3 className="text-sm font-bold text-amber-700 mb-2 flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            温馨提示
          </h3>
          <ul className="text-xs text-amber-600/90 space-y-1.5">
            <li className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
              如需取消报名，请在活动开始前24小时内操作
            </li>
            <li className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
              爽约3次将被限制报名资格，请合理安排时间
            </li>
            <li className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 flex-shrink-0" />
              参与活动可获得社区积分，兑换精美礼品
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-4 pb-6 pt-3 bg-card border-t border-border">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-3 bg-muted text-foreground text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-muted/80 transition-colors"
          >
            <Home className="w-4 h-4" />
            返回活动
          </button>
          <button
            onClick={onMyRegistrations}
            className="flex-1 py-3 bg-primary text-primary-foreground text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
          >
            <ClipboardList className="w-4 h-4" />
            我的报名
          </button>
        </div>
      </div>
    </div>
  )
}
