"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, MapPin, Clock, ShoppingCart, Minus, Plus } from "lucide-react"

const categories = ["热销", "小炒", "蒸菜", "汤品", "主食"]

const menuItems = [
  {
    id: 1,
    name: "红烧狮子头",
    image: "/images/food-braised-meatball.jpg",
    monthlySales: 200,
    elderPrice: 10,
    originalPrice: 15,
    category: "热销",
  },
  {
    id: 2,
    name: "土豆炖牛腩",
    image: "/images/food-potato-beef.jpg",
    monthlySales: 150,
    elderPrice: 18,
    originalPrice: 22,
    category: "热销",
  },
  {
    id: 3,
    name: "清炒时蔬",
    image: "/images/food-vegetables.jpg",
    monthlySales: 300,
    elderPrice: 5,
    originalPrice: 8,
    category: "热销",
  },
  {
    id: 4,
    name: "玉米排骨汤",
    image: "/images/food-corn-soup.jpg",
    monthlySales: 120,
    elderPrice: 7,
    originalPrice: 10,
    category: "汤品",
  },
  {
    id: 5,
    name: "五常大米饭",
    image: "/images/food-rice.jpg",
    monthlySales: 500,
    elderPrice: 1,
    originalPrice: 2,
    category: "主食",
  },
]

export function CanteenMenuView() {
  const [activeCategory, setActiveCategory] = useState("热销")
  const [quantities, setQuantities] = useState<Record<number, number>>({
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 0,
  })

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0)
  const totalPrice = menuItems.reduce((sum, item) => {
    return sum + (quantities[item.id] || 0) * item.elderPrice
  }, 0)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button className="p-1 rounded-full hover:bg-muted transition-colors" aria-label="返回">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">金岭长者助餐点 (二分店)</h1>
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
          <ShoppingCart className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Location & Time Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-card border-b border-border/50">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>金岭花园 A区 3栋架空层</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span>11:30-13:00</span>
        </div>
      </div>

      {/* Main content with sidebar categories */}
      <div className="flex flex-1 overflow-hidden">
        {/* Category sidebar */}
        <div className="w-[72px] bg-muted/60 border-r border-border/30 flex-shrink-0 overflow-y-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full py-4 text-xs font-medium text-center transition-colors relative ${
                activeCategory === cat
                  ? "bg-card text-primary font-semibold"
                  : "text-muted-foreground hover:bg-card/50"
              }`}
            >
              {activeCategory === cat && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Menu list */}
        <div className="flex-1 overflow-y-auto pb-20">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 p-3 border-b border-border/30"
            >
              {/* Food image */}
              <div className="w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={72}
                  height={72}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    月售 {item.monthlySales}
                  </p>
                </div>
                <div className="flex items-end justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[10px] text-primary font-medium">长者</span>
                    <span className="text-base font-bold text-primary">
                      {'¥'}{item.elderPrice}
                    </span>
                    <span className="text-[10px] text-muted-foreground line-through">
                      原价{'¥'}{item.originalPrice}
                    </span>
                  </div>
                  {/* Quantity control */}
                  <div className="flex items-center gap-2">
                    {(quantities[item.id] || 0) > 0 && (
                      <>
                        <button
                          onClick={() =>
                            setQuantities((q) => ({
                              ...q,
                              [item.id]: Math.max(0, (q[item.id] || 0) - 1),
                            }))
                          }
                          className="w-6 h-6 rounded-full border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                          aria-label="减少"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold text-foreground w-4 text-center">
                          {quantities[item.id]}
                        </span>
                      </>
                    )}
                    <button
                      onClick={() =>
                        setQuantities((q) => ({
                          ...q,
                          [item.id]: (q[item.id] || 0) + 1,
                        }))
                      }
                      className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                      aria-label="增加"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom cart bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.06)] px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shadow-md">
              <ShoppingCart className="w-5 h-5 text-card" />
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-500 text-card text-[10px] font-bold flex items-center justify-center border-2 border-card">
                {totalItems}
              </span>
            )}
          </div>
          <div>
            <span className="text-lg font-bold text-primary">{'¥ '}{totalPrice.toFixed(1)}</span>
            <p className="text-[10px] text-muted-foreground">支持长者卡支付</p>
          </div>
        </div>
        <button className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90 transition-colors">
          下单
        </button>
      </div>
    </div>
  )
}
