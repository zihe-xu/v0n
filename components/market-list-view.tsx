"use client"

import { Search, MapPin, Sparkles } from "lucide-react"
import Image from "next/image"

const markets = [
  {
    id: 1,
    title: "金岭周末后备箱集市",
    image: "/images/market-trunk.jpg",
    date: { day: "20", month: "1月" },
    location: "社区外围停车场",
    tags: ["潮流", "音乐", "车友会"],
    status: "recruiting",
    booths: { total: 30, available: 12 },
  },
  {
    id: 2,
    title: "亲子跳蚤市场·儿童专场",
    image: "/images/market-kids.jpg",
    date: { day: "21", month: "1月" },
    location: "中心花园广场",
    tags: ["亲子", "闲置童换", "公益"],
    status: "recruiting",
    booths: { total: 20, available: 5 },
  },
  {
    id: 3,
    title: "社区手工艺品展销会",
    image: "/images/market-handcraft.jpg",
    date: { day: "27", month: "1月" },
    location: "党群中心一楼大厅",
    tags: ["手工", "文创", "艺术"],
    status: "upcoming",
    booths: { total: 15, available: 15 },
  },
]

export function MarketListView() {
  return (
    <div className="flex-1 bg-gradient-to-b from-amber-50/80 to-background overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-foreground">棚友集市</h1>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-50 text-primary">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Brand Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-foreground">金岭棚友集市</h2>
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground mt-1">发现社区好物 / 参与创意摆摊</p>
      </div>

      {/* Stats Bar */}
      <div className="mx-4 mb-4 p-3 bg-gradient-to-r from-primary/10 to-orange-100/50 rounded-xl">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">3</div>
            <div className="text-xs text-muted-foreground">本月集市</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-lg font-bold text-primary">32</div>
            <div className="text-xs text-muted-foreground">可选摊位</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <div className="text-lg font-bold text-primary">128</div>
            <div className="text-xs text-muted-foreground">累计摊主</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-2">
          {["全部", "正在招募", "即将开始", "已结束"].map((tab, i) => (
            <button
              key={tab}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Market List */}
      <div className="px-4 pb-6 space-y-4">
        {markets.map((market) => (
          <div
            key={market.id}
            className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-36">
              <Image
                src={market.image}
                alt={market.title}
                fill
                className="object-cover"
              />
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    market.status === "recruiting"
                      ? "bg-primary text-primary-foreground"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {market.status === "recruiting" ? "正在招募" : "即将开始"}
                </span>
              </div>
              {/* Booth Count */}
              <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 rounded-lg">
                <span className="text-xs text-white">
                  剩余 <span className="font-bold text-primary">{market.booths.available}</span> / {market.booths.total} 摊位
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-foreground mb-2">{market.title}</h3>
              
              <div className="flex items-center gap-4 mb-3">
                {/* Date Badge */}
                <div className="flex flex-col items-center justify-center w-12 h-12 bg-amber-50 rounded-xl border border-amber-100">
                  <span className="text-lg font-bold text-primary leading-none">{market.date.day}</span>
                  <span className="text-xs text-amber-600">{market.date.month}</span>
                </div>
                
                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  {market.location}
                </div>
              </div>

              {/* Tags & Button */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {market.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  去报名
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
