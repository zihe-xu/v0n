"use client"

import { ChevronDown, Search, User } from "lucide-react"

interface CommunityHeaderProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

const tabs = [
  { id: "recommend", label: "推荐" },
  { id: "good-stuff", label: "好物分享" },
  { id: "exchange", label: "闲置物品交换" },
  { id: "craft", label: "社区手工工社" },
  { id: "products", label: "优秀产品" },
]

export function CommunityHeader({ activeTab = "recommend", onTabChange }: CommunityHeaderProps) {
  return (
    <div className="bg-card">
      {/* Community selector + search */}
      <div className="flex items-center gap-2 px-4 py-2.5">
        <button className="flex items-center gap-0.5 text-sm font-medium text-foreground flex-shrink-0">
          金岭社区
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/80 border border-border">
          <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          <span className="text-xs text-muted-foreground">搜索</span>
        </div>
        <button className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0" aria-label="用户">
          <User className="w-3.5 h-3.5 text-primary" />
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex gap-0 px-2 overflow-x-auto scrollbar-hide border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`relative px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
