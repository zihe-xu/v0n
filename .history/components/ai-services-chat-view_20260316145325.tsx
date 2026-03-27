"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  Send,
  Mic,
  RefreshCw,
  MapPin,
  Clock,
  Navigation,
  Building2,
  Calendar,
  UtensilsCrossed,
  Baby,
  Sparkles,
  MoreHorizontal,
  Hospital,
  Bus,
  Car,
  Droplet,
  Zap,
  TreePine,
  CreditCard,
  FileText,
  ChevronRight,
  Star,
  Type,
  Stethoscope,
  Ticket,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  cards?: ServiceCard[] | DoctorCard[] | RecentServiceCard[]
  cardType?: "service" | "doctor" | "recent"
  quickReplies?: string[]
}

interface ServiceCard {
  name: string
  icon: string
  description: string
  features: string[]
  buttons: { label: string; primary?: boolean }[]
}

interface DoctorCard {
  name: string
  title: string
  department: string
  hospital: string
  available?: boolean
}

interface RecentServiceCard {
  name: string
  icon: string
  lastUsed?: string
}

const quickNavTabs = [
  { id: "venue", label: "场馆预约", icon: Building2 },
  { id: "activity", label: "活动报名", icon: Calendar },
  { id: "canteen", label: "社区食堂", icon: UtensilsCrossed },
  { id: "childcare", label: "托育服务", icon: Baby },
]

const defaultSuggestions = [
  "我要去罗湖区人民医院挂号",
  "怎么查公交实时位置？",
  "停车费怎么交？",
  "水费电费怎么缴纳？",
]

export function AIServicesChatView() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState(defaultSuggestions)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const refreshSuggestions = () => {
    const allSuggestions = [
      "我要去罗湖区人民医院挂号",
      "有没有骨科医生推荐？",
      "怎么查公交实时位置？",
      "停车费怎么交？",
      "水费电费怎么缴纳？",
      "东湖公园要买票吗？",
      "怎么查社保缴费记录？",
      "医保余额怎么查？",
    ]
    const shuffled = allSuggestions.sort(() => 0.5 - Math.random())
    setSuggestions(shuffled.slice(0, 4))
  }

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      let aiResponse: Message

      if (userMessage.includes("挂号") || userMessage.includes("医院")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "你可以通过以下方式预约挂号：",
          cardType: "service",
          cards: [{
            name: "罗湖区人民医院",
            icon: "🏥",
            description: "三级甲等综合医院",
            features: ["门诊预约挂号", "医生排班查询", "就诊记录查看", "检验报告查询"],
            buttons: [
              { label: "预约挂号", primary: true },
              { label: "医生排班" },
              { label: "就诊记录" },
            ],
          }] as ServiceCard[],
          quickReplies: ["查看骨科医生", "预约明天上午", "怎么去医院"],
        }
      } else if (userMessage.includes("骨科") || userMessage.includes("医生")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "罗湖区人民医院骨科门诊信息：",
          cardType: "doctor",
          cards: [
            {
              name: "张建国",
              title: "主任医师",
              department: "骨科",
              hospital: "罗湖区人民医院",
              available: true,
            },
            {
              name: "李明华",
              title: "副主任医师",
              department: "骨科",
              hospital: "罗湖区人民医院",
              available: true,
            },
            {
              name: "王晓红",
              title: "主治医师",
              department: "骨科",
              hospital: "罗湖区人民医院",
              available: false,
            },
          ] as DoctorCard[],
          quickReplies: ["预约张建国医生", "查看排班详情", "其他科室"],
        }
      } else if (userMessage.includes("公交") || userMessage.includes("地铁")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "你可以使用以下交通服务：",
          cardType: "service",
          cards: [{
            name: "深圳公交",
            icon: "🚌",
            description: "深圳市公共交通查询服务",
            features: ["实时公交查询", "公交线路规划", "到站提醒", "换乘方案"],
            buttons: [
              { label: "公交查询", primary: true },
              { label: "实时公交" },
              { label: "线路规划" },
            ],
          }] as ServiceCard[],
          quickReplies: ["查附近公交站", "地铁换乘", "去东门怎么坐车"],
        }
      } else if (userMessage.includes("停车") || userMessage.includes("车费")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "你可以通过城市服务平台缴纳停车费：",
          cardType: "service",
          cards: [{
            name: "智慧停车",
            icon: "🚗",
            description: "深圳市智慧停车服务平台",
            features: ["停车缴费", "停车记录查询", "停车场导航", "车位预约"],
            buttons: [
              { label: "停车缴费", primary: true },
              { label: "停车记录" },
              { label: "停车场查询" },
            ],
          }] as ServiceCard[],
          quickReplies: ["查看欠费记录", "附近停车场", "停车优惠"],
        }
      } else if (userMessage.includes("水费") || userMessage.includes("电费") || userMessage.includes("缴纳")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "你可以通过以下服务缴纳生活费用：",
          cardType: "service",
          cards: [
            {
              name: "深圳水务",
              icon: "💧",
              description: "深圳市水务集团缴费服务",
              features: ["水费缴纳", "用水账单", "用水记录"],
              buttons: [
                { label: "水费缴纳", primary: true },
                { label: "账单查询" },
              ],
            },
            {
              name: "深圳供电",
              icon: "⚡",
              description: "南方电网深圳供电局",
              features: ["电费缴纳", "用电账单", "用电分析"],
              buttons: [
                { label: "电费缴纳", primary: true },
                { label: "账单查询" },
              ],
            },
            {
              name: "深圳燃气",
              icon: "🔥",
              description: "深圳市燃气集团",
              features: ["燃气缴费", "用气账单"],
              buttons: [
                { label: "燃气缴费", primary: true },
                { label: "账单查询" },
              ],
            },
          ] as ServiceCard[],
          quickReplies: ["查看水费账单", "电费多少钱", "燃气余额"],
        }
      } else if (userMessage.includes("公园") || userMessage.includes("门票") || userMessage.includes("景区")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "东湖公园是免费开放的市政公园：",
          cardType: "service",
          cards: [{
            name: "东湖公园",
            icon: "🌳",
            description: "深圳市罗湖区大型综合公园",
            features: ["🎫 门票：免费", "⏰ 开放时间：06:00-23:00", "📍 罗湖区爱国路4006号"],
            buttons: [
              { label: "活动预约", primary: true },
              { label: "停车导航" },
            ],
          }] as ServiceCard[],
          quickReplies: ["附近还有什么公园", "怎么去东湖公园", "公园有什么活动"],
        }
      } else {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我可以帮你快速找到城市服务入口。你最近使用过以下服务：",
          cardType: "recent",
          cards: [
            { name: "医院挂号", icon: "🏥" },
            { name: "停车缴费", icon: "🚗" },
            { name: "图书借阅", icon: "📚" },
          ] as RecentServiceCard[],
          quickReplies: ["医院挂号", "公交查询", "生活缴费", "景区服务"],
        }
      }

      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1200)
  }

  const handleSend = (text?: string) => {
    const messageText = text || inputValue
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    simulateAIResponse(messageText)
  }

  const renderServiceCards = (cards: ServiceCard[]) => (
    <div className="space-y-2 mt-2">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl border border-sky-100 overflow-hidden">
          <div className="bg-gradient-to-r from-sky-500 to-blue-500 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{card.icon}</span>
              <span className="text-white font-medium text-sm">{card.name}</span>
            </div>
          </div>
          <div className="p-3 space-y-2">
            <p className="text-xs text-muted-foreground">{card.description}</p>
            <div className="flex flex-wrap gap-1">
              {card.features.map((feature, i) => (
                <span key={i} className="text-xs bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
            <div className="flex gap-2 pt-2 border-t">
              {card.buttons.map((btn, i) => (
                <button
                  key={i}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 ${
                    btn.primary
                      ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white"
                      : "bg-gray-100 text-foreground"
                  }`}
                >
                  {btn.label}
                  <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderDoctorCards = (cards: DoctorCard[]) => (
    <div className="space-y-2 mt-2">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl border border-sky-100 p-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-sky-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{card.name}</span>
                <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">{card.title}</span>
              </div>
              <p className="text-xs text-muted-foreground">{card.department} · {card.hospital}</p>
            </div>
            {card.available ? (
              <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">可预约</span>
            ) : (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">已约满</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  const renderRecentCards = (cards: RecentServiceCard[]) => (
    <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
      {cards.map((card, index) => (
        <button
          key={index}
          className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-sky-100 min-w-[80px]"
        >
          <span className="text-2xl">{card.icon}</span>
          <span className="text-xs text-foreground">{card.name}</span>
        </button>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">城市服务助手</span>
          </div>
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            <Sparkles className="w-4 h-4" />
            <MoreHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Quick Nav Tabs */}
      <div className="bg-white border-b px-2 py-2">
        <div className="flex gap-1 overflow-x-auto">
          {quickNavTabs.map((tab) => (
            <button
              key={tab.id}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap bg-gray-100 text-muted-foreground"
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Welcome Section */}
        {messages.length === 0 && (
          <>
            <div className="flex flex-col items-center py-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mb-3">
                <Image
                  src="/images/ai-assistant-avatar.jpg"
                  alt="罗小i"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm max-w-[85%] text-center">
                <h2 className="text-lg font-bold text-sky-700 mb-1">Hi，我是罗小i</h2>
                <p className="text-sm text-muted-foreground">
                  我可以帮你快速找到城市服务入口，包括医院挂号、交通出行、生活缴费等。
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-sky-700">猜您想了解</span>
                <button onClick={refreshSuggestions} className="flex items-center gap-1 text-xs text-sky-500">
                  <RefreshCw className="w-3 h-3" />
                  换一换
                </button>
              </div>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(suggestion)}
                    className="w-full text-left px-3 py-2 bg-sky-50 hover:bg-sky-100 rounded-lg text-sm text-sky-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            {message.type === "ai" && (
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                <Image src="/images/ai-assistant-avatar.jpg" alt="AI" width={32} height={32} className="object-cover" />
              </div>
            )}
            <div className={`max-w-[80%] ${message.type === "user" ? "order-1" : ""}`}>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white"
                    : "bg-white shadow-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
              
              {message.cardType === "service" && renderServiceCards(message.cards as ServiceCard[])}
              {message.cardType === "doctor" && renderDoctorCards(message.cards as DoctorCard[])}
              {message.cardType === "recent" && renderRecentCards(message.cards as RecentServiceCard[])}
              
              {message.quickReplies && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(reply)}
                      className="px-3 py-1.5 bg-sky-100 hover:bg-sky-200 rounded-full text-xs text-sky-700 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image src="/images/ai-assistant-avatar.jpg" alt="AI" width={32} height={32} className="object-cover" />
            </div>
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full bg-sky-50 text-sky-500">
            <Mic className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="请输入您的问题..."
              className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
          <button
            onClick={() => handleSend()}
            className="p-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-500 text-white"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
