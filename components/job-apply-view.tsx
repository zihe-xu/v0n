"use client"

import { ChevronLeft, User, Phone, GraduationCap, CreditCard, Briefcase, MapPin, Camera, Upload, ChevronRight, FileText } from "lucide-react"

const formFields = [
  { label: "姓名", icon: User, placeholder: "请输入您的真实姓名", required: true },
  { label: "联系方式", icon: Phone, placeholder: "请输入手机号码", required: true },
  { label: "学历", icon: GraduationCap, placeholder: "请选择最高学历", type: "select", required: true },
  { label: "证件号码", icon: CreditCard, placeholder: "请输入身份证号码", required: true },
  { label: "应聘岗位", icon: Briefcase, placeholder: "社区专职工作者", type: "readonly", required: true },
  { label: "当前住址", icon: MapPin, placeholder: "请输入详细居住地址", required: true },
]

const educationOptions = ["高中", "大专", "本科", "硕士", "博士"]

export function JobApplyView() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-50/50 to-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <button className="p-1 rounded-full hover:bg-muted transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">申请报名</h1>
        <div className="w-8" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Job info card */}
        <div className="px-4 pt-4">
          <div className="bg-gradient-to-r from-primary to-orange-500 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">社区专职工作者</h3>
                <p className="text-sm text-white/80 mt-1">金岭社区社区服务站</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold">4000-5500</span>
                <span className="text-sm">元/月</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
              <span className="text-xs font-medium text-primary">填写信息</span>
            </div>
            <div className="w-8 h-0.5 bg-border" />
            <div className="flex items-center gap-1">
              <span className="w-6 h-6 rounded-full bg-border text-muted-foreground text-xs font-bold flex items-center justify-center">2</span>
              <span className="text-xs text-muted-foreground">提交审核</span>
            </div>
            <div className="w-8 h-0.5 bg-border" />
            <div className="flex items-center gap-1">
              <span className="w-6 h-6 rounded-full bg-border text-muted-foreground text-xs font-bold flex items-center justify-center">3</span>
              <span className="text-xs text-muted-foreground">等待通知</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="px-4 space-y-3">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              基本信息
            </h3>

            <div className="space-y-4">
              {formFields.map((field, index) => (
                <div key={index}>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-2">
                    <field.icon className="w-4 h-4 text-primary" />
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === "select" ? (
                    <button className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 rounded-xl border border-border text-left">
                      <span className="text-muted-foreground text-sm">{field.placeholder}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ) : field.type === "readonly" ? (
                    <div className="w-full px-4 py-3 bg-amber-50 rounded-xl border border-amber-200">
                      <span className="text-amber-700 text-sm font-medium">{field.placeholder}</span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Photo upload */}
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              本人照片
              <span className="text-red-500">*</span>
            </h3>

            <div className="flex gap-3">
              <div className="w-24 h-32 rounded-xl border-2 border-dashed border-primary/40 bg-amber-50/50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-amber-50 transition-colors">
                <Camera className="w-6 h-6 text-primary/60" />
                <span className="text-[10px] text-primary font-medium">证件照</span>
              </div>
              <div className="flex-1 p-3 bg-muted/30 rounded-xl">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  请上传近期免冠证件照，要求：
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    白底或蓝底彩色照片
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    清晰正面免冠
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    文件大小不超过2MB
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Resume upload */}
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              上传简历
              <span className="text-xs text-muted-foreground font-normal ml-1">(可选)</span>
            </h3>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-border rounded-xl hover:bg-muted/30 transition-colors">
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">点击上传简历文件</span>
            </button>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              支持 PDF、Word 格式，文件大小不超过10MB
            </p>
          </div>

          {/* Agreement */}
          <div className="flex items-start gap-2 px-1">
            <div className="w-4 h-4 rounded border-2 border-primary bg-primary flex items-center justify-center mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground">
              我已阅读并同意
              <span className="text-primary">《社区招聘报名须知》</span>
              和
              <span className="text-primary">《个人信息保护协议》</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <button className="w-full py-3 bg-gradient-to-r from-primary to-orange-500 text-white text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          提交申请
        </button>
      </div>
    </div>
  )
}
