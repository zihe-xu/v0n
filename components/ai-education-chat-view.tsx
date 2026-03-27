"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  Send,
  Mic,
  RefreshCw,
  Building2,
  Calendar,
  UtensilsCrossed,
  Baby,
  Type,
  Volume2,
  MoreHorizontal,
  GraduationCap,
  FileText,
  Calculator,
  HelpCircle,
  BookOpen,
  Users,
  Clock,
  MapPin,
  Phone,
  ExternalLink,
} from "lucide-react"

/* ------------------------------------------------------------------
   Types
------------------------------------------------------------------ */

type CardType = 
  | "subsidies" 
  | "detail" 
  | "calculator"
  | "application"
  | "progress"
  | "schools"

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  card?: CardType
  data?: Record<string, unknown>
}

/* ------------------------------------------------------------------
   Quick Nav Tabs
------------------------------------------------------------------ */

function QuickNavTabs() {
  const tabs = [
    { icon: Building2, label: "场馆预约" },
    { icon: Calendar, label: "活动报名" },
    { icon: UtensilsCrossed, label: "社区食堂" },
    { icon: Baby, label: "托育服务" },
  ]

  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-white/10 backdrop-blur-sm">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <tab.icon className="w-4 h-4 text-white/90" />
          <span className="text-[10px] text-white/80">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------
   Chat Header
------------------------------------------------------------------ */

function ChatHeader({ onBack }: { onBack?: () => void }) {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 py-2">
        <button onClick={onBack} className="p-1 -ml-1 rounded-full hover:bg-white/10">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-base">罗小i</h1>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-full hover:bg-white/10">
            <Type className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-white/10">
            <Volume2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-white/10">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      <QuickNavTabs />
    </div>
  )
}

/* ------------------------------------------------------------------
   Subsidy Detail Card
------------------------------------------------------------------ */

function SubsidyDetailCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
      {/* Topic Tag */}
      <div className="flex justify-end px-3 pt-3">
        <span className="px-3 py-1 bg-sky-100 text-sky-600 text-xs font-medium rounded-full">
          上学补贴
        </span>
      </div>
      
      {/* AI Disclaimer */}
      <div className="mx-3 mt-2 mb-3 px-3 py-1.5 bg-sky-50/50 rounded-lg">
        <p className="text-[10px] text-sky-500/70 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-sky-400" />
          内容基于AI智能生成，仅供参考
        </p>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed space-y-3">
        <p>
          关于您提到的"<span className="text-sky-600 font-medium">上学补贴</span>"，我理解您可能是指民办学校义务教育阶段学位补贴或双免补贴。具体来说：
        </p>

        {/* Subsidy 1 */}
        <div className="pl-3 border-l-2 border-sky-400 space-y-1">
          <p className="font-medium text-gray-800">民办学校义务教育阶段学位补贴</p>
          <p className="text-gray-600">
            <span className="text-sky-600 font-medium">发放标准：</span>
            小学生每人每年最高可获得<span className="text-orange-500 font-semibold">7000元</span>，
            初中生每人每年最高可获得<span className="text-orange-500 font-semibold">9000元</span>。
          </p>
        </div>

        {/* Subsidy 2 */}
        <div className="pl-3 border-l-2 border-emerald-400 space-y-1">
          <p className="font-medium text-gray-800">双免补贴</p>
          <p className="text-gray-600">
            <span className="text-sky-600 font-medium">发放对象：</span>
            具有深圳市学籍并在读于民办学校的适龄学生。但需要注意的是，如果学生已经符合领取学位补贴的条件，则不再发放双免补贴。
          </p>
        </div>

        {/* Question prompt */}
        <p className="pt-2 text-gray-600">
          请问您想了解哪一种补贴的具体情况？或者是否有其他更具体的疑问需要解答呢？
        </p>
      </div>

      {/* Quick Actions */}
      <div className="px-3 pb-3 flex flex-wrap gap-2">
        {[
          "学位补贴申请流程",
          "补贴发放时间",
          "申请条件详情",
          "所需材料清单",
        ].map((action) => (
          <button
            key={action}
            className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 text-xs rounded-full transition-colors"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Subsidies List Card
------------------------------------------------------------------ */

function SubsidiesListCard() {
  const subsidies = [
    {
      name: "民办学校学位补贴",
      amount: "最高9000元/年",
      icon: GraduationCap,
      color: "bg-sky-500",
      target: "民办学校在读学生",
    },
    {
      name: "双免补贴",
      amount: "免学杂费+课本费",
      icon: BookOpen,
      color: "bg-emerald-500",
      target: "深圳市学籍学生",
    },
    {
      name: "家庭经济困难学生资助",
      amount: "最高3000元/年",
      icon: Users,
      color: "bg-orange-500",
      target: "低保/特困家庭",
    },
    {
      name: "学前教育资助",
      amount: "1500元/年",
      icon: Baby,
      color: "bg-pink-500",
      target: "3-6岁困难家庭儿童",
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-sky-500" />
          教育补贴政策
        </h3>
      </div>
      <div className="p-3 space-y-2">
        {subsidies.map((subsidy, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-sky-50 transition-colors text-left"
          >
            <div className={`w-10 h-10 ${subsidy.color} rounded-xl flex items-center justify-center shrink-0`}>
              <subsidy.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 text-sm">{subsidy.name}</h4>
              <p className="text-xs text-gray-500 truncate">{subsidy.target}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-sm font-semibold text-orange-500">{subsidy.amount}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Application Process Card
------------------------------------------------------------------ */

function ApplicationProcessCard() {
  const steps = [
    { step: 1, title: "准备材料", desc: "身份证、户口本、学籍证明", status: "pending" },
    { step: 2, title: "网上申报", desc: "登录深圳市教育局官网填报", status: "pending" },
    { step: 3, title: "学校初审", desc: "学校审核材料真实性", status: "pending" },
    { step: 4, title: "区级复核", desc: "教育局复核申请信息", status: "pending" },
    { step: 5, title: "补贴发放", desc: "审核通过后发放至银行账户", status: "pending" },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <FileText className="w-4 h-4 text-sky-500" />
          学位补贴申请流程
        </h3>
      </div>
      <div className="p-4">
        <div className="relative">
          {steps.map((step, index) => (
            <div key={step.step} className="flex gap-3 pb-4 last:pb-0">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center">
                  {step.step}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-sky-200 mt-1" />
                )}
              </div>
              {/* Content */}
              <div className="flex-1 pb-2">
                <h4 className="font-medium text-gray-800 text-sm">{step.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Important dates */}
        <div className="mt-4 p-3 bg-amber-50 rounded-xl">
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">重要时间节点</p>
              <p className="text-xs text-amber-600 mt-1">
                春季学期：3月1日-3月31日<br/>
                秋季学期：9月1日-9月30日
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Calculator Card
------------------------------------------------------------------ */

function CalculatorCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-sky-500" />
          补贴金额测算
        </h3>
      </div>
      <div className="p-4 space-y-4">
        {/* Result */}
        <div className="text-center py-4 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl">
          <p className="text-sm text-gray-600 mb-1">您可获得的年度补贴约</p>
          <p className="text-3xl font-bold text-sky-600">¥7,000</p>
          <p className="text-xs text-gray-500 mt-1">小学阶段学位补贴</p>
        </div>
        
        {/* Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">学位补贴标准</span>
            <span className="text-sm font-medium text-gray-800">¥7,000/年</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">实际学费</span>
            <span className="text-sm font-medium text-gray-800">¥12,000/年</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-600">自付金额</span>
            <span className="text-sm font-medium text-orange-500">¥5,000/年</span>
          </div>
        </div>

        <button className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-xl transition-colors">
          开始申请
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Schools List Card
------------------------------------------------------------------ */

function SchoolsListCard() {
  const schools = [
    { name: "罗湖区明珠学校", type: "民办", distance: "500m", status: "可申请" },
    { name: "罗湖区华英学校", type: "民办", distance: "1.2km", status: "可申请" },
    { name: "罗湖区鹏兴实验学校", type: "民办", distance: "1.8km", status: "可申请" },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-sky-500" />
          附近可申请学校
        </h3>
      </div>
      <div className="p-3 space-y-2">
        {schools.map((school, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
          >
            <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-sky-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 text-sm">{school.name}</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">{school.type}</span>
                <span className="text-xs text-gray-400">|</span>
                <span className="text-xs text-gray-500 flex items-center gap-0.5">
                  <MapPin className="w-3 h-3" />
                  {school.distance}
                </span>
              </div>
            </div>
            <span className="px-2 py-1 bg-emerald-100 text-emerald-600 text-xs rounded-full">
              {school.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Welcome Section
------------------------------------------------------------------ */

function WelcomeSection() {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
        <Image
          src="/images/ai-assistant-avatar.jpg"
          alt="罗小i"
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="mt-2 text-base font-bold text-sky-700">Hi，我是罗小i</h2>
      <p className="text-xs text-gray-500 text-center mt-1 px-8">
        您的专属教育政策助手，为您解答上学补贴、学位申请等问题
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------
   Suggestions Section
------------------------------------------------------------------ */

function SuggestionsSection({ onSelect }: { onSelect: (q: string) => void }) {
  const suggestions = [
    "民办学校学位补贴怎么申请？",
    "双免补贴的发放标准是多少？",
    "我家孩子能领多少补贴？",
  ]

  return (
    <div className="mx-3 mb-3">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-sky-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-sky-500" />
            常见问题
          </span>
          <button className="text-xs text-sky-500 flex items-center gap-0.5">
            <RefreshCw className="w-3 h-3" />
            换一换
          </button>
        </div>
        <div className="space-y-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onSelect(s)}
              className="w-full text-left px-3 py-2.5 bg-sky-50/80 hover:bg-sky-100 rounded-xl text-sm text-gray-700 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Message Bubble
------------------------------------------------------------------ */

function MessageBubble({ message, onQuickReply }: { message: Message; onQuickReply?: (text: string) => void }) {
  const isUser = message.type === "user"

  const renderCard = () => {
    switch (message.card) {
      case "detail":
        return <SubsidyDetailCard />
      case "subsidies":
        return <SubsidiesListCard />
      case "application":
        return <ApplicationProcessCard />
      case "calculator":
        return <CalculatorCard />
      case "schools":
        return <SchoolsListCard />
      default:
        return null
    }
  }

  if (isUser) {
    return (
      <div className="flex justify-end px-3 mb-3">
        <div className="max-w-[85%] px-4 py-2.5 bg-sky-500 text-white rounded-2xl rounded-br-md text-sm">
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2 px-3 mb-3">
      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-sky-100">
        <Image
          src="/images/ai-assistant-avatar.jpg"
          alt="罗小i"
          width={32}
          height={32}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        {message.card ? (
          renderCard()
        ) : (
          <div className="bg-white rounded-2xl rounded-tl-md shadow-sm border border-sky-100 px-4 py-3">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.content}</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Input Area
------------------------------------------------------------------ */

function InputArea({
  value,
  onChange,
  onSend,
}: {
  value: string
  onChange: (v: string) => void
  onSend: () => void
}) {
  return (
    <div className="p-3 bg-white border-t border-gray-100">
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Mic className="w-5 h-5 text-gray-500" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="请输入您的问题..."
            className="w-full py-2.5 px-4 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
        <button
          onClick={onSend}
          className="p-2.5 bg-sky-500 hover:bg-sky-600 rounded-full transition-colors"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------
   Main Component
------------------------------------------------------------------ */

export function AIEducationChatView({ onBack }: { onBack?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const handleSend = (text?: string) => {
    const content = text || input.trim()
    if (!content) return

    const userMsg: Message = {
      id: Date.now(),
      type: "user",
      content,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      let aiMsg: Message

      if (content.includes("上学补贴") || content.includes("学位补贴") || content.includes("补贴")) {
        aiMsg = {
          id: Date.now() + 1,
          type: "ai",
          content: "",
          card: "detail",
        }
      } else if (content.includes("申请流程") || content.includes("怎么申请")) {
        aiMsg = {
          id: Date.now() + 1,
          type: "ai",
          content: "",
          card: "application",
        }
      } else if (content.includes("多少") || content.includes("测算") || content.includes("计算")) {
        aiMsg = {
          id: Date.now() + 1,
          type: "ai",
          content: "",
          card: "calculator",
        }
      } else if (content.includes("政策") || content.includes("有哪些")) {
        aiMsg = {
          id: Date.now() + 1,
          type: "ai",
          content: "",
          card: "subsidies",
        }
      } else if (content.includes("学校") || content.includes("附近")) {
        aiMsg = {
          id: Date.now() + 1,
          type: "ai",
          content: "",
          card: "schools",
        }
      } else {
        aiMsg = {
          id: Date.now() + 1,
          type: "ai",
          content: "好的，请问您想了解教育补贴的哪些方面？我可以为您介绍补贴政策、申请流程、补贴金额测算等内容。",
        }
      }

      setMessages((prev) => [...prev, aiMsg])
    }, 800)
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sky-50 to-white">
      <ChatHeader onBack={onBack} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {messages.length === 0 ? (
          <>
            <WelcomeSection />
            <SuggestionsSection onSelect={handleSend} />
          </>
        ) : (
          <div className="py-3">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} onQuickReply={handleSend} />
            ))}
            {isTyping && (
              <div className="flex gap-2 px-3 mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-sky-100">
                  <Image
                    src="/images/ai-assistant-avatar.jpg"
                    alt="罗小i"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-md shadow-sm border border-sky-100 px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <InputArea value={input} onChange={setInput} onSend={() => handleSend()} />
    </div>
  )
}
