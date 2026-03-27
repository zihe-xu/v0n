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
  Star,
  Camera,
  Route,
  TreePine,
  Store,
  Coffee,
  ShoppingBag,
  Music,
  Utensils,
  Type,
  Heart,
  ThumbsUp,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  cards?: AttractionCard[] | FoodCard[] | RouteCard | ReviewCard
  cardType?: "attraction" | "food" | "route" | "review"
  quickReplies?: string[]
}

interface AttractionCard {
  name: string
  image: string
  address: string
  rating: number
  hours?: string
  tags: string[]
  description: string
}

interface FoodCard {
  name: string
  image: string
  address: string
  rating: number
  hours?: string
  priceRange?: string
  recommended: string[]
}

interface RouteCard {
  title: string
  duration: string
  stops: { name: string; type: string; duration?: string }[]
}

interface ReviewCard {
  storeName: string
  rating: number
  reviews: { content: string; rating: number }[]
  popularDishes?: string[]
}

const quickNavTabs = [
  { id: "venue", label: "场馆预约", icon: Building2 },
  { id: "activity", label: "活动报名", icon: Calendar },
  { id: "canteen", label: "社区食堂", icon: UtensilsCrossed },
  { id: "childcare", label: "托育服务", icon: Baby },
]

const defaultSuggestions = [
  "我附近有什么景点？",
  "附近有什么好吃的？",
  "帮我推荐一条逛街路线",
  "哪里适合拍照打卡？",
]

export function AIExploreChatView() {
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
      "我附近有什么景点？",
      "附近有什么好吃的？",
      "帮我推荐一条逛街路线",
      "哪里适合拍照打卡？",
      "东门老街有什么店？",
      "万象城有什么美食？",
      "周末去哪里玩？",
      "亲子活动推荐",
    ]
    const shuffled = allSuggestions.sort(() => 0.5 - Math.random())
    setSuggestions(shuffled.slice(0, 4))
  }

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      let aiResponse: Message

      if (userMessage.includes("景点") || userMessage.includes("好玩") || userMessage.includes("附近")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我帮你找到了罗湖区附近几个热门景点：",
          cardType: "attraction",
          cards: [
            {
              name: "东湖公园",
              image: "/images/venue-library.jpg",
              address: "罗湖区爱国路4006号",
              rating: 4.6,
              hours: "06:00 - 23:00",
              tags: ["免费", "湖景", "骑行"],
              description: "深圳大型综合公园，湖景优美，适合散步、骑行、野餐",
            },
            {
              name: "东门老街",
              image: "/images/venue-museum.jpg",
              address: "罗湖区东门步行街",
              rating: 4.5,
              tags: ["购物", "美食", "网红打卡"],
              description: "深圳最热闹的商业街之一，适合逛街和品尝小吃",
            },
            {
              name: "深圳儿童公园",
              image: "/images/activity-science.jpg",
              address: "罗湖区童乐路12号",
              rating: 4.4,
              tags: ["亲子", "免费", "游乐设施"],
              description: "适合亲子游玩、休闲散步的城市公园",
            },
          ] as AttractionCard[],
          quickReplies: ["推荐游玩路线", "附近美食", "怎么去东湖公园"],
        }
      } else if (userMessage.includes("好吃") || userMessage.includes("美食") || userMessage.includes("餐厅")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "根据大家的评价，我给你推荐几家罗湖区热门美食店：",
          cardType: "food",
          cards: [
            {
              name: "蘩楼",
              image: "/images/activity-health.jpg",
              address: "罗湖万象城",
              rating: 4.7,
              hours: "10:00 - 22:00",
              priceRange: "¥80-120/人",
              recommended: ["虾饺", "叉烧包", "凤爪"],
            },
            {
              name: "潮汕牛肉火锅",
              image: "/images/activity-volunteer.jpg",
              address: "东门老街",
              rating: 4.6,
              hours: "11:00 - 23:00",
              priceRange: "¥100-150/人",
              recommended: ["手切牛肉", "牛肉丸", "牛腩"],
            },
            {
              name: "喜茶",
              image: "/images/hero-banner.jpg",
              address: "万象城",
              rating: 4.5,
              hours: "10:00 - 22:00",
              priceRange: "¥20-35/杯",
              recommended: ["芝士葡萄", "芝士茉莉绿茶"],
            },
          ] as FoodCard[],
          quickReplies: ["蘩楼评价怎么样", "规划美食路线", "还有什么推荐"],
        }
      } else if (userMessage.includes("路线") || userMessage.includes("逛街")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "给你推荐一条罗湖热门行街路线：",
          cardType: "route",
          cards: {
            title: "罗湖经典半日游",
            duration: "约3-4小时",
            stops: [
              { name: "东门老街", type: "购物", duration: "1.5小时" },
              { name: "万象城", type: "美食+购物", duration: "1.5小时" },
              { name: "东湖公园", type: "休闲", duration: "1小时" },
            ],
          } as RouteCard,
          quickReplies: ["查看路线地图", "每个地点怎么去", "还有其他路线吗"],
        }
      } else if (userMessage.includes("评价") || userMessage.includes("怎么样")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "蘩楼用户评价：",
          cardType: "review",
          cards: {
            storeName: "蘩楼",
            rating: 4.7,
            reviews: [
              { content: "点心很正宗，虾饺很好吃。", rating: 5 },
              { content: "环境不错，适合朋友聚餐。", rating: 4 },
              { content: "广式早茶体验很好，推荐！", rating: 5 },
            ],
            popularDishes: ["虾饺", "凤爪", "叉烧包", "肠粉"],
          } as ReviewCard,
          quickReplies: ["帮我订位", "导航过去", "看看其他店"],
        }
      } else if (userMessage.includes("拍照") || userMessage.includes("打卡")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "给你推荐几个罗湖拍照打卡点：",
          cardType: "attraction",
          cards: [
            {
              name: "东门老街夜景街区",
              image: "/images/venue-museum.jpg",
              address: "东门步行街",
              rating: 4.5,
              tags: ["夜景", "霓虹灯", "网红"],
              description: "复古霓虹街景，超适合拍照",
            },
            {
              name: "万象城艺术装置",
              image: "/images/hero-banner.jpg",
              address: "万象城",
              rating: 4.6,
              tags: ["艺术", "现代", "室内"],
              description: "现代艺术装置，出片效果好",
            },
            {
              name: "东湖公园湖景栈道",
              image: "/images/venue-library.jpg",
              address: "东湖公园",
              rating: 4.7,
              tags: ["自然", "湖景", "日落"],
              description: "自然风景，适合拍日落",
            },
          ] as AttractionCard[],
          quickReplies: ["规划打卡路线", "什么时间去最好", "还有其他推荐吗"],
        }
      } else {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我是罗小i，你的城市探索助手！我可以帮你：\n\n• 发现附近景点\n• 推荐热门美食\n• 规划游玩路线\n• 查看店铺评价\n\n请问想去哪里逛逛？",
          quickReplies: ["附近有什么景点", "推荐美食", "逛街路线", "拍照打卡点"],
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

  const renderAttractionCards = (cards: AttractionCard[]) => (
    <div className="space-y-2 mt-2">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl border border-sky-100 overflow-hidden">
          <div className="relative h-24">
            <Image src={card.image} alt={card.name} fill className="object-cover" />
            <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="text-xs font-medium">{card.rating}</span>
            </div>
          </div>
          <div className="p-3 space-y-2">
            <h4 className="font-medium text-sm">{card.name}</h4>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{card.address}</span>
            </div>
            {card.hours && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{card.hours}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-1">
              {card.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-1.5 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-lg text-xs flex items-center justify-center gap-1">
                <Navigation className="w-3 h-3" />
                导航
              </button>
              <button className="flex-1 py-1.5 bg-gray-100 text-foreground rounded-lg text-xs flex items-center justify-center gap-1">
                <Heart className="w-3 h-3" />
                收藏
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderFoodCards = (cards: FoodCard[]) => (
    <div className="space-y-2 mt-2">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl border border-sky-100 overflow-hidden">
          <div className="flex">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image src={card.image} alt={card.name} fill className="object-cover" />
            </div>
            <div className="flex-1 p-2 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{card.name}</h4>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-medium">{card.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{card.address}</span>
              </div>
              {card.priceRange && (
                <p className="text-xs text-orange-600">{card.priceRange}</p>
              )}
              <div className="flex flex-wrap gap-1">
                {card.recommended.slice(0, 3).map((dish, i) => (
                  <span key={i} className="text-xs bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded">
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderRouteCard = (card: RouteCard) => (
    <div className="bg-white rounded-xl border border-sky-100 overflow-hidden mt-2">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Route className="w-4 h-4 text-white" />
            <span className="text-white font-medium text-sm">{card.title}</span>
          </div>
          <span className="text-white/90 text-xs">{card.duration}</span>
        </div>
      </div>
      <div className="p-3">
        <div className="space-y-3">
          {card.stops.map((stop, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                {index < card.stops.length - 1 && (
                  <div className="w-0.5 h-8 bg-emerald-200 mt-1" />
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{stop.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{stop.type}</span>
                </div>
                {stop.duration && (
                  <p className="text-xs text-muted-foreground mt-1">建议游玩 {stop.duration}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1">
          <Navigation className="w-3 h-3" />
          开始导航
        </button>
      </div>
    </div>
  )

  const renderReviewCard = (card: ReviewCard) => (
    <div className="bg-white rounded-xl border border-sky-100 overflow-hidden mt-2">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium text-sm">{card.storeName} 用户评价</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-white fill-white" />
            <span className="text-white font-bold">{card.rating}</span>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-3">
        {card.reviews.map((review, index) => (
          <div key={index} className="flex items-start gap-2">
            <ThumbsUp className="w-4 h-4 text-amber-500 mt-0.5" />
            <p className="text-sm text-foreground flex-1">{review.content}</p>
          </div>
        ))}
        {card.popularDishes && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">人气菜品</p>
            <div className="flex flex-wrap gap-1">
              {card.popularDishes.map((dish, i) => (
                <span key={i} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                  {dish}
                </span>
              ))}
            </div>
          </div>
        )}
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
            <span className="font-medium">行街指南助手</span>
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
                  你的城市探索助手，帮你发现附近好玩好吃的地方！
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
              
              {message.cardType === "attraction" && renderAttractionCards(message.cards as AttractionCard[])}
              {message.cardType === "food" && renderFoodCards(message.cards as FoodCard[])}
              {message.cardType === "route" && renderRouteCard(message.cards as RouteCard)}
              {message.cardType === "review" && renderReviewCard(message.cards as ReviewCard)}
              
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
