"use client"

import { useState } from "react"
import {
  Home,
  Compass,
  Users,
  User,
  Sparkles,
  ChevronLeft,
} from "lucide-react"

// Import all views
import { HomepageView } from "@/components/homepage-view"
import { ServicesView } from "@/components/services-view"
import { NoticeListView } from "@/components/notice-list-view"
import { NoticeDetailView } from "@/components/notice-detail-view"
import { CanteenListView } from "@/components/canteen-list-view"
import { CanteenMenuView } from "@/components/canteen-menu-view"
import { CanteenOrderView } from "@/components/canteen-order-view"
import { ChildcareListView } from "@/components/childcare-list-view"
import { ChildcareDetailView } from "@/components/childcare-detail-view"
import { JobListView } from "@/components/job-list-view"
import { JobDetailView } from "@/components/job-detail-view"
import { JobApplyView } from "@/components/job-apply-view"
import { JobSuccessView } from "@/components/job-success-view"
import { JobMyApplicationsView } from "@/components/job-my-applications-view"
import { MarketListView } from "@/components/market-list-view"
import { MarketDetailView } from "@/components/market-detail-view"
import { MarketApplyView } from "@/components/market-apply-view"
import { MarketSuccessView } from "@/components/market-success-view"
import { MarketMyBoothsView } from "@/components/market-my-booths-view"
import { MapView } from "@/components/map-view"
import { ListView } from "@/components/list-view"
import { DetailView } from "@/components/detail-view"
import { MapListView } from "@/components/map-list-view"
import { ActivityCalendarView } from "@/components/activity-calendar-view"
import { ActivityDetailView } from "@/components/activity-detail-view"
import { RecommendView } from "@/components/recommend-view"
import { CommunityHeader } from "@/components/community-header"
import { AppHeader } from "@/components/app-header"
import { CategoryTabs } from "@/components/category-tabs"
import { FeedbackListView } from "@/components/feedback-list-view"
import { FeedbackSubmitView } from "@/components/feedback-submit-view"
import { FeedbackDetailView } from "@/components/feedback-detail-view"
import { FeedbackSuccessView } from "@/components/feedback-success-view"
import { ProfileView } from "@/components/profile-view"
import { VenueMapView } from "@/components/venue-map-view"
import { VenueDetailView } from "@/components/venue-detail-view"
import { VenueBookingSuccessView } from "@/components/venue-booking-success-view"
import { AIChatView } from "@/components/ai-chat-view"
import { AISportsChatView } from "@/components/ai-sports-chat-view"
import { AIActivityChatView } from "@/components/ai-activity-chat-view"
import { AICanteenChatView } from "@/components/ai-canteen-chat-view"
import { AIChildcareChatView } from "@/components/ai-childcare-chat-view"
import { AILibraryChatView } from "@/components/ai-library-chat-view"
import { AIGovernmentChatView } from "@/components/ai-government-chat-view"
import { AIServicesChatView } from "@/components/ai-services-chat-view"
import { AIExploreChatView } from "@/components/ai-explore-chat-view"
import { AIEducationChatView } from "@/components/ai-education-chat-view"

type PageType = 
  | "home" 
  | "services" 
  | "notice" 
  | "notice-detail"
  | "canteen" 
  | "canteen-menu"
  | "canteen-order"
  | "childcare" 
  | "childcare-detail"
  | "job" 
  | "job-detail"
  | "job-apply"
  | "job-success"
  | "job-my"
  | "market" 
  | "market-detail"
  | "market-apply"
  | "market-success"
  | "market-my"
  | "map"
  | "map-list-view"
  | "map-detail"
  | "map-list"
  | "activity"
  | "activity-detail"
  | "neighbor"
  | "profile"
  | "feedback"
  | "feedback-submit"
  | "feedback-detail"
  | "feedback-success"
  | "venue-map"
  | "venue-detail"
  | "venue-booking-success"
  | "ai-chat"
  | "ai-sports"
  | "ai-activity"
  | "ai-canteen"
  | "ai-childcare"
  | "ai-library"
  | "ai-government"
  | "ai-services"
  | "ai-explore"
  | "ai-education"

interface InteractiveAppProps {
  className?: string
}

export function InteractiveApp({ className }: InteractiveAppProps) {
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [history, setHistory] = useState<PageType[]>([])
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null)
  const [isMapViewMode, setIsMapViewMode] = useState(true)

  const navigate = (page: PageType) => {
    setHistory(prev => [...prev, currentPage])
    setCurrentPage(page)
  }

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1]
      setHistory(h => h.slice(0, -1))
      setCurrentPage(prev)
    }
  }

  const handleTabNav = (tab: string) => {
    switch (tab) {
      case "home":
        setCurrentPage("home")
        setHistory([])
        break
      case "services":
        navigate("services")
        break
      case "neighbor":
        navigate("neighbor")
        break
      case "profile":
        navigate("profile")
        break
    }
  }

  // Determine which tab is active
  const getActiveTab = () => {
    if (currentPage === "home") return "home"
    if (currentPage === "services") return "services"
    if (currentPage === "neighbor") return "neighbor"
    if (currentPage === "profile") return "profile"
    return "home"
  }

  // Get page title for header
  const getPageTitle = (): string => {
    const titles: Record<PageType, string> = {
      home: "智慧社区",
      services: "服务大厅",
      notice: "通知公告",
      "notice-detail": "公告详情",
      canteen: "社区食堂",
      "canteen-menu": "菜品点餐",
      "canteen-order": "确认订单",
      childcare: "安心托育",
      "childcare-detail": "托育详情",
      job: "社区招工",
      "job-detail": "岗位详情",
      "job-apply": "申请报名",
      "job-success": "申请成功",
      "job-my": "我的申请",
      market: "棚友集市",
      "market-detail": "集市详情",
      "market-apply": "摊主报名",
      "market-success": "报名成功",
      "market-my": "我的摊位",
      map: "社区地图",
      "map-list-view": "图文列表",
      "map-detail": "景点详情",
      "map-list": "掌上地图",
      activity: "活动日历",
      "activity-detail": "活动详情",
      neighbor: "邻里社区",
      profile: "我的",
      feedback: "我的留言",
      "feedback-submit": "我要留言",
      "feedback-detail": "留言详情",
      "feedback-success": "提交成功",
      "venue-map": "场地分布",
      "venue-detail": "场地详情",
      "venue-booking-success": "预约成功",
      "ai-chat": "AI助手",
      "ai-sports": "场地预约助手",
      "ai-activity": "活动报名助手",
      "ai-canteen": "社区食堂助手",
      "ai-childcare": "托育服务助手",
      "ai-library": "图书借阅助手",
      "ai-government": "政务服务助手",
      "ai-services": "城市服务助手",
      "ai-explore": "行街指南助手",
      "ai-education": "教育补贴助手",
    }
    return titles[currentPage]
  }

  // Check if we need back button
  const needsBackButton = currentPage !== "home"

  // Render header for inner pages
  const renderHeader = () => {
    if (currentPage === "home") return null
    
    return (
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border/50">
        <button onClick={goBack} className="w-8 h-8 flex items-center justify-center -ml-2">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">{getPageTitle()}</h1>
        <div className="w-8" />
      </div>
    )
  }

  // Render current page content
  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <HomepageView onNavigate={(page) => navigate(page as PageType)} />
      case "services":
        return (
          <>
            <AppHeader />
            <ServicesView />
          </>
        )
      case "notice":
        return <NoticeListView />
      case "notice-detail":
        return <NoticeDetailView />
      case "canteen":
        return <CanteenListView />
      case "canteen-menu":
        return <CanteenMenuView />
      case "canteen-order":
        return <CanteenOrderView />
      case "childcare":
        return <ChildcareListView />
      case "childcare-detail":
        return <ChildcareDetailView />
      case "job":
        return <JobListView />
      case "job-detail":
        return <JobDetailView />
      case "job-apply":
        return <JobApplyView />
      case "job-success":
        return <JobSuccessView />
      case "job-my":
        return <JobMyApplicationsView />
      case "market":
        return <MarketListView />
      case "market-detail":
        return <MarketDetailView />
      case "market-apply":
        return <MarketApplyView />
      case "market-success":
        return <MarketSuccessView />
      case "market-my":
        return <MarketMyBoothsView />
      case "map":
        return (
          <>
            <AppHeader />
            <CategoryTabs 
              isMapView={isMapViewMode} 
              onToggleView={() => {
                if (isMapViewMode) {
                  setIsMapViewMode(false)
                  navigate("map-list-view")
                } else {
                  setIsMapViewMode(true)
                  navigate("map")
                }
              }}
            />
            <MapView 
              onMarkerClick={(name) => {
                setSelectedPlace(name)
                navigate("map-detail")
              }}
            />
          </>
        )
      case "map-list-view":
        return (
          <>
            <AppHeader />
            <CategoryTabs 
              isMapView={false} 
              onToggleView={() => {
                setIsMapViewMode(true)
                goBack()
              }}
            />
            <ListView 
              onPlaceClick={(name) => {
                setSelectedPlace(name)
                navigate("map-detail")
              }}
            />
          </>
        )
      case "map-detail":
        return (
          <>
            <AppHeader />
            <CategoryTabs 
              isMapView={isMapViewMode} 
              onToggleView={() => {
                setSelectedPlace(null)
                if (isMapViewMode) {
                  setIsMapViewMode(false)
                  setCurrentPage("map-list-view")
                } else {
                  setIsMapViewMode(true)
                  setCurrentPage("map")
                }
              }}
            />
            <DetailView 
              placeName={selectedPlace || undefined}
              onClose={() => {
                setSelectedPlace(null)
                goBack()
              }}
            />
          </>
        )
      case "map-list":
        return <MapListView />
      case "activity":
        return (
          <>
            <AppHeader />
            <ActivityCalendarView />
          </>
        )
      case "activity-detail":
        return <ActivityDetailView />
      case "feedback":
        return <FeedbackListView />
      case "feedback-submit":
        return <FeedbackSubmitView />
      case "feedback-detail":
        return <FeedbackDetailView />
      case "feedback-success":
        return <FeedbackSuccessView />
      case "venue-map":
        return <VenueMapView onNavigate={(page) => navigate(page as PageType)} />
      case "venue-detail":
        return <VenueDetailView onNavigate={(page) => navigate(page as PageType)} />
      case "venue-booking-success":
        return <VenueBookingSuccessView />
      case "ai-chat":
        return <AIChatView />
      case "ai-sports":
        return <AISportsChatView />
      case "ai-activity":
        return <AIActivityChatView />
      case "ai-canteen":
        return <AICanteenChatView />
      case "ai-childcare":
        return <AIChildcareChatView />
      case "ai-library":
        return <AILibraryChatView />
      case "ai-government":
        return <AIGovernmentChatView />
      case "ai-services":
        return <AIServicesChatView />
      case "ai-explore":
        return <AIExploreChatView />
      case "ai-education":
        return <AIEducationChatView />
      case "neighbor":
        return (
          <>
            <AppHeader />
            <CommunityHeader activeTab="recommend" />
            <RecommendView />
          </>
        )
      case "profile":
        return <ProfileView onNavigate={(page) => navigate(page as PageType)} />
      default:
        return <HomepageView onNavigate={(page) => navigate(page as PageType)} />
    }
  }

  return (
    <div className={`flex flex-col h-full bg-background ${className || ""}`}>
      {/* Header for inner pages */}
      {needsBackButton && currentPage !== "services" && currentPage !== "map" && currentPage !== "map-list-view" && currentPage !== "map-detail" && currentPage !== "activity" && currentPage !== "neighbor" && currentPage !== "profile" && !currentPage.startsWith("ai-") && renderHeader()}
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border/60 px-2 pt-1.5 pb-5">
        <div className="flex items-end justify-around">
          <NavItem 
            icon={Home} 
            label="首页" 
            active={getActiveTab() === "home"}
            onClick={() => handleTabNav("home")}
          />
          <NavItem 
            icon={Compass} 
            label="服务" 
            active={getActiveTab() === "services"}
            onClick={() => handleTabNav("services")}
          />
          {/* AI center button */}
          <div className="flex flex-col items-center -mt-5">
            <button 
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/25 ring-4 ring-card"
              onClick={() => navigate("ai-chat")}
            >
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </button>
            <span className="text-[10px] text-primary font-semibold mt-1">AI助手</span>
          </div>
          <NavItem 
            icon={Users} 
            label="邻里" 
            active={getActiveTab() === "neighbor"}
            onClick={() => handleTabNav("neighbor")}
          />
          <NavItem 
            icon={User} 
            label="我的" 
            active={getActiveTab() === "profile"}
            onClick={() => handleTabNav("profile")}
          />
        </div>
      </div>
    </div>
  )
}

function NavItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: typeof Home
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button 
      className="flex flex-col items-center gap-0.5 min-w-[48px]"
      onClick={onClick}
    >
      <Icon
        className={`w-5 h-5 ${active ? "text-primary" : "text-muted-foreground"}`}
        strokeWidth={active ? 2.2 : 1.8}
      />
      <span
        className={`text-[10px] font-medium ${
          active ? "text-primary font-semibold" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </button>
  )
}
