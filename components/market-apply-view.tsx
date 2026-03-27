"use client"

import { ChevronLeft, Camera, ChevronRight, Check } from "lucide-react"

export function MarketApplyView() {
  return (
    <div className="flex-1 bg-background overflow-auto flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="w-8 h-8 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">摊主报名</h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Progress Steps */}
      <div className="px-4 py-4 bg-amber-50/50">
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium text-primary">选择摊位</span>
          </div>
          <div className="w-8 h-0.5 bg-primary" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
              2
            </div>
            <span className="text-xs font-medium text-primary">填写信息</span>
          </div>
          <div className="w-8 h-0.5 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">
              3
            </div>
            <span className="text-xs font-medium text-muted-foreground">完成报名</span>
          </div>
        </div>
      </div>

      {/* Selected Booth Info */}
      <div className="mx-4 mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">已选摊位</div>
            <div className="font-bold text-primary">A-04 (转角C位)</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">金岭周末后备箱集市</div>
            <div className="text-sm font-medium">2024.01.20 18:00-21:00</div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-4 flex-1 space-y-4">
        {/* Basic Info Section */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full" />
            基本信息
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                摊主姓名 <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="请输入您的姓名"
                className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                联系电话 <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                placeholder="请输入您的联系电话"
                className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                微信号
              </label>
              <input
                type="text"
                placeholder="方便活动群内联系（选填）"
                className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Booth Info Section */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full" />
            摊位信息
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                摊位名称 <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="给您的摊位起个名字吧"
                className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                经营品类 <span className="text-destructive">*</span>
              </label>
              <button className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-left flex items-center justify-between">
                <span className="text-muted-foreground">请选择您的经营品类</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                商品简介 <span className="text-destructive">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="简单描述一下您准备售卖的商品..."
                className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full" />
            商品照片
          </h3>
          <div className="flex gap-3">
            <button className="w-20 h-20 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors">
              <Camera className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">添加照片</span>
            </button>
            <div className="w-20 h-20 rounded-xl bg-muted/50 border border-border flex items-center justify-center">
              <span className="text-xs text-muted-foreground">最多3张</span>
            </div>
          </div>
        </div>

        {/* Vehicle Info */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full" />
            车辆信息（后备箱集市需填）
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                车牌号码
              </label>
              <input
                type="text"
                placeholder="如：粤B·12345"
                className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                车辆颜色
              </label>
              <input
                type="text"
                placeholder="如：白色"
                className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Agreement */}
        <div className="flex items-start gap-2 pt-2">
          <div className="w-4 h-4 mt-0.5 rounded border-2 border-primary bg-primary flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-primary-foreground" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            我已阅读并同意<span className="text-primary">《摊主入驻协议》</span>和<span className="text-primary">《集市管理规定》</span>，承诺遵守相关规定
          </p>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-4 bg-card border-t border-border">
        <button className="w-full py-3 bg-primary text-primary-foreground rounded-full font-medium">
          提交报名
        </button>
      </div>
    </div>
  )
}
