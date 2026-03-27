"use client"

import type { ReactNode } from "react"

interface PhoneFrameProps {
  children: ReactNode
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative w-[375px] h-[812px] bg-card rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-foreground/10 flex-shrink-0">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-card">
        <span className="text-xs font-medium text-foreground/80">中国移动</span>
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold text-foreground/80">15:15</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-foreground/80">99%</span>
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none" className="text-green-500">
            <rect x="0.5" y="0.5" width="16" height="9" rx="1.5" stroke="currentColor" strokeWidth="1" />
            <rect x="2" y="2" width="13" height="6" rx="0.5" fill="currentColor" />
            <rect x="17.5" y="3" width="2" height="4" rx="0.5" fill="currentColor" />
          </svg>
        </div>
      </div>
      {/* Content */}
      <div className="h-[calc(100%-32px)] overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}
