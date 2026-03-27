"use client"

import { ChevronLeft, Share2, MapPin, Clock, Building2, CheckCircle, MessageCircle, Phone, ThumbsUp, Image as ImageIcon, User } from "lucide-react"

export function FeedbackDetailView() {
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-50/50 to-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-orange-500">
        <button className="p-1 rounded-full hover:bg-white/20 transition-colors">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">留言详情</h1>
        <button className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
          <Share2 className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Status card */}
        <div className="px-4 pt-4">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">已办结</h3>
                <p className="text-sm text-white/80">感谢您的留言，问题已解决</p>
              </div>
            </div>
            
            {/* Progress steps */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between text-xs">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white text-emerald-500 flex items-center justify-center font-bold text-[10px]">1</div>
                  <span className="mt-1 text-white/90">已提交</span>
                </div>
                <div className="flex-1 h-0.5 bg-white/40 mx-1" />
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white text-emerald-500 flex items-center justify-center font-bold text-[10px]">2</div>
                  <span className="mt-1 text-white/90">已受理</span>
                </div>
                <div className="flex-1 h-0.5 bg-white/40 mx-1" />
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white text-emerald-500 flex items-center justify-center font-bold text-[10px]">3</div>
                  <span className="mt-1 text-white/90">已回复</span>
                </div>
                <div className="flex-1 h-0.5 bg-white/40 mx-1" />
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-white text-emerald-500 flex items-center justify-center font-bold text-[10px]">4</div>
                  <span className="mt-1 text-white/90">已办结</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback content */}
        <div className="px-4 pt-4">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700">
                民生服务
              </span>
              <span className="text-xs text-muted-foreground">工单号：LY202501050001</span>
            </div>

            <h2 className="text-base font-bold text-foreground mb-3">申请老年人助餐补贴</h2>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              我父亲今年68岁，行动不便，想申请社区长者食堂的助餐补贴，请问如何办理？需要准备哪些材料？具体的补贴标准是什么？
            </p>

            {/* Images */}
            <div className="flex gap-2 mb-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted">
                <img src="/images/notice-2.jpg" alt="附图" className="w-full h-full object-cover" />
              </div>
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted">
                <img src="/images/notice-3.jpg" alt="附图" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Meta info */}
            <div className="space-y-2 pt-3 border-t border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>提交时间：2025-01-05 10:30</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Building2 className="w-3.5 h-3.5" />
                <span>承办部门：民政服务窗口</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span>问题位置：金岭社区党群服务中心</span>
              </div>
            </div>
          </div>
        </div>

        {/* Official reply */}
        <div className="px-4 pt-4">
          <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-orange-100/50 px-4 py-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground">官方回复</span>
                <span className="text-xs text-muted-foreground ml-auto">2025-01-06 15:20</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">民政服务窗口</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-primary/10 text-primary">官方</span>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                    <p>尊敬的市民您好，感谢您的留言！</p>
                    <p>关于长者食堂助餐补贴的办理，现答复如下：</p>
                    <p><strong>一、申请条件：</strong><br/>
                    金岭社区户籍或常住居民，年满60周岁以上的老年人均可申请。</p>
                    <p><strong>二、补贴标准：</strong><br/>
                    60-69周岁：每餐补贴2元<br/>
                    70-79周岁：每餐补贴3元<br/>
                    80周岁以上：每餐补贴5元</p>
                    <p><strong>三、所需材料：</strong><br/>
                    1. 本人身份证原件及复印件<br/>
                    2. 户口本原件及复印件<br/>
                    3. 近期一寸照片2张</p>
                    <p><strong>四、办理地点：</strong><br/>
                    金岭社区党群服务中心一楼民政窗口</p>
                    <p>如有疑问，可拨打咨询电话：0755-12345678</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Satisfaction rating */}
        <div className="px-4 pt-4">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-primary" />
              满意度评价
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {["非常满意", "满意", "一般", "不满意"].map((label, index) => (
                  <button
                    key={label}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      index === 0
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              您已评价：<span className="text-primary font-medium">非常满意</span>
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-4 pt-4 pb-4">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="text-sm font-bold text-foreground mb-4">办理进度</h3>
            
            <div className="space-y-4">
              {[
                { time: "01-06 16:00", title: "已办结", desc: "问题已解决，工单关闭", done: true },
                { time: "01-06 15:20", title: "已回复", desc: "民政服务窗口已回复", done: true },
                { time: "01-05 14:30", title: "已受理", desc: "工单已分派至民政服务窗口", done: true },
                { time: "01-05 10:30", title: "已提交", desc: "留言提交成功", done: true },
              ].map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${step.done ? "bg-primary" : "bg-border"}`} />
                    {index < 3 && <div className={`w-0.5 flex-1 mt-1 ${step.done ? "bg-primary/30" : "bg-border"}`} />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{step.title}</span>
                      <span className="text-xs text-muted-foreground">{step.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <div className="flex gap-3">
          <button className="flex-1 py-3 border border-primary text-primary text-sm font-semibold rounded-xl hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            联系部门
          </button>
          <button className="flex-1 py-3 bg-gradient-to-r from-primary to-orange-500 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" />
            追问反馈
          </button>
        </div>
      </div>
    </div>
  )
}
