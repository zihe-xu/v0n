"use client"

import { Search, MapPin, Users, Calendar, Briefcase, ChevronRight, Filter } from "lucide-react"

const jobs = [
  {
    id: 1,
    title: "社区招工",
    count: 2,
    position: "社区专职工作者",
    publishDate: "2025-01-10",
    location: "金岭社区社区服务站",
    status: "hot",
    salary: "4000-5500",
    requirements: ["大专及以上", "35岁以下", "本地户籍优先"],
  },
  {
    id: 2,
    title: "社区招工",
    count: 2,
    position: "网格员",
    publishDate: "2025-01-10",
    location: "金岭社区社区服务站",
    status: "urgent",
    salary: "3500-4500",
    requirements: ["高中及以上", "40岁以下", "熟悉社区情况"],
  },
  {
    id: 3,
    title: "社区招工",
    count: 1,
    position: "党群服务中心前台",
    publishDate: "2025-01-08",
    location: "金岭社区党群服务中心",
    status: "normal",
    salary: "3000-4000",
    requirements: ["高中及以上", "形象气质佳", "普通话标准"],
  },
  {
    id: 4,
    title: "社区招工",
    count: 3,
    position: "社区志愿者协调员",
    publishDate: "2025-01-05",
    location: "金岭社区志愿服务站",
    status: "normal",
    salary: "3500-4500",
    requirements: ["大专及以上", "有志愿服务经验", "沟通能力强"],
  },
]

const filterTabs = ["全部", "网格员", "社工", "志愿者", "其他"]

export function JobListView() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-50/60 to-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="w-8" />
        <h1 className="text-lg font-semibold text-foreground">社区招工</h1>
        <button className="p-1 rounded-full hover:bg-muted transition-colors" aria-label="搜索">
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Hero Section */}
      <div className="px-4 pt-4 pb-3">
        <div className="bg-gradient-to-r from-primary to-orange-500 rounded-2xl p-4 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-4 -mb-4" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-5 h-5" />
              <span className="font-bold text-lg">社区就业服务</span>
            </div>
            <p className="text-sm text-white/90 mb-3">家门口的好工作，服务社区暖人心</p>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                <span className="font-semibold text-base">8</span>
                <span>在招岗位</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                <span className="font-semibold text-base">126</span>
                <span>已入职</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {filterTabs.map((tab, index) => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                index === 0
                  ? "bg-primary text-white"
                  : "bg-card text-muted-foreground border border-border hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="p-1.5 rounded-full bg-card border border-border hover:bg-muted transition-colors ml-auto flex-shrink-0">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Job List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 relative overflow-hidden"
          >
            {/* Status badge */}
            {job.status !== "normal" && (
              <div
                className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-white ${
                  job.status === "hot" ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-gradient-to-r from-primary to-amber-500"
                }`}
              >
                {job.status === "hot" ? "热招" : "急聘"}
              </div>
            )}

            {/* Title row */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-foreground">{job.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    人数: {job.count}
                  </span>
                  <span className="text-primary font-bold text-sm">{job.salary}元/月</span>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-gradient-to-r from-primary to-orange-500 text-white text-sm font-semibold rounded-full shadow-sm hover:shadow-md transition-shadow">
                报名
              </button>
            </div>

            {/* Position */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground">岗位:</span>
              <span className="text-sm font-medium text-primary">{job.position}</span>
            </div>

            {/* Requirements */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {job.requirements.map((req, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100"
                >
                  {req}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary/70" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{job.publishDate}发布</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
