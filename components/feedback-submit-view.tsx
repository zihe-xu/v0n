"use client"

import { ChevronLeft, ChevronRight, MapPin, Camera, ImagePlus, Mic, X, AlertCircle, Shield } from "lucide-react"

const categories = [
  { id: 1, name: "公共设施", icon: "🏗️", desc: "路灯、道路、健身器材等" },
  { id: 2, name: "环境卫生", icon: "🌿", desc: "垃圾清理、绿化养护等" },
  { id: 3, name: "民生服务", icon: "🏥", desc: "医疗、养老、教育等" },
  { id: 4, name: "邻里纠纷", icon: "🤝", desc: "噪音、占道、纠纷调解等" },
  { id: 5, name: "物业管理", icon: "🏠", desc: "停车、安保、维修等" },
  { id: 6, name: "其他问题", icon: "📋", desc: "其他社区相关问题" },
]

export function FeedbackSubmitView() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-50/50 to-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-orange-500">
        <button className="p-1 rounded-full hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">我要留言</h1>
        <div className="w-8" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Tips banner */}
        <div className="px-4 pt-4">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-3 border border-amber-200/50">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-foreground font-medium">温馨提示</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  请如实填写反映内容，我们将在3个工作日内受理您的留言并及时回复。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category selection */}
        <div className="px-4 pt-4">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              问题分类
              <span className="text-red-500">*</span>
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat, index) => (
                <button
                  key={cat.id}
                  className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                    index === 0
                      ? "border-primary bg-amber-50"
                      : "border-border bg-muted/30 hover:border-primary/50"
                  }`}
                >
                  <span className="text-xl mb-1">{cat.icon}</span>
                  <span className={`text-xs font-medium ${index === 0 ? "text-primary" : "text-foreground"}`}>
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Title input */}
        <div className="px-4 pt-3">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              问题标题
              <span className="text-red-500">*</span>
            </h3>
            <input
              type="text"
              placeholder="请简要描述您要反映的问题（15字以内）"
              className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Content input */}
        <div className="px-4 pt-3">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              详细描述
              <span className="text-red-500">*</span>
            </h3>
            <div className="relative">
              <textarea
                placeholder="请详细描述您要反映的问题，包括时间、地点、具体情况等..."
                rows={5}
                className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button className="p-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                  <Mic className="w-4 h-4 text-muted-foreground" />
                </button>
                <span className="text-xs text-muted-foreground">0/500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="px-4 pt-3">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              问题位置
              <span className="text-xs text-muted-foreground font-normal ml-1">(可选)</span>
            </h3>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 rounded-xl border border-border hover:bg-muted/70 transition-colors">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">点击选择或定位问题发生地点</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Image upload */}
        <div className="px-4 pt-3">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              上传照片
              <span className="text-xs text-muted-foreground font-normal ml-1">(最多9张)</span>
            </h3>

            <div className="grid grid-cols-4 gap-2">
              {/* Uploaded image preview */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <img
                  src="/images/notice-1.jpg"
                  alt="uploaded"
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>

              {/* Upload buttons */}
              <button className="aspect-square rounded-xl border-2 border-dashed border-primary/40 bg-amber-50/50 flex flex-col items-center justify-center gap-1 hover:bg-amber-50 transition-colors">
                <Camera className="w-5 h-5 text-primary/60" />
                <span className="text-[9px] text-primary font-medium">拍照</span>
              </button>
              <button className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-1 hover:bg-muted/50 transition-colors">
                <ImagePlus className="w-5 h-5 text-muted-foreground" />
                <span className="text-[9px] text-muted-foreground font-medium">相册</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="px-4 pt-3">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              联系方式
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">联系人 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="请输入您的姓名"
                  className="w-full px-4 py-2.5 bg-muted/50 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">手机号 <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  placeholder="请输入您的联系电话"
                  className="w-full px-4 py-2.5 bg-muted/50 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Privacy notice */}
        <div className="px-4 pt-3">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 rounded border-2 border-primary bg-primary flex items-center justify-center mt-0.5 shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground">
              我已阅读并同意
              <span className="text-primary">《市民留言服务协议》</span>
              ，承诺所反映情况属实，并同意公开留言内容（隐私信息除外）
            </p>
          </div>
        </div>

        {/* Privacy badge */}
        <div className="px-4 pt-3 pb-4">
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>您的个人信息将严格保密</span>
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <button className="w-full py-3 bg-gradient-to-r from-primary to-orange-500 text-white text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          提交留言
        </button>
      </div>
    </div>
  )
}
