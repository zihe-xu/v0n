"use client"

import { CheckCircle, Calendar, Clock, MapPin, QrCode, Bell, Home, ClipboardList, Share2 } from "lucide-react"

export function VenueBookingSuccessView() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-primary/5 to-background">
      {/* Success Icon */}
      <div className="flex flex-col items-center pt-12 pb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-md">
            <Calendar className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-foreground mt-4">预约成功</h1>
        <p className="text-sm text-muted-foreground mt-1">您的场地预约已确认</p>
      </div>

      {/* Booking Details Card */}
      <div className="flex-1 px-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
          {/* Venue Info Header */}
          <div className="px-4 py-4 bg-gradient-to-r from-primary/10 to-amber-500/10 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-foreground">舞蹈室</h2>
                <p className="text-xs text-muted-foreground mt-0.5">金岭社区长者服务站 2楼</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-600 border border-emerald-500/20">
                已确认
              </span>
            </div>
          </div>

          {/* Booking Info */}
          <div className="p-4 space-y-4">
            {/* Date & Time */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Calendar className="w-4.5 h-4.5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">预约日期</p>
                <p className="text-sm font-medium text-foreground">2024年3月8日 (周六)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <Clock className="w-4.5 h-4.5 text-amber-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">预约时段</p>
                <p className="text-sm font-medium text-foreground">16:00-17:00 (1小时)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4.5 h-4.5 text-sky-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">场地位置</p>
                <p className="text-sm font-medium text-foreground">金洲路16号 长者服务站2楼</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="pt-3 border-t border-dashed border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">预约编号</p>
                  <p className="text-sm font-bold text-primary font-mono">VN20240308001</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-muted/50 border border-border flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-muted-foreground" />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">到场扫码签到或出示预约码</p>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200/50">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">温馨提示</span>
          </div>
          <ul className="space-y-1.5 text-xs text-amber-700/90">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span>请提前10分钟到场，在前台扫码签到</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span>超时15分钟未签到将自动取消预约</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span>如需取消请提前2小时在「我的预约」中操作</span>
            </li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 grid grid-cols-3 gap-3 pb-4">
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border/50">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">我的预约</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border/50">
            <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-sky-500" />
            </div>
            <span className="text-xs text-muted-foreground">分享好友</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border/50">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-xs text-muted-foreground">添加日历</span>
          </button>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-4 py-3 bg-card border-t border-border">
        <button className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md flex items-center justify-center gap-2">
          <Home className="w-4 h-4" />
          返回首页
        </button>
      </div>
    </div>
  )
}
