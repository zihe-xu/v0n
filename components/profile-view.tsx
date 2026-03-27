"use client"

import {
  ChevronRight,
  User,
  CalendarCheck,
  Building2,
  PartyPopper,
  Briefcase,
  Store,
  Share2,
  MessageSquare,
  UserCog,
  BadgeCheck,
  MapPin,
  Link2,
  Info,
  LogOut,
  Bell,
  Settings,
  Heart,
  Clock,
  UtensilsCrossed,
  Baby,
  BookOpen,
  Shield,
  HelpCircle,
  Star,
} from "lucide-react"

interface ProfileViewProps {
  onNavigate?: (page: string) => void
}

export function ProfileView({ onNavigate }: ProfileViewProps) {
  // My services - first row (from prototype)
  const myServicesRow1 = [
    { icon: CalendarCheck, label: "我的打卡", color: "text-primary", bg: "bg-primary/10", page: "services" },
    { icon: Building2, label: "场馆预约", color: "text-blue-500", bg: "bg-blue-50", page: "services" },
    { icon: PartyPopper, label: "活动报名", color: "text-amber-500", bg: "bg-amber-50", page: "activity" },
    { icon: Briefcase, label: "企业孵化", color: "text-emerald-500", bg: "bg-emerald-50", page: "services" },
  ]

  // My services - second row (from prototype)
  const myServicesRow2 = [
    { icon: Briefcase, label: "招工报名", color: "text-rose-500", bg: "bg-rose-50", page: "job-applications" },
    { icon: Store, label: "摊主报名", color: "text-purple-500", bg: "bg-purple-50", page: "market-booths" },
    { icon: Share2, label: "我的分享", color: "text-cyan-500", bg: "bg-cyan-50", page: "services" },
    { icon: MessageSquare, label: "我的诉求", color: "text-orange-500", bg: "bg-orange-50", page: "feedback" },
  ]

  // Additional services based on homepage features
  const myServicesRow3 = [
    { icon: UtensilsCrossed, label: "食堂订单", color: "text-orange-500", bg: "bg-orange-50", page: "canteen" },
    { icon: Baby, label: "托育预约", color: "text-yellow-600", bg: "bg-yellow-50", page: "childcare" },
    { icon: BookOpen, label: "图书借阅", color: "text-indigo-500", bg: "bg-indigo-50", page: "services" },
    { icon: Heart, label: "我的收藏", color: "text-pink-500", bg: "bg-pink-50", page: "services" },
  ]

  // Account settings (from prototype)
  const accountSettings = [
    { icon: UserCog, label: "修改个人信息", color: "text-primary", bg: "bg-primary/10" },
    { icon: BadgeCheck, label: "实名登记", color: "text-emerald-500", bg: "bg-emerald-50" },
    { icon: MapPin, label: "通讯地址", color: "text-blue-500", bg: "bg-blue-50" },
  ]

  // Bottom list items (from prototype + additions)
  const menuItems = [
    { icon: Bell, label: "消息通知", badge: 3 },
    { icon: Link2, label: "第三方绑定" },
    { icon: Shield, label: "隐私设置" },
    { icon: HelpCircle, label: "帮助中心" },
    { icon: Star, label: "给我们评分" },
    { icon: Info, label: "关于罗湖" },
  ]

  return (
    <div className="flex flex-col min-h-full bg-background overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-br from-primary via-primary to-orange-400 px-4 pt-3 pb-16 relative">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-primary-foreground">我的</h1>
          <div className="flex items-center gap-3">
            <button className="relative">
              <Bell className="w-5 h-5 text-primary-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">3</span>
            </button>
            <button>
              <Settings className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-16 right-8 w-16 h-16 rounded-full bg-white/5" />
      </div>

      {/* User Info Card */}
      <div className="mx-3 -mt-12 relative z-10 bg-card rounded-2xl shadow-lg border border-border/50 p-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-orange-100 flex items-center justify-center ring-4 ring-white shadow-md">
            <User className="w-8 h-8 text-primary" />
          </div>
          {/* Info */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">张三</h2>
            <p className="text-sm text-muted-foreground">184****5903</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">已实名</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-600">金岭社区居民</span>
            </div>
          </div>
          {/* Arrow */}
          <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-border/50">
          {[
            { value: "12", label: "活动参与" },
            { value: "5", label: "预约记录" },
            { value: "3", label: "留言反馈" },
            { value: "8", label: "积分" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold text-primary">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Services Section */}
      <div className="mx-3 mt-4 bg-card rounded-2xl shadow-sm border border-border/50 p-4">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          我的服务
        </h3>
        
        {/* Row 1 */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          {myServicesRow1.map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1.5"
              onClick={() => onNavigate?.(item.page)}
            >
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="text-[11px] text-foreground">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          {myServicesRow2.map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1.5"
              onClick={() => onNavigate?.(item.page)}
            >
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="text-[11px] text-foreground">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Row 3 - Additional */}
        <div className="grid grid-cols-4 gap-3">
          {myServicesRow3.map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1.5"
              onClick={() => onNavigate?.(item.page)}
            >
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="text-[11px] text-foreground">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="mx-3 mt-4 bg-card rounded-2xl shadow-sm border border-border/50 p-4">
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <UserCog className="w-4 h-4 text-primary" />
          账号设置
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {accountSettings.map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1.5"
            >
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <span className="text-[11px] text-foreground">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu List */}
      <div className="mx-3 mt-4 bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3.5 ${
              index !== menuItems.length - 1 ? "border-b border-border/50" : ""
            }`}
          >
            <item.icon className="w-5 h-5 text-muted-foreground" />
            <span className="flex-1 text-sm text-foreground text-left">{item.label}</span>
            {item.badge && (
              <span className="w-5 h-5 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-medium">
                {item.badge}
              </span>
            )}
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="mx-3 mt-4 mb-6">
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 bg-red-50 text-red-500">
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">退出登录</span>
        </button>
      </div>

      {/* Bottom spacing for navigation */}
      <div className="h-16" />
    </div>
  )
}
