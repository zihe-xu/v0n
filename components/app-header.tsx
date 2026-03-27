"use client"

import { MoreHorizontal, Search } from "lucide-react"

export function AppHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
      <div className="w-8" />
      <h1 className="text-lg font-semibold text-foreground">智慧社区</h1>
      <div className="flex items-center gap-2">
        <button className="p-1 rounded-full hover:bg-muted transition-colors" aria-label="更多">
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="p-1 rounded-full hover:bg-muted transition-colors" aria-label="搜索">
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
