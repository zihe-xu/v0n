"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, User, Phone, Users, FileText, AlertCircle } from "lucide-react"

interface VenueBookingFormViewProps {
  onBack?: () => void
  onSuccess?: () => void
}

export function VenueBookingFormView({ onBack, onSuccess }: VenueBookingFormViewProps) {
  const [bookingType, setBookingType] = useState<"personal" | "org">("personal")
  const [orgName, setOrgName] = useState("")
  const [participants, setParticipants] = useState("")
  const [contact, setContact] = useState("张明")
  const [phone, setPhone] = useState("13812345678")
  const [purpose, setPurpose] = useState("")
  const [special, setSpecial] = useState("")
  const [agreed, setAgreed] = useState(false)

  const isValid =
    participants.trim() !== "" &&
    contact.trim() !== "" &&
    phone.trim() !== "" &&
    purpose.trim() !== "" &&
    agreed &&
    (bookingType === "personal" || orgName.trim() !== "")

  const handleSubmit = () => {
    if (isValid) onSuccess?.()
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary to-primary/80">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-white font-bold flex-1">填写预约信息</h1>
      </div>

      {/* Booking Summary */}
      <div className="mx-4 mt-4 p-3 bg-primary/5 rounded-2xl border border-primary/20">
        <h2 className="text-sm font-bold text-foreground mb-2.5">预约场地信息</h2>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="font-medium text-foreground">舞蹈室</span>
            <span>·</span>
            <span>金岭社区长者服务站 2楼</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>2024年4月7日（周日）</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>16:00 - 17:00（1小时）</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        {/* Booking Type */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">预约方</span>
            <span className="text-red-500 text-sm">*</span>
          </div>
          <div className="flex">
            <button
              onClick={() => setBookingType("personal")}
              className={`flex-1 py-3 text-sm font-medium transition-colors border-r border-border/50 ${
                bookingType === "personal" ? "text-primary bg-primary/5" : "text-muted-foreground"
              }`}
            >
              个人
            </button>
            <button
              onClick={() => setBookingType("org")}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                bookingType === "org" ? "text-primary bg-primary/5" : "text-muted-foreground"
              }`}
            >
              单位
            </button>
          </div>
        </div>

        {/* Org Name - only shown for org type */}
        {bookingType === "org" && (
          <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">单位名称</span>
              <span className="text-red-500 text-sm">*</span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                placeholder="请输入单位名称"
                className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
              />
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Participants */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">参与人数</span>
            <span className="text-red-500 text-sm">*</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <input
              value={participants}
              onChange={(e) => setParticipants(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="请输入参与人数"
              type="number"
              inputMode="numeric"
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
            />
            <span className="text-xs text-muted-foreground">人</span>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">联系人</span>
            <span className="text-red-500 text-sm">*</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="请输入联系人姓名"
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
            />
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Phone */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">手机号码</span>
            <span className="text-red-500 text-sm">*</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入手机号码"
              type="tel"
              inputMode="tel"
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
            />
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Purpose */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">申请用途</span>
            <span className="text-red-500 text-sm">*</span>
          </div>
          <div className="px-4 py-3">
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="请输入申请用途"
              rows={3}
              className="w-full text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground resize-none"
            />
          </div>
        </div>

        {/* Special Requirements */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">特殊要求</span>
            <span className="text-xs text-muted-foreground font-normal ml-1">（选填）</span>
          </div>
          <div className="px-4 py-3">
            <textarea
              value={special}
              onChange={(e) => setSpecial(e.target.value)}
              placeholder="如有特殊要求请填写在此"
              rows={3}
              className="w-full text-sm bg-transparent outline-none placeholder:text-muted-foreground text-foreground resize-none"
            />
          </div>
        </div>

        {/* Agreement */}
        <div className="flex items-start gap-3 px-1 pb-2">
          <button
            onClick={() => setAgreed(!agreed)}
            className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
              agreed ? "bg-primary border-primary" : "border-border bg-card"
            }`}
          >
            {agreed && (
              <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <p className="text-xs text-muted-foreground leading-relaxed">
            我已阅读并同意
            <button className="text-primary underline mx-0.5">《场地预约使用须知》</button>
            及
            <button className="text-primary underline mx-0.5">《场地使用规定》</button>，
            承诺遵守相关规定，按时到场使用并保持场地整洁。
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-4 pb-5 pt-3 bg-card border-t border-border/50">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-4 rounded-2xl text-base font-bold transition-all ${
            isValid
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          提交预约申请
        </button>
      </div>
    </div>
  )
}
