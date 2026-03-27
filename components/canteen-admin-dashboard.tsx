"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  Bell,
  ChevronDown,
  ShoppingCart,
  Users,
  Store,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Plus,
  Filter,
  Download,
  Eye,
  Pencil,
  Trash2,
  UtensilsCrossed,
  Clock,
  CheckCircle2,
  XCircle,
  ChefHat,
  LayoutDashboard,
  FileText,
  Settings,
  MessageSquare,
  BarChart3,
  Menu as MenuIcon,
} from "lucide-react"

/* ─── Sidebar nav items ─── */
const navItems = [
  { icon: LayoutDashboard, label: "数据概览", active: true },
  { icon: ShoppingCart, label: "订单管理", active: false },
  { icon: ChefHat, label: "菜品管理", active: false },
  { icon: Store, label: "食堂管理", active: false },
  { icon: Users, label: "长者档案", active: false },
  { icon: BarChart3, label: "营收报表", active: false },
  { icon: MessageSquare, label: "评价管理", active: false },
  { icon: FileText, label: "公告发布", active: false },
  { icon: Settings, label: "系统设置", active: false },
]

/* ─── Stats ─── */
const stats = [
  {
    label: "今日订单",
    value: "286",
    change: "+12.5%",
    up: true,
    icon: ShoppingCart,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "今日营收",
    value: "¥3,842",
    change: "+8.3%",
    up: true,
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "活跃长者",
    value: "1,024",
    change: "+3.1%",
    up: true,
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "食堂数量",
    value: "8",
    change: "+1",
    up: true,
    icon: Store,
    color: "bg-amber-50 text-amber-600",
  },
]

/* ─── Recent orders ─── */
const recentOrders = [
  {
    id: "DD20240510001",
    customer: "张建国",
    age: 65,
    items: "红烧狮子头套餐 x1, 清炒时蔬 x1",
    total: "¥14.0",
    mode: "堂食",
    time: "12:05",
    status: "已完成",
  },
  {
    id: "DD20240510002",
    customer: "李秀英",
    age: 72,
    items: "香菇滑鸡饭 x1, 玉米排骨汤 x1",
    total: "¥15.0",
    mode: "堂食",
    time: "12:12",
    status: "已完成",
  },
  {
    id: "DD20240510003",
    customer: "王美兰",
    age: 68,
    items: "土豆炖牛腩 x1, 五常大米饭 x1",
    total: "¥19.0",
    mode: "自提",
    time: "12:18",
    status: "制作中",
  },
  {
    id: "DD20240510004",
    customer: "陈志明",
    age: 70,
    items: "红烧狮子头套餐 x1, 玉米排骨汤 x1",
    total: "¥17.0",
    mode: "外送",
    time: "12:25",
    status: "待接单",
  },
  {
    id: "DD20240510005",
    customer: "赵桂芳",
    age: 75,
    items: "清炒时蔬 x2, 五常大米饭 x2",
    total: "¥12.0",
    mode: "堂食",
    time: "12:30",
    status: "已取消",
  },
]

/* ─── Popular dishes ─── */
const popularDishes = [
  { name: "红烧狮子头", sales: 200, image: "/images/food-braised-meatball.jpg", price: "¥10" },
  { name: "土豆炖牛腩", sales: 150, image: "/images/food-potato-beef.jpg", price: "¥18" },
  { name: "清炒时蔬", sales: 300, image: "/images/food-vegetables.jpg", price: "¥5" },
  { name: "玉米排骨汤", sales: 120, image: "/images/food-corn-soup.jpg", price: "¥7" },
  { name: "五常大米饭", sales: 500, image: "/images/food-rice.jpg", price: "¥1" },
]

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; icon: typeof CheckCircle2 }> = {
    已完成: { bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle2 },
    制作中: { bg: "bg-amber-50", text: "text-amber-700", icon: Clock },
    待接单: { bg: "bg-blue-50", text: "text-blue-700", icon: UtensilsCrossed },
    已取消: { bg: "bg-red-50", text: "text-red-700", icon: XCircle },
  }
  const c = config[status] || config["已完成"]
  const Icon = c.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  )
}

export function CanteenAdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-[900px] bg-background rounded-2xl overflow-hidden border border-border shadow-xl">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-card border-r border-border transition-all duration-300 ${
          sidebarCollapsed ? "w-[68px]" : "w-[220px]"
        }`}
      >
        {/* Logo area */}
        <div className="flex items-center gap-2.5 px-4 h-16 border-b border-border flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <UtensilsCrossed className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-foreground truncate">智慧食堂</h2>
              <p className="text-[10px] text-muted-foreground truncate">管理后台</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  item.active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                } ${sidebarCollapsed ? "justify-center px-0" : ""}`}
              >
                <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="px-2 py-3 border-t border-border">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:bg-muted/60 transition-colors"
          >
            <MenuIcon className="w-4 h-4" />
            {!sidebarCollapsed && <span>收起侧栏</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 h-16 bg-card border-b border-border flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-foreground">数据概览</h1>
            <p className="text-xs text-muted-foreground">2024年5月10日 星期五</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2 w-56">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索订单、菜品..."
                className="bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none w-full"
              />
            </div>
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-muted/60 transition-colors" aria-label="通知">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            {/* Admin avatar */}
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                管
              </div>
              <div className="text-right">
                <p className="text-xs font-medium text-foreground">管理员</p>
                <p className="text-[10px] text-muted-foreground">金岭社区</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.label}
                  className="bg-card rounded-xl p-5 border border-border/50 shadow-sm flex items-start justify-between"
                >
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      {s.up ? (
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                      )}
                      <span className={`text-[11px] font-medium ${s.up ? "text-emerald-600" : "text-red-600"}`}>
                        {s.change}
                      </span>
                      <span className="text-[10px] text-muted-foreground">较昨日</span>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Two column: Orders table & Popular dishes */}
          <div className="grid grid-cols-3 gap-6">
            {/* Orders table - 2 cols */}
            <div className="col-span-2 bg-card rounded-xl border border-border/50 shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
                <h3 className="text-sm font-bold text-foreground">最近订单</h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 text-xs text-muted-foreground hover:bg-muted transition-colors">
                    <Filter className="w-3.5 h-3.5" />
                    筛选
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 text-xs text-muted-foreground hover:bg-muted transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    导出
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        订单号
                      </th>
                      <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        顾客
                      </th>
                      <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        菜品
                      </th>
                      <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        金额
                      </th>
                      <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        方式
                      </th>
                      <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        状态
                      </th>
                      <th className="px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-3 text-xs font-mono text-foreground">{order.id.slice(-6)}</td>
                        <td className="px-5 py-3">
                          <div>
                            <span className="text-xs font-medium text-foreground">{order.customer}</span>
                            <span className="text-[10px] text-muted-foreground ml-1">{order.age}岁</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-xs text-muted-foreground max-w-[180px] truncate">
                          {order.items}
                        </td>
                        <td className="px-5 py-3 text-xs font-semibold text-foreground">{order.total}</td>
                        <td className="px-5 py-3">
                          <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-md bg-muted/60">
                            {order.mode}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1 rounded hover:bg-muted transition-colors" aria-label="查看">
                              <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                            <button className="p-1 rounded hover:bg-muted transition-colors" aria-label="编辑">
                              <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between px-5 py-3 border-t border-border/30">
                <span className="text-[11px] text-muted-foreground">共 286 条订单</span>
                <div className="flex items-center gap-1.5">
                  <button className="px-2.5 py-1 rounded-md text-[11px] bg-primary text-primary-foreground font-medium">1</button>
                  <button className="px-2.5 py-1 rounded-md text-[11px] text-muted-foreground hover:bg-muted transition-colors">2</button>
                  <button className="px-2.5 py-1 rounded-md text-[11px] text-muted-foreground hover:bg-muted transition-colors">3</button>
                  <span className="text-[11px] text-muted-foreground">...</span>
                  <button className="px-2.5 py-1 rounded-md text-[11px] text-muted-foreground hover:bg-muted transition-colors">29</button>
                </div>
              </div>
            </div>

            {/* Popular dishes - 1 col */}
            <div className="bg-card rounded-xl border border-border/50 shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
                <h3 className="text-sm font-bold text-foreground">热销菜品</h3>
                <button className="p-1 rounded hover:bg-muted transition-colors" aria-label="更多">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <div className="p-4 space-y-3">
                {popularDishes.map((dish, i) => (
                  <div key={dish.name} className="flex items-center gap-3">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                        i < 3
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{dish.name}</p>
                      <p className="text-[10px] text-muted-foreground">月售 {dish.sales} 份</p>
                    </div>
                    <span className="text-xs font-semibold text-primary flex-shrink-0">{dish.price}</span>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="px-4 py-3 border-t border-border/30">
                <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-dashed border-primary/30 text-xs font-medium text-primary hover:bg-primary/5 transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  添加新菜品
                </button>
              </div>
            </div>
          </div>

          {/* Quick action bar */}
          <div className="bg-card rounded-xl border border-border/50 shadow-sm p-5">
            <h3 className="text-sm font-bold text-foreground mb-4">快捷操作</h3>
            <div className="grid grid-cols-5 gap-3">
              {[
                { icon: Plus, label: "新增菜品", color: "bg-primary/10 text-primary" },
                { icon: Store, label: "食堂管理", color: "bg-emerald-50 text-emerald-600" },
                { icon: Users, label: "长者录入", color: "bg-blue-50 text-blue-600" },
                { icon: FileText, label: "发布公告", color: "bg-amber-50 text-amber-600" },
                { icon: BarChart3, label: "生成报表", color: "bg-purple-50 text-purple-600" },
              ].map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.label}
                    className="flex flex-col items-center gap-2 py-4 rounded-xl hover:bg-muted/40 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{action.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
