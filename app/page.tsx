"use client"

import { useState } from "react"
import { PhoneFrame } from "@/components/phone-frame"
import { AppHeader } from "@/components/app-header"
import { CategoryTabs } from "@/components/category-tabs"
import { MapView } from "@/components/map-view"
import { DetailView } from "@/components/detail-view"
import { ListView } from "@/components/list-view"
import { ActivityCalendarView } from "@/components/activity-calendar-view"
import { ActivityDetailView } from "@/components/activity-detail-view"
import { CommunityHeader } from "@/components/community-header"
import { RecommendView } from "@/components/recommend-view"
import { ExchangeView } from "@/components/exchange-view"
import { GoodStuffView } from "@/components/good-stuff-view"
import { ProductsView } from "@/components/products-view"
import { CraftView } from "@/components/craft-view"
import { ServicesView } from "@/components/services-view"
import { NoticeListView } from "@/components/notice-list-view"
import { NoticeDetailView } from "@/components/notice-detail-view"
import { CanteenListView } from "@/components/canteen-list-view"
import { CanteenMenuView } from "@/components/canteen-menu-view"
import { CanteenOrderView } from "@/components/canteen-order-view"
import { CanteenAdminDashboard } from "@/components/canteen-admin-dashboard"
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
import { InteractiveApp } from "@/components/interactive-app"
import { StampWallView } from "@/components/stamp-wall-view"
import { ExploreAdminDashboard } from "@/components/explore-admin-dashboard"
import { MapListView } from "@/components/map-list-view"
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

export default function Home() {
  return (
    <main className="min-h-screen bg-muted/50 py-8 px-4">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">智慧社区 - 高保真设计稿</h1>
        <p className="text-sm text-muted-foreground mt-2">
          共 52 个页面 + 2 后台 - 涵盖行街指南(地图打卡)、活动日历、社区论坛、服务大厅、通知公告、社区食堂、安心托育、社区招工、棚友集市、市民留言、个人中心、场地预约、AI助手等核心功能
        </p>
      </div>

      {/* Interactive Demo */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            交互式演示
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
          <p className="text-xs text-muted-foreground mt-2">点击菜单项可在页面间导航</p>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>可交互原型</ScreenLabel>
            <PhoneFrame>
              <InteractiveApp />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* Section 1: 行街指南(地图打卡) */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            行街指南(地图打卡)
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
          <p className="text-xs text-muted-foreground mt-2">支持地图浏览、分类筛选、景点详情、打卡收集邮戳、评论互动等完整功能</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Screen 1: Map View */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>地图浏览</ScreenLabel>
            <PhoneFrame>
              <AppHeader />
              <CategoryTabs isMapView={true} />
              <MapView />
            </PhoneFrame>
          </div>

          {/* Screen 2: Detail View */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>景点详情(含打卡)</ScreenLabel>
            <PhoneFrame>
              <DetailView placeId="1" />
            </PhoneFrame>
          </div>

          {/* Screen 3: List View */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>图文列表</ScreenLabel>
            <PhoneFrame>
              <AppHeader />
              <CategoryTabs isMapView={false} />
              <ListView />
            </PhoneFrame>
          </div>

          {/* Screen 4: Stamp Wall */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>我的邮戳墙</ScreenLabel>
            <PhoneFrame>
              <StampWallView />
            </PhoneFrame>
          </div>

          {/* Screen 5: Map List View (Text Version) */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>掌上地图(文字版)</ScreenLabel>
            <PhoneFrame>
              <MapListView />
            </PhoneFrame>
          </div>
        </div>

        {/* Explore Admin Dashboard */}
        <div className="mt-10">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
              <span className="w-8 h-0.5 rounded-full bg-primary" />
              行街指南管理后台 (Web端)
              <span className="w-8 h-0.5 rounded-full bg-primary" />
            </h2>
            <p className="text-xs text-muted-foreground mt-2">简约纯白风格 - 地图管理、点位管理、评论审核、打卡记录、数据统计</p>
          </div>
          <div className="max-w-[1200px] mx-auto">
            <ExploreAdminDashboard />
          </div>
        </div>
      </section>

      {/* Section 2: Activity screens */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            社区活动
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Screen 4: Activity Calendar */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>活动日历</ScreenLabel>
            <PhoneFrame>
              <AppHeader />
              <ActivityCalendarView />
            </PhoneFrame>
          </div>

          {/* Screen 5: Activity Detail */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>活动详情</ScreenLabel>
            <PhoneFrame>
              <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
                <div className="w-8" />
                <h1 className="text-lg font-semibold text-foreground">任务详情</h1>
                <div className="w-8" />
              </div>
              <ActivityDetailView />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* Section 3: Services screen */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            服务大厅
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>服务</ScreenLabel>
            <PhoneFrame>
              <AppHeader />
              <ServicesView />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* Section 3: Notice screens */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            通知公告
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Notice List */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>通知公告列表</ScreenLabel>
            <PhoneFrame>
              <NoticeListView />
            </PhoneFrame>
          </div>
          {/* Notice Detail */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>公告详情</ScreenLabel>
            <PhoneFrame>
              <NoticeDetailView />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* Section 4: Canteen screens */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            社区食堂
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Canteen List */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>食堂列表</ScreenLabel>
            <PhoneFrame>
              <CanteenListView />
            </PhoneFrame>
          </div>
          {/* Canteen Menu */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>菜品点餐</ScreenLabel>
            <PhoneFrame>
              <CanteenMenuView />
            </PhoneFrame>
          </div>
          {/* Order Confirmation */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>确认订单</ScreenLabel>
            <PhoneFrame>
              <CanteenOrderView />
            </PhoneFrame>
          </div>
        </div>

        {/* Admin Dashboard */}
        <div className="mt-10">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
              <span className="w-8 h-0.5 rounded-full bg-primary" />
              食堂管理后台 (Web端)
              <span className="w-8 h-0.5 rounded-full bg-primary" />
            </h2>
          </div>
          <div className="max-w-[1200px] mx-auto">
            <CanteenAdminDashboard />
          </div>
        </div>
      </section>

      {/* Section 5: Childcare screens */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            安心托育
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Childcare List */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>托育机构列表</ScreenLabel>
            <PhoneFrame>
              <ChildcareListView />
            </PhoneFrame>
          </div>
          {/* Childcare Detail */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>托育机构详情</ScreenLabel>
            <PhoneFrame>
              <ChildcareDetailView />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* Section 6: Job Recruitment screens */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            社区招工
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Job List */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>招工列表</ScreenLabel>
            <PhoneFrame>
              <JobListView />
            </PhoneFrame>
          </div>
          {/* Job Detail */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>岗位详情</ScreenLabel>
            <PhoneFrame>
              <JobDetailView />
            </PhoneFrame>
          </div>
          {/* Job Apply */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>申请报名</ScreenLabel>
            <PhoneFrame>
              <JobApplyView />
            </PhoneFrame>
          </div>
          {/* Job Success */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>申请成功</ScreenLabel>
            <PhoneFrame>
              <JobSuccessView />
            </PhoneFrame>
          </div>
          {/* My Applications */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>我的申请</ScreenLabel>
            <PhoneFrame>
              <JobMyApplicationsView />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* Section 7: Market screens */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            棚友集市
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Market List */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>集市列表</ScreenLabel>
            <PhoneFrame>
              <MarketListView />
            </PhoneFrame>
          </div>
          {/* Market Detail */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>集市详情</ScreenLabel>
            <PhoneFrame>
              <MarketDetailView />
            </PhoneFrame>
          </div>
          {/* Market Apply */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>摊主报名</ScreenLabel>
            <PhoneFrame>
              <MarketApplyView />
            </PhoneFrame>
          </div>
          {/* Market Success */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>报名成功</ScreenLabel>
            <PhoneFrame>
              <MarketSuccessView />
            </PhoneFrame>
          </div>
          {/* My Booths */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>我的摊位</ScreenLabel>
            <PhoneFrame>
              <MarketMyBoothsView />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* Section 8: Feedback screens */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            市民留言
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Feedback List */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>我的留言</ScreenLabel>
            <PhoneFrame>
              <FeedbackListView />
            </PhoneFrame>
          </div>
          {/* Feedback Submit */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>我要留言</ScreenLabel>
            <PhoneFrame>
              <FeedbackSubmitView />
            </PhoneFrame>
          </div>
          {/* Feedback Detail */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>留言详情</ScreenLabel>
            <PhoneFrame>
              <FeedbackDetailView />
            </PhoneFrame>
          </div>
          {/* Feedback Success */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>提交成功</ScreenLabel>
            <PhoneFrame>
              <FeedbackSuccessView />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* Section 9: Profile */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            个人中心
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>我的</ScreenLabel>
            <PhoneFrame>
              <ProfileView />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* Section 10: Venue Booking */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            场地预约
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Venue Map */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>场地分布图</ScreenLabel>
            <PhoneFrame>
              <VenueMapView />
            </PhoneFrame>
          </div>
          {/* Venue Detail */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>场地详情</ScreenLabel>
            <PhoneFrame>
              <VenueDetailView />
            </PhoneFrame>
          </div>
          {/* Booking Success */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>预约成功</ScreenLabel>
            <PhoneFrame>
              <VenueBookingSuccessView />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* Section 11: AI Chat */}
      <section className="mb-16">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            AI智能助手
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>AI助手(政务)</ScreenLabel>
            <PhoneFrame>
              <AIChatView />
            </PhoneFrame>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>AI助手(场地预约)</ScreenLabel>
            <PhoneFrame>
              <AISportsChatView />
            </PhoneFrame>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>AI助手(活动报名)</ScreenLabel>
            <PhoneFrame>
              <AIActivityChatView />
            </PhoneFrame>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>AI助手(社区食堂)</ScreenLabel>
            <PhoneFrame>
              <AICanteenChatView />
            </PhoneFrame>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>AI助手(托育服务)</ScreenLabel>
            <PhoneFrame>
              <AIChildcareChatView />
            </PhoneFrame>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>AI助手(图书借阅)</ScreenLabel>
            <PhoneFrame>
              <AILibraryChatView />
            </PhoneFrame>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>AI助手(政务服务)</ScreenLabel>
            <PhoneFrame>
              <AIGovernmentChatView />
            </PhoneFrame>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>AI助手(城市服务)</ScreenLabel>
            <PhoneFrame>
              <AIServicesChatView />
            </PhoneFrame>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>AI助手(行街指南)</ScreenLabel>
            <PhoneFrame>
              <AIExploreChatView />
            </PhoneFrame>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>AI助手(教育补贴)</ScreenLabel>
            <PhoneFrame>
              <AIEducationChatView />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* Section 12: Community Forum */}
      <section>
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-foreground inline-flex items-center gap-2">
            <span className="w-8 h-0.5 rounded-full bg-primary" />
            社区论坛与分享
            <span className="w-8 h-0.5 rounded-full bg-primary" />
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Screen 6: Recommend - Masonry */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>推荐</ScreenLabel>
            <PhoneFrame>
              <AppHeader />
              <CommunityHeader activeTab="recommend" />
              <RecommendView />
            </PhoneFrame>
          </div>

          {/* Screen 7: Exchange */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>闲置物品交换</ScreenLabel>
            <PhoneFrame>
              <AppHeader />
              <CommunityHeader activeTab="exchange" />
              <ExchangeView />
            </PhoneFrame>
          </div>

          {/* Screen 8: Good Stuff Sharing */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>好物分享</ScreenLabel>
            <PhoneFrame>
              <AppHeader />
              <CommunityHeader activeTab="good-stuff" />
              <GoodStuffView />
            </PhoneFrame>
          </div>

          {/* Screen 9: Products */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>优秀产品</ScreenLabel>
            <PhoneFrame>
              <AppHeader />
              <CommunityHeader activeTab="products" />
              <ProductsView />
            </PhoneFrame>
          </div>

          {/* Screen 10: Craft Club */}
          <div className="flex flex-col items-center gap-3">
            <ScreenLabel>社区手工工社</ScreenLabel>
            <PhoneFrame>
              <AppHeader />
              <CommunityHeader activeTab="craft" />
              <CraftView />
            </PhoneFrame>
          </div>
        </div>
      </section>
    </main>
  )
}

function ScreenLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium text-muted-foreground px-3 py-1 rounded-full bg-card border border-border shadow-sm">
      {children}
    </span>
  )
}
