"use client"

import Image from "next/image"
import {
  ChevronLeft,
  Clock,
  MapPin,
  User,
  Phone,
  Users,
  Share2,
  CheckCircle2,
} from "lucide-react"

interface ActivityDetailViewProps {
  onBack?: () => void
}

export function ActivityDetailView({ onBack }: ActivityDetailViewProps) {
  return (
    <div className="bg-background min-h-full flex flex-col">
      {/* Hero Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src="/images/volunteer-activity.jpg"
          alt="活动图片"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-foreground/20" />
        {/* Back button */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-3 top-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm text-foreground shadow-md flex items-center justify-center hover:bg-card transition-colors"
            aria-label="返回"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        {/* Status badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500 text-primary-foreground text-xs font-bold shadow-md">
          <CheckCircle2 className="w-3.5 h-3.5" />
          进行中
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 -mt-4 relative z-10">
        {/* Title Card */}
        <div className="mx-3 rounded-2xl bg-card shadow-lg border border-border/50 overflow-hidden">
          <div className="px-4 pt-4 pb-3">
            <h1 className="text-lg font-bold text-foreground leading-snug mb-3">
              学雷锋·文明实践我行动 志愿服务主题活动
            </h1>

            {/* Info rows */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-muted-foreground">活动时间</span>
                  <p className="text-sm font-medium text-foreground leading-snug">
                    2024-10-10 12:00 ~ 2024-10-10 18:00
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-muted-foreground">详细地点</span>
                  <p className="text-sm font-medium text-foreground leading-snug">
                    深圳市南山区西丽街道366志愿者岗亭
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-muted-foreground">联系人</span>
                  <p className="text-sm font-medium text-foreground">张三</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-muted-foreground">联系电话</span>
                  <p className="text-sm font-medium text-foreground">18423235858</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] text-muted-foreground">报名情况</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[30%] rounded-full bg-primary" />
                    </div>
                    <span className="text-sm font-bold text-primary">3</span>
                    <span className="text-xs text-muted-foreground">/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Description */}
        <div className="mx-3 mt-3 rounded-2xl bg-card shadow-sm border border-border/50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border/50">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-primary inline-block" />
              活动详情
            </h2>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm text-foreground/80 leading-relaxed">
              2024年3月5日，是第61个学雷锋纪念日，也是第25个中国青年志愿服务日。为弘扬雷锋精神和志愿服务精神，在水贝社区党委的指导下，水贝社区党群服务中心联合深圳市翠竹外国语实验学校举办了一场"学雷锋·文明实践我行动"主题活动，共有20位青少年志愿者参加。
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed mt-3">
              活动中，志愿者们深入社区，为居民提供便民服务，包括清理环境卫生、探访独居老人、宣传文明生活理念等。通过此次活动，青少年志愿者们不仅践行了雷锋精神，还增强了社会责任感和服务意识。
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-4" />
      </div>

      {/* Bottom Bar */}
      <div className="sticky bottom-0 z-20 px-4 pb-5 pt-3 bg-gradient-to-t from-card via-card to-card/0">
        <div className="flex items-center gap-3">
          <button
            className="flex-1 py-3.5 rounded-2xl bg-primary text-primary-foreground text-base font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-[0.98] transition-all"
          >
            我要报名
          </button>
          <button
            className="w-12 h-12 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="分享"
          >
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
