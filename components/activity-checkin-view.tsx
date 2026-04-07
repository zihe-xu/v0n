"use client"

import { useState } from "react"
import { ChevronLeft, MapPin, CheckCircle, Gift, Calendar, Navigation, RefreshCw, AlertCircle } from "lucide-react"

interface ActivityCheckinViewProps {
  onBack?: () => void
  onSuccess?: () => void
}

type LocationState = "idle" | "locating" | "in-range" | "out-range"

export function ActivityCheckinView({ onBack, onSuccess }: ActivityCheckinViewProps) {
  const [locationState, setLocationState] = useState<LocationState>("idle")
  const [distance, setDistance] = useState<number | null>(null)
  const [success, setSuccess] = useState(false)

  const handleLocate = () => {
    setLocationState("locating")
    // Simulate geolocation check
    setTimeout(() => {
      // Demo: simulate being within range
      const simulatedDistance = 186
      setDistance(simulatedDistance)
      setLocationState(simulatedDistance <= 300 ? "in-range" : "out-range")
    }, 1800)
  }

  const handleCheckin = () => {
    setSuccess(true)
    onSuccess?.()
  }

  if (success) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-emerald-50 to-background">
        <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
          <div className="w-8" />
          <h1 className="text-base font-semibold text-foreground">打卡成功</h1>
          <div className="w-8" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
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

          <h2 className="text-2xl font-bold text-foreground mb-2">签到成功！</h2>
          <p className="text-sm text-muted-foreground mb-6">您已成功完成活动现场签到</p>

          <div className="w-full bg-gradient-to-r from-primary to-orange-400 rounded-2xl p-4 text-primary-foreground mb-6 shadow-lg shadow-primary/20">
            <p className="text-xs font-medium text-primary-foreground/80 mb-1">本次签到获得</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">+50</span>
              <span className="text-base font-medium">社区积分</span>
            </div>
            <p className="text-[11px] text-primary-foreground/70 mt-1">积分可用于兑换社区服务与礼品</p>
          </div>

          <div className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border/50 text-left">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full" />
              签到记录
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
                  <MapPin className="w-3.5 h-3.5" />签到地点
                </span>
                <span className="text-foreground">西丽街道366志愿者岗亭</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">签到时间</span>
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
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">西丽街道366志愿者岗亭</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-emerald-600 font-medium">活动进行中，打卡截止 18:00</span>
          </div>
        </div>

        {/* Location check area */}
        <div className="mx-4 mt-4">
          {/* Map placeholder with distance ring */}
          <div className="relative rounded-2xl overflow-hidden bg-emerald-50 border border-emerald-100" style={{ height: 200 }}>
            {/* Simulated map background */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-10">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-emerald-400" />
              ))}
            </div>
            {/* Range circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-primary/40 bg-primary/5 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <span className="absolute -bottom-6 text-[10px] text-primary font-medium">有效范围 300米</span>
              </div>
            </div>
            {/* User dot — shown when in range */}
            {locationState === "in-range" && (
              <div className="absolute" style={{ left: "62%", top: "45%" }}>
                <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
              </div>
            )}
            {locationState === "out-range" && (
              <div className="absolute" style={{ left: "82%", top: "20%" }}>
                <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-md" />
              </div>
            )}
          </div>

          {/* Location status card */}
          <div className="mt-4 bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
            {locationState === "idle" && (
              <div className="text-center py-2">
                <Navigation className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">需要获取您的位置</p>
                <p className="text-xs text-muted-foreground mb-4">
                  请确保您已到达活动现场附近，系统将验证您与活动地点的距离（300米以内可签到）
                </p>
                <button
                  onClick={handleLocate}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-sm shadow-primary/30 hover:bg-primary/90 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  获取当前位置
                </button>
              </div>
            )}

            {locationState === "locating" && (
              <div className="text-center py-4">
                <div className="relative w-14 h-14 mx-auto mb-3">
                  <RefreshCw className="w-14 h-14 text-primary/20 absolute inset-0" />
                  <RefreshCw className="w-14 h-14 text-primary absolute inset-0 animate-spin [animation-duration:1.2s]" style={{ clipPath: "inset(0 0 50% 0)" }} />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">正在定位中...</p>
                <p className="text-xs text-muted-foreground">请稍候，正在获取您的位置信息</p>
              </div>
            )}

            {locationState === "in-range" && distance !== null && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">位置验证通过</p>
                    <p className="text-xs text-muted-foreground">
                      您距活动地点约 <span className="text-emerald-600 font-semibold">{distance}米</span>，在有效签到范围内
                    </p>
                  </div>
                </div>
                {/* Distance bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                    <span>当前位置</span>
                    <span>300米边界</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                      style={{ width: `${(distance / 300) * 100}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={handleCheckin}
                  className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground text-base font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-[0.98] transition-all"
                >
                  立即签到
                </button>
              </div>
            )}

            {locationState === "out-range" && distance !== null && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">距离活动地点较远</p>
                    <p className="text-xs text-muted-foreground">
                      您距活动地点约 <span className="text-red-500 font-semibold">{distance}米</span>，超出300米有效范围
                    </p>
                  </div>
                </div>
                {/* Distance bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                    <span>当前位置</span>
                    <span>300米边界</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-red-400 transition-all duration-700"
                      style={{ width: `${Math.min((distance / 600) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center mb-3">
                  请前往活动现场后重新尝试签到
                </p>
                <button
                  onClick={handleLocate}
                  className="w-full py-3 rounded-xl bg-muted text-foreground text-sm font-semibold border border-border hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  重新定位
                </button>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                本签到基于手机GPS定位，请确保已开启位置权限。室内或信号较弱时定位可能存在偏差，如遇问题请联系现场工作人员。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
