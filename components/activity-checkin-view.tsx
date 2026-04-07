"use client"

import { useState } from "react"
import { ChevronLeft, QrCode, MapPin, Keyboard, CheckCircle, Camera, Scan, Calendar, Gift } from "lucide-react"

interface ActivityCheckinViewProps {
  onBack?: () => void
  onSuccess?: () => void
}

export function ActivityCheckinView({ onBack, onSuccess }: ActivityCheckinViewProps) {
  const [mode, setMode] = useState<"scan" | "code">("scan")
  const [manualCode, setManualCode] = useState("")
  const [success, setSuccess] = useState(false)

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      setSuccess(true)
    }
  }

  const handleScanSuccess = () => {
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-emerald-50 to-background">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
          <div className="w-8" />
          <h1 className="text-base font-semibold text-foreground">打卡成功</h1>
          <div className="w-8" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          {/* Success animation ring */}
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full bg-emerald-100 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-emerald-200 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-emerald-500" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
              <Gift className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">打卡成功！</h2>
          <p className="text-sm text-muted-foreground mb-6">您已成功完成活动现场签到</p>

          {/* Reward card */}
          <div className="w-full bg-gradient-to-r from-primary to-orange-400 rounded-2xl p-4 text-primary-foreground mb-6 shadow-lg shadow-primary/20">
            <p className="text-xs font-medium text-primary-foreground/80 mb-1">本次签到获得</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">+50</span>
              <span className="text-base font-medium">社区积分</span>
            </div>
            <p className="text-[11px] text-primary-foreground/70 mt-1">积分可用于兑换社区服务与礼品</p>
          </div>

          {/* Info card */}
          <div className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border/50 text-left">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full" />
              打卡记录
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />活动名称
                </span>
                <span className="text-foreground font-medium text-right max-w-[180px] line-clamp-1">
                  学雷锋·文明实践我行动
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />打卡地点
                </span>
                <span className="text-foreground">西丽街道366志愿者岗亭</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">打卡时间</span>
                <span className="text-foreground">2024-10-10 12:05</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">签到状态</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />已签到
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-6 pt-3 bg-card border-t border-border">
          <button
            onClick={onBack}
            className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground text-base font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-[0.98] transition-all"
          >
            完成
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-muted transition-colors" aria-label="返回">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">活动打卡</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Activity info */}
        <div className="mx-4 mt-4 bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold text-foreground leading-snug line-clamp-2 mb-1">
                学雷锋·文明实践我行动 志愿服务主题活动
              </h2>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="truncate">西丽街道366志愿者岗亭</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-600 font-medium">活动进行中，打卡截止 18:00</span>
          </div>
        </div>

        {/* Mode toggle */}
        <div className="mx-4 mt-4 flex rounded-2xl bg-muted p-1">
          <button
            onClick={() => setMode("scan")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === "scan" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            <Scan className="w-4 h-4" />
            扫码签到
          </button>
          <button
            onClick={() => setMode("code")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === "code" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            <Keyboard className="w-4 h-4" />
            输入验证码
          </button>
        </div>

        {mode === "scan" ? (
          <div className="mx-4 mt-4">
            {/* QR Scanner simulation */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Scan className="w-16 h-16 text-white/30 mx-auto mb-3" />
                  <p className="text-white/50 text-sm">将活动签到码对准框内</p>
                </div>
              </div>
              {/* Scanner corners */}
              {[
                "top-4 left-4 border-l-4 border-t-4",
                "top-4 right-4 border-r-4 border-t-4",
                "bottom-4 left-4 border-l-4 border-b-4",
                "bottom-4 right-4 border-r-4 border-b-4",
              ].map((cls, i) => (
                <div key={i} className={`absolute w-8 h-8 rounded-sm border-primary ${cls}`} />
              ))}
              {/* Scan line */}
              <div className="absolute left-6 right-6 top-1/2 h-0.5 bg-primary/70 shadow-[0_0_8px_2px_rgba(255,120,0,0.6)]" />
            </div>

            <p className="text-center text-xs text-muted-foreground mt-3 mb-4">
              请扫描工作人员出示的活动签到二维码
            </p>

            {/* Simulate scan button for demo */}
            <button
              onClick={handleScanSuccess}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground text-base font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              模拟扫码签到
            </button>
          </div>
        ) : (
          <div className="mx-4 mt-4">
            <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-sm">
              <h3 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full" />
                输入签到验证码
              </h3>
              <p className="text-xs text-muted-foreground mb-4">
                请向现场工作人员索取6位签到验证码
              </p>
              {/* OTP-style input */}
              <div className="flex gap-2 mb-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 aspect-square rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-colors ${
                      manualCode[i]
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-muted/50 text-transparent"
                    }`}
                  >
                    {manualCode[i] || ""}
                  </div>
                ))}
              </div>
              <input
                type="text"
                maxLength={6}
                value={manualCode}
                onChange={e => setManualCode(e.target.value.replace(/\D/g, ""))}
                placeholder="请输入6位数字验证码"
                className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-center tracking-widest font-mono mb-4"
              />
              <button
                onClick={handleManualSubmit}
                disabled={manualCode.length !== 6}
                className={`w-full py-3.5 rounded-2xl text-base font-bold shadow-lg transition-all ${
                  manualCode.length === 6
                    ? "bg-primary text-primary-foreground shadow-primary/30 active:scale-[0.98]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                确认签到
              </button>
            </div>

            <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex items-start gap-2">
                <QrCode className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  如无法扫码，请向现场工作人员说明情况，获取6位数字验证码进行手动签到
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
