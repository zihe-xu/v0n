"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  Clock,
  Users,
  FileText,
  Phone,
  User,
  MapPin,
  ImagePlus,
  Tag,
  Check,
  Navigation,
} from "lucide-react"

interface ActivityPublishViewProps {
  onBack?: () => void
  onSuccess?: () => void
}

const activityTypes = ["文化艺术", "体育健身", "志愿服务", "为老服务", "亲子家庭", "公益环保", "职业技能", "其他"]
const districts = ["金岭社区", "水贝社区", "木棉湾社区", "翠竹社区", "莲塘社区", "仙湖社区"]
const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]

export function ActivityPublishView({ onBack, onSuccess }: ActivityPublishViewProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState({
    name: "",
    type: "",
    district: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    maxCount: 20,
    description: "",
    contact: "",
    phone: "",
    cover: false,
  })
  const [showTypeSheet, setShowTypeSheet] = useState(false)
  const [showDistrictSheet, setShowDistrictSheet] = useState(false)
  const [showStartTimeSheet, setShowStartTimeSheet] = useState(false)
  const [showEndTimeSheet, setShowEndTimeSheet] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [locationName, setLocationName] = useState("")

  const descLength = form.description.length

  const canProceed =
    form.name.trim() &&
    form.type &&
    form.district &&
    form.date &&
    form.timeStart &&
    form.timeEnd &&
    form.maxCount > 0 &&
    form.description.trim() &&
    form.contact.trim() &&
    form.phone.trim()

  const mapPins = [
    { id: "a", label: "金岭社区党群服务中心", x: 38, y: 40 },
    { id: "b", label: "金岭社区广场", x: 55, y: 55 },
    { id: "c", label: "金岭公园", x: 25, y: 62 },
    { id: "d", label: "金岭运动场", x: 65, y: 38 },
    { id: "e", label: "思月书院", x: 50, y: 72 },
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border/60">
        <button
          onClick={step === 2 ? () => setStep(1) : onBack}
          className="p-1 rounded-full hover:bg-muted transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">发布活动</h1>
        <div className="w-8" />
      </div>

      {/* Step indicator */}
      <div className="px-6 pt-4 pb-3 bg-card border-b border-border/30">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-[16.7%] right-[16.7%] top-4 h-0.5 bg-border" />
          <div
            className="absolute top-4 h-0.5 bg-primary transition-all duration-300"
            style={{ left: "16.7%", right: step === 1 ? "50%" : "16.7%" }}
          />
          {[
            { num: 1, label: "基本信息" },
            { num: 2, label: "选择地点" },
          ].map(s => (
            <div key={s.num} className="flex flex-col items-center gap-1.5 relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                step > s.num
                  ? "bg-primary border-primary text-primary-foreground"
                  : step === s.num
                  ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/30"
                  : "bg-card border-border text-muted-foreground"
              }`}>
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className={`text-[11px] font-medium ${step >= s.num ? "text-primary" : "text-muted-foreground"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="flex-1 overflow-y-auto pb-28">
          <div className="px-4 pt-4 space-y-4">

            {/* Activity name */}
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-3">
                <Tag className="w-4 h-4 text-primary" />
                活动名称
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="请输入活动名称"
                className="w-full px-4 py-3 bg-muted/40 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            {/* Type + District */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
                <label className="flex items-center gap-1 text-sm font-semibold text-foreground mb-3">
                  <Tag className="w-3.5 h-3.5 text-primary" />
                  活动类型
                  <span className="text-red-500">*</span>
                </label>
                <button
                  onClick={() => setShowTypeSheet(true)}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-muted/40 rounded-xl border border-border text-left"
                >
                  <span className={`text-sm ${form.type ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {form.type || "请选择"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </button>
              </div>
              <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
                <label className="flex items-center gap-1 text-sm font-semibold text-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  所属区域
                  <span className="text-red-500">*</span>
                </label>
                <button
                  onClick={() => setShowDistrictSheet(true)}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-muted/40 rounded-xl border border-border text-left"
                >
                  <span className={`text-sm ${form.district ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {form.district || "请选择"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </button>
              </div>
            </div>

            {/* Date */}
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                活动日期
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full px-4 py-3 bg-muted/40 rounded-xl border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            {/* Time range */}
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-3">
                <Clock className="w-4 h-4 text-primary" />
                活动时间段
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowStartTimeSheet(true)}
                  className="flex-1 flex items-center justify-between px-4 py-3 bg-muted/40 rounded-xl border border-border"
                >
                  <span className={`text-sm ${form.timeStart ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {form.timeStart || "开始时间"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
                <span className="text-muted-foreground text-sm font-medium">至</span>
                <button
                  onClick={() => setShowEndTimeSheet(true)}
                  className="flex-1 flex items-center justify-between px-4 py-3 bg-muted/40 rounded-xl border border-border"
                >
                  <span className={`text-sm ${form.timeEnd ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {form.timeEnd || "结束时间"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Max count */}
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-3">
                <Users className="w-4 h-4 text-primary" />
                活动人数（人）
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setForm(f => ({ ...f, maxCount: Math.max(1, f.maxCount - 1) }))}
                  className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-xl font-bold text-foreground hover:bg-primary/10 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={form.maxCount}
                  onChange={e => setForm(f => ({ ...f, maxCount: Math.max(1, parseInt(e.target.value) || 1) }))}
                  className="w-20 text-center text-xl font-bold text-foreground bg-transparent border-none outline-none"
                />
                <button
                  onClick={() => setForm(f => ({ ...f, maxCount: f.maxCount + 1 }))}
                  className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-xl font-bold text-foreground hover:bg-primary/10 transition-colors"
                >
                  +
                </button>
                <span className="text-xs text-muted-foreground">人（上限）</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-3">
                <FileText className="w-4 h-4 text-primary" />
                活动介绍
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value.slice(0, 1000) }))}
                  placeholder="请输入内容介绍，详细描述活动内容、参与方式等信息"
                  className="w-full px-4 py-3 bg-muted/40 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
                <span className="absolute bottom-3 right-3 text-[10px] text-muted-foreground">
                  {descLength}/1000
                </span>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
              <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-4">
                <User className="w-4 h-4 text-primary" />
                联系方式
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1.5">
                    联系人
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.contact}
                    onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
                    placeholder="请输入联系人姓名"
                    className="w-full px-4 py-3 bg-muted/40 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-1.5">
                    联系电话
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="请输入联系电话"
                    className="w-full px-4 py-3 bg-muted/40 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Cover image */}
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
              <div className="flex items-center gap-1.5 mb-3">
                <ImagePlus className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">活动封面</span>
                <span className={`text-xs font-medium ml-1 ${form.cover ? "text-primary" : "text-muted-foreground"}`}>
                  {form.cover ? "1" : "0"}/1
                </span>
              </div>
              <div className="flex gap-4 items-start">
                <button
                  onClick={() => setForm(f => ({ ...f, cover: !f.cover }))}
                  className={`w-24 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${
                    form.cover
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/30 bg-muted/30 hover:bg-muted/50"
                  }`}
                >
                  {form.cover ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[10px] text-primary font-medium">已上传</span>
                    </>
                  ) : (
                    <>
                      <ImagePlus className="w-6 h-6 text-muted-foreground/50" />
                      <span className="text-[10px] text-muted-foreground">点击上传</span>
                    </>
                  )}
                </button>
                <div className="flex-1 pt-1">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    注：未设置时会使用系统默认封面
                  </p>
                  <p className="text-xs text-primary/70 mt-1">
                    (支持jpg、jpeg、png、bmp、gif、heic格式，最大支持100M)
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Step 2: Select Location */}
      {step === 2 && (
        <div className="flex-1 overflow-y-auto pb-28">
          <div className="px-4 pt-4 space-y-4">
            {/* Map area */}
            <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
              <div className="px-4 pt-4 pb-3 border-b border-border/30">
                <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Navigation className="w-4 h-4 text-primary" />
                  在地图上选择活动地点
                  <span className="text-red-500">*</span>
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">点击地图上的地点选择活动举办地</p>
              </div>

              {/* Simulated map */}
              <div className="relative h-56 bg-gradient-to-br from-emerald-50 to-teal-50 overflow-hidden">
                {/* Map grid lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                  {[20, 40, 60, 80].map(p => (
                    <g key={p}>
                      <line x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%" stroke="#94a3b8" strokeWidth="0.5" />
                      <line x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="#94a3b8" strokeWidth="0.5" />
                    </g>
                  ))}
                </svg>
                {/* Road shapes */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 50% Q 30% 40% 60% 50% T 100% 45%" stroke="#cbd5e1" strokeWidth="6" fill="none" />
                  <path d="M 40% 0 L 45% 100%" stroke="#cbd5e1" strokeWidth="4" fill="none" />
                  <path d="M 0 70% L 100% 65%" stroke="#e2e8f0" strokeWidth="3" fill="none" />
                </svg>

                {/* Location pins */}
                {mapPins.map(pin => (
                  <button
                    key={pin.id}
                    onClick={() => {
                      setSelectedLocation(pin.id)
                      setLocationName(pin.label)
                    }}
                    className="absolute flex flex-col items-center group"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%, -100%)" }}
                  >
                    <div className={`px-2 py-1 rounded-lg text-[10px] font-semibold shadow-md transition-all whitespace-nowrap ${
                      selectedLocation === pin.id
                        ? "bg-primary text-primary-foreground scale-110"
                        : "bg-card text-foreground border border-border group-hover:bg-primary/10"
                    }`}>
                      {pin.label}
                    </div>
                    <div className={`w-2 h-2 rounded-full mt-0.5 ${
                      selectedLocation === pin.id ? "bg-primary" : "bg-muted-foreground/50"
                    }`} />
                  </button>
                ))}

                {/* Search overlay */}
                <div className="absolute top-2 left-2 right-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-card/90 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <input
                      type="text"
                      value={locationName}
                      onChange={e => setLocationName(e.target.value)}
                      placeholder="搜索或输入活动地点名称"
                      className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Selected location */}
              {selectedLocation && (
                <div className="px-4 py-3 bg-primary/5 border-t border-primary/20">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">已选择地点</p>
                      <p className="text-sm font-semibold text-foreground truncate">{locationName}</p>
                    </div>
                    <button
                      onClick={() => { setSelectedLocation(null); setLocationName("") }}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      重新选择
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Detail address */}
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                详细地址
              </label>
              <input
                type="text"
                placeholder="请补充详细地址（楼栋、房间号等）"
                className="w-full px-4 py-3 bg-muted/40 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            {/* Summary card */}
            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20">
              <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-primary" />
                活动信息确认
              </h3>
              <div className="space-y-2">
                {[
                  { label: "活动名称", value: form.name || "—" },
                  { label: "活动类型", value: form.type || "—" },
                  { label: "所属区域", value: form.district || "—" },
                  { label: "活动日期", value: form.date || "—" },
                  { label: "活动时间", value: form.timeStart && form.timeEnd ? `${form.timeStart} ~ ${form.timeEnd}` : "—" },
                  { label: "活动人数", value: `${form.maxCount} 人` },
                  { label: "联系人", value: form.contact || "—" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground w-14 flex-shrink-0">{item.label}</span>
                    <span className="text-foreground font-medium truncate">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom button */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-gradient-to-t from-card to-card/0">
        {step === 1 ? (
          <button
            onClick={() => setStep(2)}
            disabled={!canProceed}
            className={`w-full py-3.5 rounded-2xl text-base font-bold transition-all shadow-lg ${
              canProceed
                ? "bg-primary text-primary-foreground shadow-primary/30 hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            下一步：选择活动地点
          </button>
        ) : (
          <button
            onClick={onSuccess}
            disabled={!selectedLocation && !locationName}
            className={`w-full py-3.5 rounded-2xl text-base font-bold transition-all shadow-lg ${
              selectedLocation || locationName
                ? "bg-primary text-primary-foreground shadow-primary/30 hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            发布活动
          </button>
        )}
      </div>

      {/* Bottom sheets */}
      {(showTypeSheet || showDistrictSheet || showStartTimeSheet || showEndTimeSheet) && (
        <div
          className="absolute inset-0 bg-black/40 z-50"
          onClick={() => {
            setShowTypeSheet(false)
            setShowDistrictSheet(false)
            setShowStartTimeSheet(false)
            setShowEndTimeSheet(false)
          }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-card rounded-t-2xl p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />
            <h3 className="text-sm font-bold text-foreground mb-4 text-center">
              {showTypeSheet && "选择活动类型"}
              {showDistrictSheet && "选择所属区域"}
              {showStartTimeSheet && "选择开始时间"}
              {showEndTimeSheet && "选择结束时间"}
            </h3>
            <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pb-2">
              {(showTypeSheet ? activityTypes : showDistrictSheet ? districts : timeSlots).map(opt => {
                const isSelected =
                  (showTypeSheet && form.type === opt) ||
                  (showDistrictSheet && form.district === opt) ||
                  (showStartTimeSheet && form.timeStart === opt) ||
                  (showEndTimeSheet && form.timeEnd === opt)
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      if (showTypeSheet) setForm(f => ({ ...f, type: opt }))
                      if (showDistrictSheet) setForm(f => ({ ...f, district: opt }))
                      if (showStartTimeSheet) setForm(f => ({ ...f, timeStart: opt }))
                      if (showEndTimeSheet) setForm(f => ({ ...f, timeEnd: opt }))
                      setShowTypeSheet(false)
                      setShowDistrictSheet(false)
                      setShowStartTimeSheet(false)
                      setShowEndTimeSheet(false)
                    }}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-primary/10"
                    }`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
