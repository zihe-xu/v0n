"use client"

import Image from "next/image"
import { ChevronLeft, MapPin, Phone, Clock, Users, Share2, Heart, Building2, CheckCircle2 } from "lucide-react"

export function JobDetailView() {
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button className="p-1 rounded-full hover:bg-muted transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">任务详情</h1>
        <button className="p-1 rounded-full hover:bg-muted transition-colors">
          <Share2 className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Banner */}
        <div className="relative w-full aspect-[2/1] overflow-hidden">
          <Image
            src="/images/job-banner.jpg"
            alt="社区招工"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-semibold rounded-full">
                进行中
              </span>
              <span className="px-2 py-0.5 bg-white/20 backdrop-blur text-white text-[10px] font-medium rounded-full">
                社区专职岗位
              </span>
            </div>
          </div>
        </div>

        {/* Job title card */}
        <div className="px-4 -mt-4 relative z-10">
          <div className="bg-card rounded-2xl p-4 shadow-lg border border-border/50">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-xl font-bold text-foreground">社区招工2名</h2>
              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <Heart className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>报名时间: </span>
                <span className="text-foreground font-medium">2024-10-10 12:00 - 2024-10-10 18:00</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>详细地点: </span>
                <span className="text-foreground font-medium">金岭社区社区服务站</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>联系人: </span>
                <span className="text-foreground font-medium">张三</span>
                <span className="mx-1">|</span>
                <Phone className="w-4 h-4 text-emerald-500" />
                <span className="text-primary font-medium">18423235858</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                <span className="text-muted-foreground">招聘人数</span>
                <span className="text-primary font-bold text-lg">2</span>
                <span className="text-muted-foreground ml-2">岗位</span>
                <span className="text-primary font-semibold">社区专职工作者</span>
              </div>
            </div>

            {/* Salary highlight */}
            <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-xl border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">薪资待遇</span>
                <span className="text-xl font-bold text-primary">4000-5500元/月</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded">五险一金</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-medium rounded">带薪年假</span>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-medium rounded">节日福利</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job details */}
        <div className="px-4 mt-4 pb-24">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full" />
              岗位详情
            </h3>

            <div className="space-y-4 text-sm text-foreground leading-relaxed">
              <div>
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  岗位职责
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">1.</span>
                    <span><strong>基础治理：</strong>负责辖区内网格化管理工作，开展日常巡查，采集更新人口及房屋信息，排查安全隐患。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">2.</span>
                    <span><strong>居民服务：</strong>接待居民来访，咨询解答政策，协助办理社保、民政、计生等公共服务事项；重点关注"一老一小"及困难群体，提供精准帮扶。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">3.</span>
                    <span><strong>活动组织：</strong>策划并组织社区文化、公益志愿、邻里互助等各类活动，营造和谐社区氛围。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">4.</span>
                    <span><strong>矛盾调解：</strong>协助调解邻里纠纷，促进社区和谐稳定。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">5.</span>
                    <span><strong>其他工作：</strong>完成上级部门及社区交办的临时性工作任务（包括数字化平台操作、文档整理等）。</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-border/50">
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  任职要求
                </h4>
                <ul className="space-y-1.5 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    大专及以上学历
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    年龄35周岁以下
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    本地户籍优先
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    熟练使用Office办公软件
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    有社区工作或志愿服务经验者优先
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-border/50">
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  工作时间
                </h4>
                <p className="text-muted-foreground">周一至周五 9:00-18:00，周末轮休，法定节假日正常休息</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <button className="w-full py-3 bg-gradient-to-r from-primary to-orange-500 text-white text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          我要申请
        </button>
      </div>
    </div>
  )
}
