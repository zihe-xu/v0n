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
  Type,
  Check,
  CircleDollarSign,
  CalendarDays,
  MapPinned,
  Star,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  cards?: VenueCard[] | TimeSlotsCard | BookingCard | SuccessCard
  cardType?: "venues" | "timeslots" | "booking" | "success"
  quickReplies?: string[]
}

interface VenueCard {
  name: string
  address: string
  distance: string
  courts: number
  rating: number
  availableTimes?: string[]
}

interface TimeSlotsCard {
  venueName: string
  date: string
  slots: { time: string; price: number; status: "available" | "booked"; recommended?: boolean }[]
}

interface BookingCard {
  venue: string
  date: string
  time: string
  court: string
  price: number
}

interface SuccessCard {
  venue: string
  date: string
  time: string
  court: string
  address: string
}

const quickNavTabs = [
  { id: "venue", label: "场馆预约", icon: Building2, active: true },
  { id: "activity", label: "活动报名", icon: Calendar },
  { id: "canteen", label: "社区食堂", icon: UtensilsCrossed },
  { id: "childcare", label: "托育服务", icon: Baby },
]

const defaultSuggestions = [
  "我想去打羽毛球，附近哪里有场地？",
  "今晚想打羽毛球，帮我找个场地",
  "罗湖体育馆有羽毛球场吗？",
  "附近有什么运动场馆？",
]

export function AISportsChatView() {
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
      "我想去打羽毛球，附近哪里有场地？",
      "今晚想打羽毛球，帮我找个场地",
      "罗湖体育馆有羽毛球场吗？",
      "附近有什么运动场馆？",
      "帮我预约明天的篮球场",
      "东湖体育中心怎么预约？",
      "查看我的预约记录",
      "附近哪里有游泳池？",
    ]
    const shuffled = allSuggestions.sort(() => 0.5 - Math.random())
    setSuggestions(shuffled.slice(0, 4))
  }

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      let aiResponse: Message

      if (userMessage.includes("羽毛球") && (userMessage.includes("附近") || userMessage.includes("哪里") || userMessage.includes("找"))) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "帮你找到罗湖区附近的羽毛球场馆：",
          cardType: "venues",
          cards: [
            {
              name: "罗湖体育馆",
              address: "罗湖区人民南路2008号",
              distance: "1.2公里",
              courts: 8,
              rating: 4.8,
              availableTimes: ["今晚19:00", "今晚20:00"],
            },
            {
              name: "东湖体育中心",
              address: "罗湖区爱国路4008号",
              distance: "2.5公里",
              courts: 6,
              rating: 4.6,
              availableTimes: ["今晚18:00", "今晚21:00"],
            },
            {
              name: "莲塘文体中心",
              address: "罗湖区莲塘街道国威路",
              distance: "3.8公里",
              courts: 4,
              rating: 4.5,
            },
          ] as VenueCard[],
          quickReplies: ["预约罗湖体育馆", "查看东湖体育中心", "今晚有空位吗"],
        }
      } else if (userMessage.includes("预约") || userMessage.includes("罗湖体育馆")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "罗湖体育馆今天的羽毛球场可预约时段：",
          cardType: "timeslots",
          cards: {
            venueName: "罗湖体育馆",
            date: "2026年3月9日（今天）",
            slots: [
              { time: "18:00 - 19:00", price: 60, status: "booked" },
              { time: "19:00 - 20:00", price: 80, status: "available", recommended: true },
              { time: "20:00 - 21:00", price: 80, status: "available" },
              { time: "21:00 - 22:00", price: 60, status: "available" },
            ],
          } as TimeSlotsCard,
          quickReplies: ["预约19:00-20:00", "换一天", "查看其他场馆"],
        }
      } else if (userMessage.includes("19:00") || userMessage.includes("确认")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "请确认你的预约信息：",
          cardType: "booking",
          cards: {
            venue: "罗湖体育馆",
            date: "2026年3月9日（今天）",
            time: "19:00 - 20:00",
            court: "羽毛球场3号场",
            price: 80,
          } as BookingCard,
          quickReplies: ["确认预约", "修改时间", "取消"],
        }
      } else if (userMessage.includes("确认预约")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "预约成功！",
          cardType: "success",
          cards: {
            venue: "罗湖体育馆",
            date: "2026年3月9日（今天）",
            time: "19:00 - 20:00",
            court: "羽毛球场3号场",
            address: "罗湖区人民南路2008号",
          } as SuccessCard,
          quickReplies: ["导航过去", "添加到日历", "我的预约"],
        }
      } else {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我是罗小i，你的场馆预约助手。我可以帮你：\n\n• 查找附近运动场馆\n• 查看可预约时段\n• 在线预约场地\n• 查询预约记录\n\n请问想预约什么运动场地？",
          quickReplies: ["羽毛球场", "篮球场", "游泳池", "健身房"],
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

  const renderVenueCards = (cards: VenueCard[]) => (
    <div className="space-y-2 mt-2">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl border border-sky-100 p-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm">{card.name}</h4>
                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs text-amber-600">{card.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <MapPin className="w-3 h-3" />
                <span>{card.address}</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-sky-600">{card.distance}</span>
                <span className="text-xs text-muted-foreground">{card.courts}块场地</span>
              </div>
              {card.availableTimes && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {card.availableTimes.map((time, i) => (
                    <span key={i} className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
                      {time}可约
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button className="w-full mt-2 py-1.5 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-lg text-xs font-medium">
            查看可预约时段
          </button>
        </div>
      ))}
    </div>
  )

  const renderTimeSlotsCard = (card: TimeSlotsCard) => (
    <div className="bg-white rounded-xl border border-sky-100 overflow-hidden mt-2">
      <div className="bg-gradient-to-r from-sky-500 to-blue-500 px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium text-sm">{card.venueName}</span>
          <span className="text-white/80 text-xs">{card.date}</span>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {card.slots.map((slot, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-2 rounded-lg ${
              slot.status === "booked" ? "bg-gray-100" : slot.recommended ? "bg-sky-50 border border-sky-200" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className={`text-sm ${slot.status === "booked" ? "text-muted-foreground line-through" : ""}`}>
                {slot.time}
              </span>
              {slot.recommended && (
                <span className="text-xs bg-sky-500 text-white px-1.5 py-0.5 rounded">推荐</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${slot.status === "booked" ? "text-muted-foreground" : "text-sky-600"}`}>
                ¥{slot.price}
              </span>
              {slot.status === "booked" ? (
                <span className="text-xs text-muted-foreground">已约满</span>
              ) : (
                <button className="text-xs bg-sky-500 text-white px-3 py-1 rounded-full">预约</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderBookingCard = (card: BookingCard) => (
    <div className="bg-white rounded-xl border border-sky-100 overflow-hidden mt-2">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-white" />
          <span className="text-white font-medium text-sm">预约确认</span>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">场馆</span>
          <span className="font-medium">{card.venue}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">日期</span>
          <span>{card.date}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">时间</span>
          <span>{card.time}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">场地</span>
          <span>{card.court}</span>
        </div>
        <div className="flex items-center justify-between text-sm pt-2 border-t">
          <span className="text-muted-foreground">费用</span>
          <span className="text-lg font-bold text-sky-600">¥{card.price}</span>
        </div>
      </div>
    </div>
  )

  const renderSuccessCard = (card: SuccessCard) => (
    <div className="bg-white rounded-xl border border-sky-100 overflow-hidden mt-2">
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-medium">预约成功</span>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">场馆</span>
          <span className="font-medium">{card.venue}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">日期</span>
          <span>{card.date}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">时间</span>
          <span>{card.time}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">场地</span>
          <span>{card.court}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2 border-t">
          <MapPin className="w-3 h-3" />
          <span>{card.address}</span>
        </div>
        <div className="flex gap-2 pt-2">
          <button className="flex-1 py-2 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-lg text-xs flex items-center justify-center gap-1">
            <Navigation className="w-3 h-3" />
            导航
          </button>
          <button className="flex-1 py-2 bg-gray-100 text-foreground rounded-lg text-xs flex items-center justify-center gap-1">
            <Calendar className="w-3 h-3" />
            添加日历
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">场馆预约助手</span>
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
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${
                tab.active 
                  ? "bg-sky-500 text-white" 
                  : "bg-gray-100 text-muted-foreground"
              }`}
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
                  你的场馆预约助手，帮你查找和预约运动场地！
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
              
              {message.cardType === "venues" && renderVenueCards(message.cards as VenueCard[])}
              {message.cardType === "timeslots" && renderTimeSlotsCard(message.cards as TimeSlotsCard)}
              {message.cardType === "booking" && renderBookingCard(message.cards as BookingCard)}
              {message.cardType === "success" && renderSuccessCard(message.cards as SuccessCard)}
              
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
