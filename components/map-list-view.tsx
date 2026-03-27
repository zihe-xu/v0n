"use client"

import { useState } from "react"
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  ChevronRight,
  Search,
  Building2,
  Heart,
  Stethoscope,
  GraduationCap,
  Star,
  Dumbbell,
  ShoppingBag,
  Bus,
  Factory,
  HandHeart,
  Car,
  Zap,
  BusFront,
  Battery,
  ChevronDown,
  List,
  LayoutGrid,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface Category {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

interface SubCategory {
  id: string
  label: string
  icon: React.ReactNode
  parentId: string
}

interface Location {
  id: string
  name: string
  category: string
  subCategory: string
  address: string
  distance: string
  phone?: string
  hours?: string
  tags?: string[]
  rating?: number
}

const categories: Category[] = [
  { id: "gov", label: "政务", icon: <Building2 className="w-4 h-4" />, color: "text-amber-600", bgColor: "bg-amber-50" },
  { id: "elderly", label: "养老", icon: <Heart className="w-4 h-4" />, color: "text-rose-500", bgColor: "bg-rose-50" },
  { id: "medical", label: "医疗", icon: <Stethoscope className="w-4 h-4" />, color: "text-emerald-500", bgColor: "bg-emerald-50" },
  { id: "education", label: "教育", icon: <GraduationCap className="w-4 h-4" />, color: "text-blue-500", bgColor: "bg-blue-50" },
  { id: "party", label: "党支部站", icon: <Star className="w-4 h-4" />, color: "text-red-500", bgColor: "bg-red-50" },
  { id: "sports", label: "文体", icon: <Dumbbell className="w-4 h-4" />, color: "text-purple-500", bgColor: "bg-purple-50" },
  { id: "life", label: "生活", icon: <ShoppingBag className="w-4 h-4" />, color: "text-orange-500", bgColor: "bg-orange-50" },
  { id: "transport", label: "出行", icon: <Bus className="w-4 h-4" />, color: "text-cyan-500", bgColor: "bg-cyan-50" },
  { id: "factory", label: "厂区", icon: <Factory className="w-4 h-4" />, color: "text-slate-500", bgColor: "bg-slate-50" },
  { id: "charity", label: "社会关怀", icon: <HandHeart className="w-4 h-4" />, color: "text-pink-500", bgColor: "bg-pink-50" },
]

const subCategories: SubCategory[] = [
  { id: "parking", label: "停车场", icon: <Car className="w-4 h-4" />, parentId: "transport" },
  { id: "charging", label: "电警站", icon: <Zap className="w-4 h-4" />, parentId: "transport" },
  { id: "bus", label: "公交站", icon: <BusFront className="w-4 h-4" />, parentId: "transport" },
  { id: "ev", label: "充电桩", icon: <Battery className="w-4 h-4" />, parentId: "transport" },
]

const locations: Location[] = [
  {
    id: "1",
    name: "金岭社区党群服务中心",
    category: "party",
    subCategory: "service",
    address: "罗湖区布吉路1038号",
    distance: "150m",
    phone: "0755-25666888",
    hours: "周一至周五 9:00-18:00",
    tags: ["党建服务", "便民服务"],
    rating: 4.9,
  },
  {
    id: "2",
    name: "翠竹大厦停车场",
    category: "transport",
    subCategory: "parking",
    address: "罗湖区布心路1036号",
    distance: "400m",
    hours: "24小时营业",
    tags: ["地下停车", "新能源充电"],
  },
  {
    id: "3",
    name: "金岭社区卫生服务中心",
    category: "medical",
    subCategory: "clinic",
    address: "罗湖区金岭路88号",
    distance: "320m",
    phone: "0755-25688899",
    hours: "周一至周日 8:00-21:00",
    tags: ["全科门诊", "中医理疗"],
    rating: 4.7,
  },
  {
    id: "4",
    name: "金岭长者服务站",
    category: "elderly",
    subCategory: "service",
    address: "罗湖区翠竹路156号",
    distance: "280m",
    phone: "0755-25677766",
    hours: "周一至周六 8:30-17:30",
    tags: ["日间照料", "康复理疗"],
    rating: 4.8,
  },
  {
    id: "5",
    name: "金岭社区幼儿园",
    category: "education",
    subCategory: "kindergarten",
    address: "罗湖区布心路1028号",
    distance: "450m",
    phone: "0755-25699988",
    hours: "周一至周五 7:30-18:00",
    tags: ["公立普惠", "双语教学"],
    rating: 4.6,
  },
  {
    id: "6",
    name: "牛庄路居委会",
    category: "gov",
    subCategory: "committee",
    address: "罗湖区牛庄路32号",
    distance: "180m",
    phone: "0755-25655566",
    hours: "周一至周五 9:00-12:00 14:00-18:00",
    tags: ["居民服务", "证明开具"],
  },
  {
    id: "7",
    name: "新昌居委会",
    category: "gov",
    subCategory: "committee",
    address: "罗湖区新昌街18号",
    distance: "350m",
    phone: "0755-25644455",
    hours: "周一至周五 9:00-12:00 14:00-18:00",
    tags: ["居民服务"],
  },
  {
    id: "8",
    name: "金岭文体活动中心",
    category: "sports",
    subCategory: "center",
    address: "罗湖区金岭路66号",
    distance: "520m",
    phone: "0755-25633344",
    hours: "周一至周日 6:00-22:00",
    tags: ["健身房", "羽毛球", "乒乓球"],
    rating: 4.5,
  },
]

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function CategoryTabs({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex gap-1 px-3 py-2 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl min-w-[52px] transition-all ${
            selected === cat.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : `${cat.bgColor} ${cat.color}`
          }`}
        >
          <div className={selected === cat.id ? "text-primary-foreground" : cat.color}>
            {cat.icon}
          </div>
          <span className="text-[10px] font-medium whitespace-nowrap">{cat.label}</span>
        </button>
      ))}
    </div>
  )
}

function SubCategoryBar({ parentId }: { parentId: string }) {
  const [selected, setSelected] = useState<string | null>(null)
  const subs = subCategories.filter((s) => s.parentId === parentId)

  if (subs.length === 0) return null

  return (
    <div className="flex gap-2 px-3 py-2 border-b border-border/50">
      {subs.map((sub) => (
        <button
          key={sub.id}
          onClick={() => setSelected(selected === sub.id ? null : sub.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            selected === sub.id
              ? "bg-primary/10 text-primary border border-primary/30"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {sub.icon}
          {sub.label}
        </button>
      ))}
    </div>
  )
}

function SearchBar() {
  return (
    <div className="px-3 py-2">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/60 border border-border/50">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="搜索地点、地址或关键词"
          className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/60 outline-none"
        />
      </div>
    </div>
  )
}

function FilterBar() {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-border/50">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">分类</span>
        <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-muted/60 text-xs font-medium text-foreground">
          距离最近
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg bg-primary/10 text-primary">
          <List className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted/60">
          <LayoutGrid className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function LocationCard({ location }: { location: Location }) {
  const category = categories.find((c) => c.id === location.category)

  return (
    <div className="mx-3 mb-3 p-3 rounded-xl bg-card border border-border/50 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-foreground">{location.name}</h3>
            {location.rating && (
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-[10px] font-semibold">{location.rating}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 text-primary" />
            <span className="truncate">{location.address}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${category?.bgColor} ${category?.color}`}>
            {category?.label}
          </span>
          <span className="text-xs font-semibold text-primary">{location.distance}</span>
        </div>
      </div>

      {/* Tags */}
      {location.tags && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {location.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="flex items-center gap-4 text-[11px] text-muted-foreground mb-3">
        {location.hours && (
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span className="truncate">{location.hours}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {location.phone && (
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-medium hover:bg-emerald-100 transition-colors">
            <Phone className="w-3.5 h-3.5" />
            电话咨询
          </button>
        )}
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
          <Navigation className="w-3.5 h-3.5" />
          导航前往
        </button>
        <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main View                                                          */
/* ------------------------------------------------------------------ */

export function MapListView() {
  const [selectedCategory, setSelectedCategory] = useState("transport")

  const filteredLocations = locations.filter(
    (loc) => loc.category === selectedCategory
  )

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-primary to-orange-500 text-primary-foreground">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span className="text-base font-bold">掌上地图</span>
          </div>
          <span className="text-xs opacity-80">金岭社区</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[52px] z-10 bg-card border-b border-border/50 shadow-sm">
        <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />
        <SubCategoryBar parentId={selectedCategory} />
        <SearchBar />
        <FilterBar />
      </div>

      {/* Location List */}
      <div className="flex-1 overflow-y-auto py-3 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <MapPin className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">该分类暂无地点信息</p>
          </div>
        )}

        {/* Show all locations if none in category */}
        {filteredLocations.length === 0 &&
          locations.slice(0, 4).map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
      </div>

      {/* Floating Map Button */}
      <button className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-30">
        <MapPin className="w-5 h-5" />
      </button>
    </div>
  )
}
