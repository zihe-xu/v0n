"use client"

import { useState } from "react"
import { ArrowLeft, UtensilsCrossed, ShoppingBag, Truck, MapPin, Clock } from "lucide-react"

const deliveryModes = [
  { key: "dine-in", label: "堂食", icon: UtensilsCrossed },
  { key: "pickup", label: "自提", icon: ShoppingBag },
  { key: "delivery", label: "外送", icon: Truck },
]

const orderItems = [
  { name: "红烧狮子头套餐", qty: 1, price: 10.0 },
  { name: "香菇滑鸡饭", qty: 1, price: 8.0 },
  { name: "清炒时蔬", qty: 1, price: 4.0 },
]

export function CanteenOrderView() {
  const [activeMode, setActiveMode] = useState("dine-in")

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const packingFee = 0.0
  const discount = 4.0
  const total = subtotal + packingFee - discount

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button className="p-1 rounded-full hover:bg-muted transition-colors" aria-label="返回">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">确认订单</h1>
        <div className="w-8" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-24">
        {/* Delivery mode card */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
          <div className="flex items-center gap-1 bg-muted/60 rounded-full p-1">
            {deliveryModes.map((mode) => {
              const Icon = mode.icon
              return (
                <button
                  key={mode.key}
                  onClick={() => setActiveMode(mode.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-medium transition-all ${
                    activeMode === mode.key
                      ? "bg-card text-primary shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {mode.label}
                </button>
              )
            })}
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                就餐位置
              </span>
              <span className="text-xs font-medium text-foreground">
                金岭社区党群中心 1楼食堂
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                就餐时间
              </span>
              <span className="text-xs font-semibold text-primary">
                今日 12:00-12:30
              </span>
            </div>
          </div>
        </div>

        {/* Order details card */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
          <h3 className="text-sm font-bold text-foreground mb-3">餐品详情</h3>
          <div className="space-y-2.5">
            {orderItems.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-xs text-foreground">
                  {item.name}{" "}
                  <span className="text-muted-foreground">x{item.qty}</span>
                </span>
                <span className="text-xs font-medium text-foreground">
                  {'¥ '}{item.price.toFixed(1)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-dashed border-border/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">打包费</span>
              <span className="text-xs text-foreground">{'¥ '}{packingFee.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">合计</span>
              <span className="text-base font-bold text-primary">
                {'¥ '}{(subtotal + packingFee).toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Elder discount card */}
        <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-card">
                长者优惠
              </span>
              <span className="text-xs text-foreground/80">当前身份</span>
            </div>
            <span className="text-xs font-bold text-primary">张建国 (65岁)</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            * 已自动为您减免 {'¥ '}{discount.toFixed(1)}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.06)] px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-muted-foreground">实付</span>
          <span className="text-xl font-bold text-primary">{'¥ '}{total.toFixed(1)}</span>
        </div>
        <button className="px-7 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90 transition-colors">
          立即预约
        </button>
      </div>
    </div>
  )
}
