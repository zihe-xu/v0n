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
  Users,
  CheckCircle,
  Type,
  Sparkles,
  MoreHorizontal,
  Calendar,
  UtensilsCrossed,
  Baby,
  Building2,
  Ticket,
  CalendarCheck,
  Star,
  Tag,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  cards?: ActivityCard[] | DetailCard | ConfirmCard | SuccessCard
  cardType?: "activities" | "detail" | "confirm" | "success"
  quickReplies?: string[]
}

interface ActivityCard {
  id: string
  title: string
  icon: string
  date: string
  time: string
  location: string
  audience: string
  spots?: number
  fee?: string
  tags?: string[]
}

interface DetailCard {
  title: string
  icon: string
  content: string[]
  date: string
  time: string
  location: string
  audience: string
  spots: number
  fee: string
  organizer?: string
}

interface ConfirmCard {
  title: string
  icon: string
  date: string
  time: string
  location: string
  fee: string
}

interface SuccessCard {
  title: string
  icon: string
  date: string
  time: string
  location: string
  code: string
}

// Quick nav tabs
const quickNavTabs = [
  { id: "venue", label: "场馆预约", icon: Building2 },
  { id: "activity", label: "活动报名", icon: Calendar, active: true },
  { id: "canteen", label: "社区食堂", icon: UtensilsCrossed },
  { id: "childcare", label: "托育服务", icon: Baby },
]

// Suggested questions
const defaultSuggestions = [
  "最近有什么活动可以参加？",
  "有没有适合亲子的活动？",
  "周末有什么活动推荐？",
  "有什么运动类的活动？",
]

export function AIActivityChatView() {
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
      "最近有什么活动可以参加？",
      "有没有适合亲子的活动？",
      "周末有什么活动推荐？",
      "有什么运动类的活动？",
      "有免费的活动吗？",
      "有什么读书分享会？",
      "附近有什么活动？",
      "有什么手工活动？",
    ]
    const shuffled = allSuggestions.sort(() => 0.5 - Math.random())
    setSuggestions(shuffled.slice(0, 4))
  }

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      let aiResponse: Message

      if (userMessage.includes("活动") && (userMessage.includes("最近") || userMessage.includes("有什么") || userMessage.includes("参加"))) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我帮你找到了罗湖区近期可以参加的活动：",
          cardType: "activities",
          cards: [
            {
              id: "1",
              title: "亲子手工DIY活动",
              icon: "🎨",
              date: "3月15日",
              time: "10:00-12:00",
              location: "罗湖区文化馆",
              audience: "亲子家庭",
              spots: 20,
              fee: "免费",
              tags: ["亲子", "手工"],
            },
            {
              id: "2",
              title: "羽毛球交流活动",
              icon: "🏸",
              date: "3月16日",
              time: "19:00-21:00",
              location: "罗湖体育馆",
              audience: "运动爱好者",
              spots: 30,
              fee: "免费",
              tags: ["运动", "社交"],
            },
            {
              id: "3",
              title: "读书分享会：城市与阅读",
              icon: "📚",
              date: "3月18日",
              time: "19:30-21:00",
              location: "罗湖图书馆",
              audience: "阅读爱好者",
              spots: 50,
              fee: "免费",
              tags: ["阅读", "分享"],
            },
          ] as ActivityCard[],
          quickReplies: ["了解亲子手工详情", "了解羽毛球活动", "了解读书分享会"],
        }
      } else if (userMessage.includes("亲子")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我帮你找到了几个适合亲子参加的活动：",
          cardType: "activities",
          cards: [
            {
              id: "1",
              title: "亲子手工创意DIY",
              icon: "🎨",
              date: "3月15日",
              time: "10:00-12:00",
              location: "罗湖区文化馆",
              audience: "6-12岁儿童家庭",
              spots: 20,
              fee: "免费",
              tags: ["亲子", "手工", "创意"],
            },
            {
              id: "2",
              title: "儿童科学实验课堂",
              icon: "🧪",
              date: "3月16日",
              time: "14:00-16:00",
              location: "罗湖青少年活动中心",
              audience: "5-10岁儿童",
              spots: 15,
              fee: "¥30/人",
              tags: ["亲子", "科学", "教育"],
            },
            {
              id: "3",
              title: "亲子自然探索活动",
              icon: "🌳",
              date: "3月17日",
              time: "09:30-11:30",
              location: "东湖公园",
              audience: "亲子家庭",
              spots: 25,
              fee: "免费",
              tags: ["亲子", "户外", "自然"],
            },
          ] as ActivityCard[],
          quickReplies: ["了解手工DIY详情", "了解科学实验", "了解自然探索"],
        }
      } else if (userMessage.includes("周末")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "周末罗湖区有这些精彩活动：",
          cardType: "activities",
          cards: [
            {
              id: "1",
              title: "亲子手工DIY",
              icon: "🎨",
              date: "周六",
              time: "10:00-12:00",
              location: "罗湖文化馆",
              audience: "亲子家庭",
              spots: 20,
              fee: "免费",
              tags: ["周末", "亲子"],
            },
            {
              id: "2",
              title: "读书分享会",
              icon: "📚",
              date: "周六",
              time: "19:30-21:00",
              location: "罗湖图书馆",
              audience: "阅读爱好者",
              spots: 50,
              fee: "免费",
              tags: ["周末", "阅读"],
            },
            {
              id: "3",
              title: "羽毛球交流活动",
              icon: "🏸",
              date: "周日",
              time: "19:00-21:00",
              location: "罗湖体育馆",
              audience: "运动爱好者",
              spots: 30,
              fee: "免费",
              tags: ["周末", "运动"],
            },
          ] as ActivityCard[],
          quickReplies: ["报名手工DIY", "报名读书分享", "报名羽毛球"],
        }
      } else if (userMessage.includes("运动") || userMessage.includes("羽毛球")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "这是羽毛球交流活动的详情：",
          cardType: "detail",
          cards: {
            title: "羽毛球交流活动",
            icon: "🏸",
            content: ["羽毛球友谊赛", "技术交流指导", "自由对打"],
            date: "3月16日",
            time: "19:00-21:00",
            location: "罗湖体育馆羽毛球馆",
            audience: "运动爱好者",
            spots: 30,
            fee: "免费",
            organizer: "罗湖区体育局",
          } as DetailCard,
          quickReplies: ["立即报名", "查看其他活动"],
        }
      } else if (userMessage.includes("手工") || userMessage.includes("DIY")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "这是亲子手工DIY活动的详情：",
          cardType: "detail",
          cards: {
            title: "亲子手工创意DIY",
            icon: "🎨",
            content: ["彩绘陶瓷制作", "创意手工折纸", "亲子互动游戏"],
            date: "3月15日",
            time: "10:00-12:00",
            location: "罗湖区文化馆3楼",
            audience: "6-12岁儿童家庭",
            spots: 20,
            fee: "免费",
            organizer: "罗湖区文化馆",
          } as DetailCard,
          quickReplies: ["立即报名", "查看其他活动"],
        }
      } else if (userMessage.includes("读书") || userMessage.includes("分享会")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "这是读书分享会的详情：",
          cardType: "detail",
          cards: {
            title: "读书分享会：城市与阅读",
            icon: "📚",
            content: ["嘉宾主题分享", "读者交流互动", "好书推荐环节"],
            date: "3月18日",
            time: "19:30-21:00",
            location: "罗湖图书馆报告厅",
            audience: "阅读爱好者",
            spots: 50,
            fee: "免费",
            organizer: "罗湖区图书馆",
          } as DetailCard,
          quickReplies: ["立即报名", "查看其他活动"],
        }
      } else if (userMessage.includes("报名") && !userMessage.includes("确认")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "好的，我为你提交报名信息，请确认：",
          cardType: "confirm",
          cards: {
            title: "羽毛球交流活动",
            icon: "🏸",
            date: "3月16日",
            time: "19:00-21:00",
            location: "罗湖体育馆羽毛球馆",
            fee: "免费",
          } as ConfirmCard,
          quickReplies: ["确认报名", "取消"],
        }
      } else if (userMessage.includes("确认")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "报名成功！",
          cardType: "success",
          cards: {
            title: "羽毛球交流活动",
            icon: "🏸",
            date: "3月16日",
            time: "19:00-21:00",
            location: "罗湖体育馆羽毛球馆",
            code: "HD20240316001",
          } as SuccessCard,
          quickReplies: ["查看更多活动", "添加到日历"],
        }
      } else {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我可以帮你查找和报名罗湖区的各类活动。你可以问我「最近有什么活动」「有没有亲子活动」「周末活动推荐」等问题。",
          quickReplies: ["最近有什么活动？", "有没有亲子活动？", "周末活动推荐"],
        }
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    simulateAIResponse(messageText)
  }

  const renderActivityCards = (cards: ActivityCard[]) => (
    <div className="space-y-2 mt-2">
      {cards.map((card) => (
        <div key={card.id} className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm">
          <div className="flex items-start gap-2">
            <span className="text-2xl">{card.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-sky-800 text-sm">{card.title}</h4>
                {card.spots && (
                  <span className="shrink-0 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-medium">
                    剩{card.spots}位
                  </span>
                )}
              </div>
              <div className="mt-1.5 space-y-0.5 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-sky-500" />
                  <span>{card.date} {card.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-500" />
                  <span>{card.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-sky-500" />
                    {card.audience}
                  </span>
                  <span className="flex items-center gap-1">
                    <Ticket className="w-3 h-3 text-sky-500" />
                    {card.fee}
                  </span>
                </div>
              </div>
              {card.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {card.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="flex-1 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-medium flex items-center justify-center gap-1">
              <Ticket className="w-3 h-3" />
              查看详情
            </button>
            <button className="flex-1 py-1.5 rounded-lg bg-primary text-white text-xs font-medium flex items-center justify-center gap-1">
              <CalendarCheck className="w-3 h-3" />
              立即报名
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  const renderDetailCard = (card: DetailCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{card.icon}</span>
        <h4 className="font-bold text-sky-800">{card.title}</h4>
      </div>
      <div className="bg-sky-50 rounded-lg p-2.5 mb-3">
        <p className="text-xs font-medium text-sky-700 mb-1.5">活动内容：</p>
        <div className="space-y-1">
          {card.content.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-sky-600">
              <span className="w-1 h-1 rounded-full bg-sky-400" />
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-1.5 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-sky-500" />
          <span>时间：{card.date} {card.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-sky-500" />
          <span>地点：{card.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-sky-500" />
          <span>对象：{card.audience}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 text-sky-500" />
          <span>名额：限{card.spots}人</span>
        </div>
        <div className="flex items-center gap-2">
          <Ticket className="w-3.5 h-3.5 text-sky-500" />
          <span>费用：{card.fee}</span>
        </div>
        {card.organizer && (
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-sky-500" />
            <span>主办：{card.organizer}</span>
          </div>
        )}
      </div>
      <button className="w-full mt-3 py-2.5 rounded-lg bg-gradient-to-r from-primary to-orange-500 text-white text-sm font-medium shadow-sm flex items-center justify-center gap-1">
        <CalendarCheck className="w-4 h-4" />
        立即报名
      </button>
    </div>
  )

  const renderConfirmCard = (card: ConfirmCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      <h4 className="font-bold text-sky-800 text-sm mb-2">确认报名信息</h4>
      <div className="p-2.5 bg-amber-50 rounded-lg text-xs space-y-1.5 border border-amber-100">
        <div className="flex items-center gap-2">
          <span className="text-xl">{card.icon}</span>
          <span className="font-medium text-amber-800">{card.title}</span>
        </div>
        <div className="flex items-center gap-1 text-amber-700">
          <Calendar className="w-3 h-3" />
          时间：{card.date} {card.time}
        </div>
        <div className="flex items-center gap-1 text-amber-700">
          <MapPin className="w-3 h-3" />
          地点：{card.location}
        </div>
        <div className="flex items-center gap-1 text-amber-700">
          <Ticket className="w-3 h-3" />
          费用：{card.fee}
        </div>
      </div>
      <p className="text-xs text-sky-600 mt-2 mb-3">是否确认报名？</p>
      <div className="flex gap-2">
        <button className="flex-1 py-2 border border-sky-200 text-sky-600 rounded-lg text-sm font-medium">
          取消
        </button>
        <button className="flex-1 py-2 bg-gradient-to-r from-primary to-orange-500 text-white rounded-lg text-sm font-medium">
          确认报名
        </button>
      </div>
    </div>
  )

  const renderSuccessCard = (card: SuccessCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      <div className="flex items-center justify-center gap-2 text-emerald-600 mb-3">
        <CheckCircle className="w-6 h-6" />
        <span className="font-bold text-lg">报名成功！</span>
      </div>
      <div className="p-2.5 bg-emerald-50 rounded-lg text-xs space-y-1.5 border border-emerald-100">
        <div className="flex items-center gap-2">
          <span className="text-xl">{card.icon}</span>
          <span className="font-medium text-emerald-800">{card.title}</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-700">
          <Calendar className="w-3 h-3" />
          {card.date} {card.time}
        </div>
        <div className="flex items-center gap-1 text-emerald-700">
          <MapPin className="w-3 h-3" />
          {card.location}
        </div>
        <div className="pt-1.5 mt-1.5 border-t border-emerald-200">
          <span className="text-emerald-600">报名编号：</span>
          <span className="font-mono font-bold text-emerald-800">{card.code}</span>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button className="flex-1 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-medium flex items-center justify-center gap-1">
          <Navigation className="w-3 h-3" />
          导航前往
        </button>
        <button className="flex-1 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium flex items-center justify-center gap-1">
          <Calendar className="w-3 h-3" />
          添加日历
        </button>
      </div>
    </div>
  )

  const renderCards = (message: Message) => {
    if (!message.cards) return null
    
    switch (message.cardType) {
      case "activities":
        return renderActivityCards(message.cards as ActivityCard[])
      case "detail":
        return renderDetailCard(message.cards as DetailCard)
      case "confirm":
        return renderConfirmCard(message.cards as ConfirmCard)
      case "success":
        return renderSuccessCard(message.cards as SuccessCard)
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sky-100 via-sky-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white px-4 py-3 flex items-center justify-between">
        <button className="w-8 h-8 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="font-semibold">罗小i - 活动助手</h1>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center">
            <Type className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Nav Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-sky-100 px-3 py-2">
        <div className="flex justify-between gap-2">
          {quickNavTabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-xl ${
                tab.active
                  ? "bg-gradient-to-br from-sky-400 to-blue-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Welcome Section */}
        {messages.length === 0 && (
          <>
            <div className="flex flex-col items-center pt-2 pb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mb-3">
                <Image
                  src="/images/ai-assistant-avatar.jpg"
                  alt="罗小i"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-sm border border-sky-100 text-center max-w-[260px]">
                <h2 className="text-lg font-bold text-sky-700 mb-1">Hi，我是罗小i</h2>
                <p className="text-xs text-sky-600/80">
                  您的专属活动助手，我可以帮您查找活动、了解详情、一键报名！
                </p>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-sky-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-sky-700 flex items-center gap-1">
                  <Ticket className="w-4 h-4" />
                  猜您想了解
                </h3>
                <button
                  onClick={refreshSuggestions}
                  className="text-xs text-sky-500 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  换一换
                </button>
              </div>
              <div className="space-y-2">
                {suggestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(question)}
                    className="w-full text-left text-xs text-sky-700/80 bg-sky-50/80 hover:bg-sky-100 rounded-xl px-3 py-2.5 transition-colors border border-sky-100"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Chat Messages */}
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === "user" ? (
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[80%] shadow-sm">
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                  <Image
                    src="/images/ai-assistant-avatar.jpg"
                    alt="罗小i"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  {message.content && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-tl-md px-4 py-2.5 shadow-sm border border-sky-100 max-w-[90%]">
                      <p className="text-sm text-sky-800">{message.content}</p>
                    </div>
                  )}
                  
                  {renderCards(message)}

                  {/* Quick Replies */}
                  {message.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {message.quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleSend(reply)}
                          className="text-xs bg-white border border-sky-200 text-sky-600 rounded-full px-3 py-1.5 hover:bg-sky-50 transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
              <Image
                src="/images/ai-assistant-avatar.jpg"
                alt="罗小i"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-sky-100">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-sky-100 p-3">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
            <Mic className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="请输入您的问题..."
              className="w-full px-4 py-2.5 bg-sky-50 border border-sky-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
