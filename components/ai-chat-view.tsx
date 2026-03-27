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
  Phone,
  Building2,
  Calendar,
  UtensilsCrossed,
  Baby,
  Sparkles,
  MoreHorizontal,
  Type,
  TreePine,
  Hospital,
  Toilet,
  Heart,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  cards?: LocationCard[]
  quickReplies?: string[]
}

interface LocationCard {
  name: string
  type: string
  distance: string
  address: string
  openTime?: string
}

const quickNavTabs = [
  { id: "venue", label: "场馆预约", icon: Building2 },
  { id: "activity", label: "活动报名", icon: Calendar },
  { id: "canteen", label: "社区食堂", icon: UtensilsCrossed },
  { id: "childcare", label: "托育服务", icon: Baby },
]

const defaultSuggestions = [
  "附近有什么公园？",
  "最近的医院在哪里？",
  "附近哪里有公厕？",
  "找母婴室",
]

export function AIChatView() {
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
      "附近有什么公园？",
      "最近的医院在哪里？",
      "附近哪里有公厕？",
      "找母婴室",
      "罗湖有什么好玩的？",
      "附近哪里可以停车？",
      "社区服务中心在哪？",
      "怎么办理居住证？",
    ]
    const shuffled = allSuggestions.sort(() => 0.5 - Math.random())
    setSuggestions(shuffled.slice(0, 4))
  }

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      let aiResponse: Message

      if (userMessage.includes("公园")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "帮你找到罗湖区附近的几个公园：",
          cards: [
            {
              name: "深圳市儿童公园",
              type: "公园",
              distance: "约800米",
              address: "罗湖区童乐路12号",
              openTime: "06:00 - 23:00",
            },
            {
              name: "东湖公园",
              type: "公园",
              distance: "约2.3公里",
              address: "罗湖区爱国路4006号",
              openTime: "06:00 - 23:00",
            },
            {
              name: "洪湖公园",
              type: "公园",
              distance: "约3.1公里",
              address: "罗湖区洪湖路",
              openTime: "06:00 - 22:00",
            },
          ],
          quickReplies: ["怎么去东湖公园", "公园有什么好玩的", "附近美食"],
        }
      } else if (userMessage.includes("医院")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "为你找到罗湖区附近的医院：",
          cards: [
            {
              name: "罗湖区人民医院",
              type: "三甲医院",
              distance: "约1.2公里",
              address: "罗湖区友谊路47号",
              openTime: "24小时急诊",
            },
            {
              name: "深圳市第二人民医院",
              type: "三甲医院",
              distance: "约2.8公里",
              address: "罗湖区笋岗东路3002号",
              openTime: "24小时急诊",
            },
          ],
          quickReplies: ["预约挂号", "怎么去罗湖医院", "医院科室"],
        }
      } else if (userMessage.includes("公厕") || userMessage.includes("厕所") || userMessage.includes("卫生间")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "为你找到附近的公共卫生间：",
          cards: [
            {
              name: "东门步行街公厕",
              type: "公共卫生间",
              distance: "约200米",
              address: "东门步行街北侧",
              openTime: "06:00 - 23:00",
            },
            {
              name: "万象城商场洗手间",
              type: "商场卫生间",
              distance: "约350米",
              address: "万象城B1层",
              openTime: "10:00 - 22:00",
            },
          ],
          quickReplies: ["导航过去", "还有其他的吗"],
        }
      } else if (userMessage.includes("母婴")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "为你找到附近的母婴室：",
          cards: [
            {
              name: "万象城母婴室",
              type: "商场母婴室",
              distance: "约350米",
              address: "万象城L2层",
              openTime: "10:00 - 22:00",
            },
            {
              name: "东门茂业母婴室",
              type: "商场母婴室",
              distance: "约500米",
              address: "东门茂业3层",
              openTime: "10:00 - 22:00",
            },
          ],
          quickReplies: ["导航过去", "有哺乳室吗"],
        }
      } else {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我是罗小i，你的专属智能政务助手。我可以帮你：\n\n• 查找附近便民设施\n• 查询政务服务信息\n• 推荐社区活动\n• 解答生活问题\n\n请问有什么可以帮你的？",
          quickReplies: ["附近有什么公园", "最近的医院", "怎么办居住证", "社区活动"],
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

  const renderLocationCards = (cards: LocationCard[]) => (
    <div className="space-y-2 mt-2">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl border border-sky-100 p-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm">{card.name}</h4>
                <span className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full">{card.type}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <MapPin className="w-3 h-3" />
                <span>{card.address}</span>
              </div>
              {card.openTime && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{card.openTime}</span>
                </div>
              )}
            </div>
            <div className="text-right">
              <span className="text-xs text-sky-600 font-medium">{card.distance}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-2 pt-2 border-t">
            <button className="flex-1 py-1.5 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-lg text-xs flex items-center justify-center gap-1">
              <Navigation className="w-3 h-3" />
              导航
            </button>
            <button className="flex-1 py-1.5 bg-gray-100 text-foreground rounded-lg text-xs flex items-center justify-center gap-1">
              <Phone className="w-3 h-3" />
              电话
            </button>
          </div>
        </div>
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
            <span className="font-medium">罗小i</span>
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
                  你的专属智能政务助手，您可以问我问题，我会尽力帮您解答！
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
              
              {message.cards && renderLocationCards(message.cards)}
              
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
