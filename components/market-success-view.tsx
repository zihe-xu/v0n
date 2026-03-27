"use client"

import { Check, Calendar, MapPin, Clock, Copy, MessageCircle, QrCode } from "lucide-react"

export function MarketSuccessView() {
  return (
    <div className="flex-1 bg-gradient-to-b from-amber-50 to-background overflow-auto flex flex-col">
      {/* Success Header */}
      <div className="pt-12 pb-6 text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shadow-lg shadow-primary/30">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-1">报名成功！</h1>
        <p className="text-sm text-muted-foreground">恭喜您成为本次集市摊主</p>
      </div>

      {/* Booth Card */}
      <div className="mx-4 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-orange-400 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-primary-foreground/80 text-xs">摊位编号</div>
              <div className="text-white text-2xl font-bold">A-04</div>
            </div>
            <div className="text-right">
              <div className="text-primary-foreground/80 text-xs">转角C位</div>
              <div className="text-white text-sm font-medium">黄金位置</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <div className="text-lg font-bold text-foreground mb-2">金岭周末后备箱集市</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span>2024年1月20日 (周六)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>18:00 - 21:00</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>社区外围停车场</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-border">
                <QrCode className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">入场二维码</div>
                <div className="text-xs text-muted-foreground">活动当天出示此码入场</div>
              </div>
            </div>
            <button className="text-xs text-primary font-medium">保存</button>
          </div>

          {/* Order Number */}
          <div className="flex items-center justify-between py-2 border-t border-dashed border-border">
            <div className="text-sm text-muted-foreground">报名单号</div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium font-mono">MK20240115001</span>
              <button className="text-primary">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mx-4 mt-4 p-4 bg-card rounded-2xl border border-border">
        <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full" />
          温馨提示
        </h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-medium shrink-0">1</span>
            <span>请于活动开始前1小时到达指定摊位进行布置</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-medium shrink-0">2</span>
            <span>已为您加入集市摊主群，请注意查收微信群邀请</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-medium shrink-0">3</span>
            <span>如需取消报名，请至少提前3天联系管理员</span>
          </div>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-medium shrink-0">4</span>
            <span>活动当天请携带身份证及车辆行驶证（后备箱摊主）</span>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="mx-4 mt-4 p-3 bg-amber-50 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <span className="text-sm text-foreground">有疑问？联系活动负责人</span>
        </div>
        <button className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
          立即咨询
        </button>
      </div>

      {/* Bottom Buttons */}
      <div className="mt-auto p-4 space-y-2">
        <button className="w-full py-3 bg-primary text-primary-foreground rounded-full font-medium">
          查看我的摊位
        </button>
        <button className="w-full py-3 bg-card border border-border text-foreground rounded-full font-medium">
          返回首页
        </button>
      </div>
    </div>
  )
}
