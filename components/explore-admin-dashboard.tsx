"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  Bell,
  ChevronDown,
  Map,
  MapPin,
  MessageSquare,
  CheckCircle,
  BarChart3,
  Plus,
  Filter,
  Download,
  Eye,
  Pencil,
  Trash2,
  LayoutDashboard,
  Settings,
  Menu as MenuIcon,
  Upload,
  Move,
  X,
  Check,
  Clock,
  XCircle,
  RefreshCw,
  TrendingUp,
  Users,
  ThumbsUp,
  ArrowUpRight,
  Star,
  Camera,
  LogOut,
} from "lucide-react"
import { placesData, commentsData, checkinRecordsData, categoryConfig, type Place, type Comment, type PlaceCategory } from "@/lib/explore-data"

/* ─── Sidebar nav items ─── */
const navItems = [
  { icon: LayoutDashboard, label: "数据概览", id: "dashboard" },
  { icon: Map, label: "地图管理", id: "map" },
  { icon: MapPin, label: "点位管理", id: "places" },
  { icon: MessageSquare, label: "评论管理", id: "comments" },
  { icon: CheckCircle, label: "打卡记录", id: "checkins" },
  { icon: BarChart3, label: "数据统计", id: "stats" },
  { icon: Settings, label: "系统设置", id: "settings" },
]

/* ─── Stats data ─── */
const stats = [
  {
    label: "总打卡次数",
    value: "3,456",
    change: "+12.5%",
    icon: CheckCircle,
    color: "text-primary",
    bgColor: "bg-primary/5",
  },
  {
    label: "总评论数",
    value: "289",
    change: "+8.3%",
    icon: MessageSquare,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "活跃用户",
    value: "1,024",
    change: "+15.2%",
    icon: Users,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    label: "点位数量",
    value: "9",
    change: "+2",
    icon: MapPin,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
]

/* ─── Comment status badge ─── */
function CommentStatusBadge({ status }: { status: Comment["status"] }) {
  const config = {
    pending: { bg: "bg-amber-50", text: "text-amber-700", icon: Clock, label: "待审核" },
    approved: { bg: "bg-emerald-50", text: "text-emerald-700", icon: Check, label: "已通过" },
    rejected: { bg: "bg-red-50", text: "text-red-700", icon: XCircle, label: "已拒绝" },
  }
  const c = config[status]
  const Icon = c.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <Icon className="w-3 h-3" />
      {c.label}
    </span>
  )
}

/* ─── Place status badge ─── */
function PlaceStatusBadge({ isOnline, hasMarker }: { isOnline: boolean; hasMarker: boolean }) {
  if (!isOnline) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        已下线
      </span>
    )
  }
  if (!hasMarker) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
        未落点
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
      已上线
    </span>
  )
}

/* ─── Dashboard Panel ─── */
function DashboardPanel() {
  const topPlaces = [...placesData].sort((a, b) => b.checkins - a.checkins).slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[11px] font-medium text-emerald-600">{s.change}</span>
                    <span className="text-[10px] text-gray-400">较上周</span>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-xl ${s.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Top places */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">热门打卡排行</h3>
            <button className="text-xs text-primary hover:underline">查看全部</button>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {topPlaces.map((place, i) => (
                <div key={place.id} className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      i < 3 ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image
                      src={place.coverImage}
                      alt={place.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{place.name}</p>
                    <p className="text-[10px] text-gray-500">{place.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-900">{place.checkins}</p>
                    <p className="text-[10px] text-gray-500">次打卡</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">待处理事项</h3>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-gray-700">待审核评论</span>
              </div>
              <span className="text-sm font-semibold text-amber-600">
                {commentsData.filter(c => c.status === "pending").length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">未落点点位</span>
              </div>
              <span className="text-sm font-semibold text-blue-600">
                {placesData.filter(p => !p.hasMarker).length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-gray-700">今日新增打卡</span>
              </div>
              <span className="text-sm font-semibold text-emerald-600">28</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Map Management Panel ─── */
function MapManagementPanel() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [isPlacing, setIsPlacing] = useState(false)

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Map area */}
      <div className="col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">地图底图</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-xs text-gray-600 hover:bg-gray-100 transition-colors">
              <Upload className="w-3.5 h-3.5" />
              更换底图
            </button>
          </div>
        </div>
        <div className="relative aspect-[4/3] bg-gray-50">
          <Image
            src="/images/community-map.jpg"
            alt="社区地图"
            fill
            className="object-cover"
          />
          
          {/* Existing markers */}
          {placesData.filter(p => p.hasMarker && p.markerPosition).map(place => (
            <div
              key={place.id}
              className={`absolute w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                selectedPlace?.id === place.id 
                  ? "bg-primary ring-2 ring-primary/30 scale-125" 
                  : "bg-white shadow border border-gray-200 hover:scale-110"
              }`}
              style={{
                left: `${place.markerPosition!.x}%`,
                top: `${place.markerPosition!.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => setSelectedPlace(place)}
            >
              <MapPin className={`w-3.5 h-3.5 ${selectedPlace?.id === place.id ? "text-white" : "text-primary"}`} />
            </div>
          ))}
          
          {/* Placing mode crosshair */}
          {isPlacing && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-8 h-8 border-2 border-primary rounded-full flex items-center justify-center bg-primary/10">
                <Plus className="w-4 h-4 text-primary" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-primary/30" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-primary/30" />
              </div>
            </div>
          )}
        </div>
        
        {/* Instructions */}
        <div className="px-5 py-3 bg-gray-50 text-xs text-gray-500">
          {isPlacing 
            ? "点击地图上的目标位置进行落点，按 ESC 取消"
            : "选择右侧列表中的点位，然后点击「在地图上落点」"
          }
        </div>
      </div>

      {/* Place list */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">点位列表</h3>
          <span className="text-xs text-gray-500">{placesData.length} 个点位</span>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          {placesData.map(place => (
            <div
              key={place.id}
              className={`flex items-center gap-3 px-4 py-3 border-b border-gray-50 cursor-pointer transition-colors ${
                selectedPlace?.id === place.id ? "bg-primary/5" : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedPlace(place)}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={place.coverImage}
                  alt={place.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{place.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    place.hasMarker 
                      ? "bg-emerald-50 text-emerald-700" 
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {place.hasMarker ? "已落点" : "未落点"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Action buttons */}
        {selectedPlace && (
          <div className="p-4 border-t border-gray-100 space-y-2">
            <button 
              onClick={() => setIsPlacing(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Move className="w-4 h-4" />
              {selectedPlace.hasMarker ? "调整落点" : "在地图上落点"}
            </button>
            {selectedPlace.hasMarker && (
              <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
                删除落点
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Place Management Panel ─── */
function PlaceManagementPanel() {
  const [filterCategory, setFilterCategory] = useState<PlaceCategory | "全部">("全部")
  
  const filteredPlaces = filterCategory === "全部" 
    ? placesData 
    : placesData.filter(p => p.category === filterCategory)

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900">点位管理</h3>
        <div className="flex items-center gap-2">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as PlaceCategory | "全部")}
            className="px-3 py-1.5 rounded-lg bg-gray-50 text-xs text-gray-600 border-0 outline-none"
          >
            <option value="全部">全部分类</option>
            {(Object.keys(categoryConfig) as PlaceCategory[]).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            新增点位
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">点位名称</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">分类</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">推荐</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">打卡</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">评论</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlaces.map((place) => (
              <tr key={place.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={place.coverImage}
                        alt={place.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{place.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${categoryConfig[place.category].bgColor} ${categoryConfig[place.category].color}`}>
                    {place.category}
                  </span>
                </td>
                <td className="px-5 py-3">
                  {place.isRecommended ? (
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ) : (
                    <Star className="w-4 h-4 text-gray-300" />
                  )}
                </td>
                <td className="px-5 py-3 text-sm text-gray-600">{place.checkins}</td>
                <td className="px-5 py-3 text-sm text-gray-600">{place.comments}</td>
                <td className="px-5 py-3">
                  <PlaceStatusBadge isOnline={place.isOnline} hasMarker={place.hasMarker} />
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded hover:bg-gray-100 transition-colors" title="查看">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-gray-100 transition-colors" title="编辑">
                      <Pencil className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-gray-100 transition-colors" title="落点">
                      <MapPin className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-red-50 transition-colors" title="删除">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
        <span className="text-[11px] text-gray-500">共 {filteredPlaces.length} 个点位</span>
        <div className="flex items-center gap-1.5">
          <button className="px-2.5 py-1 rounded-md text-[11px] bg-primary text-white font-medium">1</button>
        </div>
      </div>
    </div>
  )
}

/* ─── Comment Management Panel ─── */
function CommentManagementPanel() {
  const [filterStatus, setFilterStatus] = useState<Comment["status"] | "all">("all")
  
  const filteredComments = filterStatus === "all" 
    ? commentsData 
    : commentsData.filter(c => c.status === filterStatus)

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900">评论管理</h3>
        <div className="flex items-center gap-2">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Comment["status"] | "all")}
            className="px-3 py-1.5 rounded-lg bg-gray-50 text-xs text-gray-600 border-0 outline-none"
          >
            <option value="all">全部状态</option>
            <option value="pending">待审核</option>
            <option value="approved">已通过</option>
            <option value="rejected">已拒绝</option>
          </select>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-xs text-gray-600 hover:bg-gray-100 transition-colors">
            <Download className="w-3.5 h-3.5" />
            导出
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">用户</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">评论内容</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">所属点位</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">时间</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">状态</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.map((comment) => {
              const place = placesData.find(p => p.id === comment.placeId)
              return (
                <tr key={comment.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <span className="text-sm font-medium text-gray-900">{comment.userName}</span>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-sm text-gray-600 max-w-[300px] truncate">{comment.content}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{place?.name || "-"}</td>
                  <td className="px-5 py-3 text-xs text-gray-500">{comment.createdAt}</td>
                  <td className="px-5 py-3">
                    <CommentStatusBadge status={comment.status} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      {comment.status === "pending" && (
                        <>
                          <button className="p-1.5 rounded hover:bg-emerald-50 transition-colors" title="通过">
                            <Check className="w-4 h-4 text-emerald-600" />
                          </button>
                          <button className="p-1.5 rounded hover:bg-red-50 transition-colors" title="拒绝">
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </>
                      )}
                      {comment.status === "approved" && (
                        <button className="p-1.5 rounded hover:bg-gray-100 transition-colors" title="撤回">
                          <RefreshCw className="w-4 h-4 text-gray-500" />
                        </button>
                      )}
                      {comment.status === "rejected" && (
                        <button className="p-1.5 rounded hover:bg-gray-100 transition-colors" title="重新审核">
                          <RefreshCw className="w-4 h-4 text-gray-500" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
        <span className="text-[11px] text-gray-500">共 {filteredComments.length} 条评论</span>
      </div>
    </div>
  )
}

/* ─── Checkin Records Panel ─── */
function CheckinRecordsPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-bold text-gray-900">打卡记录</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-xs text-gray-600 hover:bg-gray-100 transition-colors">
            <Filter className="w-3.5 h-3.5" />
            筛选
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-xs text-gray-600 hover:bg-gray-100 transition-colors">
            <Download className="w-3.5 h-3.5" />
            导出
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">用户昵称</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">所属点位</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">打卡时间</th>
              <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">打卡照片</th>
            </tr>
          </thead>
          <tbody>
            {checkinRecordsData.map((record) => (
              <tr key={record.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3">
                  <span className="text-sm font-medium text-gray-900">{record.userName}</span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-600">{record.placeName}</td>
                <td className="px-5 py-3 text-xs text-gray-500">{record.checkinTime}</td>
                <td className="px-5 py-3">
                  {record.photo ? (
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <Camera className="w-3.5 h-3.5" />
                      有照片
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">无</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
        <span className="text-[11px] text-gray-500">共 {checkinRecordsData.length} 条记录</span>
      </div>
    </div>
  )
}

/* ─── Main Dashboard ─── */
export function ExploreAdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState("dashboard")

  const renderPanel = () => {
    switch (activeNav) {
      case "dashboard":
        return <DashboardPanel />
      case "map":
        return <MapManagementPanel />
      case "places":
        return <PlaceManagementPanel />
      case "comments":
        return <CommentManagementPanel />
      case "checkins":
        return <CheckinRecordsPanel />
      default:
        return <DashboardPanel />
    }
  }

  return (
    <div className="flex h-[900px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ${
          sidebarCollapsed ? "w-[68px]" : "w-[220px]"
        }`}
      >
        {/* Logo area */}
        <div className="flex items-center gap-2.5 px-4 h-16 border-b border-gray-100 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Map className="w-4.5 h-4.5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-gray-900 truncate">行街指南</h2>
              <p className="text-[10px] text-gray-500 truncate">管理后台</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeNav === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-primary/5 text-primary font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } ${sidebarCollapsed ? "justify-center px-0" : ""}`}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="px-2 py-3 border-t border-gray-100">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <MenuIcon className="w-4 h-4" />
            {!sidebarCollapsed && <span>收起侧栏</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 h-16 bg-white border-b border-gray-100 flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {navItems.find(n => n.id === activeNav)?.label || "数据概览"}
            </h1>
            <p className="text-xs text-gray-500">金岭社区</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-56">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索点位、评论..."
                className="bg-transparent text-xs text-gray-900 placeholder:text-gray-400 outline-none w-full"
              />
            </div>
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            {/* Admin avatar */}
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                管
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-900">管理员</p>
                <p className="text-[10px] text-gray-500">金岭社区</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderPanel()}
        </main>
      </div>
    </div>
  )
}
