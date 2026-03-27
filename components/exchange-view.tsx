"use client"

import Image from "next/image"
import { Tag, Repeat } from "lucide-react"

const items = [
  {
    id: 1,
    title: "实木餐椅 | 北欧风格",
    image: "/images/exchange-chair.jpg",
    category: "椅子",
    condition: "全新",
    publisher: "小王",
    time: "2小时前",
  },
  {
    id: 2,
    title: "极简台灯 | LED护眼款",
    image: "/images/exchange-lamp.jpg",
    category: "灯具",
    condition: "九成新",
    publisher: "小李",
    time: "3小时前",
  },
  {
    id: 3,
    title: "儿童书包 | 迪士尼联名",
    image: "/images/exchange-bag.jpg",
    category: "书包",
    condition: "全新",
    publisher: "萌妈",
    time: "5小时前",
  },
  {
    id: 4,
    title: "实木小圆桌 | 可折叠",
    image: "/images/exchange-chair.jpg",
    category: "桌子",
    condition: "八成新",
    publisher: "张姐",
    time: "1天前",
  },
  {
    id: 5,
    title: "落地书架 | 多层收纳",
    image: "/images/exchange-lamp.jpg",
    category: "收纳",
    condition: "全新",
    publisher: "大卫",
    time: "1天前",
  },
  {
    id: 6,
    title: "儿童安全座椅 | 品牌",
    image: "/images/exchange-bag.jpg",
    category: "儿童用品",
    condition: "九成新",
    publisher: "琳琳",
    time: "2天前",
  },
]

export function ExchangeView() {
  return (
    <div className="bg-background">
      {/* Banner */}
      <div className="mx-3 mt-3 mb-2 rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-4 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Repeat className="w-5 h-5 text-primary-foreground" />
            <h2 className="text-base font-bold text-primary-foreground">闲置物品换福利</h2>
          </div>
          <p className="text-xs text-primary-foreground/80">
            让闲置物品焕发新生，交换中发现更多惊喜
          </p>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-primary-foreground/10" />
        <div className="absolute -right-2 bottom-0 w-16 h-16 rounded-full bg-primary-foreground/5" />
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-2 gap-2.5 px-3 py-2">
        {items.map((item) => (
          <ExchangeCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

interface ExchangeCardProps {
  item: {
    id: number
    title: string
    image: string
    category: string
    condition: string
    publisher: string
    time: string
  }
}

function ExchangeCard({ item }: ExchangeCardProps) {
  return (
    <button className="flex flex-col text-left bg-card rounded-xl overflow-hidden shadow-sm border border-border/50 group">
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-muted">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Condition badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-card/90 backdrop-blur-sm text-[10px] font-medium text-foreground border border-border/50">
          {item.condition}
        </div>
      </div>
      {/* Content */}
      <div className="p-2.5 flex flex-col gap-1.5">
        <h3 className="text-xs font-semibold text-foreground leading-snug line-clamp-2">
          {item.title}
        </h3>
        {/* Tags */}
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-primary/10 text-[10px] font-medium text-primary">
            <Tag className="w-2.5 h-2.5" />
            {item.category}
          </span>
        </div>
        {/* Publisher and time */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">{item.publisher}</span>
          <span className="text-[10px] text-muted-foreground">{item.time}</span>
        </div>
      </div>
    </button>
  )
}
