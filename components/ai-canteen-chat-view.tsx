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
  ShoppingCart,
  Truck,
  Store,
  Star,
  Users,
  Percent,
  Leaf,
  CheckCircle,
  Package,
  Type,
  Sparkles,
  MoreHorizontal,
  Calendar,
  UtensilsCrossed,
  Baby,
  Building2,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  cards?: CanteenCard[] | MenuCard[] | OrderCard | DeliveryCard | DiscountCard
  cardType?: "canteen" | "menu" | "order" | "delivery" | "discount"
  quickReplies?: string[]
}

interface CanteenCard {
  name: string
  address: string
  distance: string
  hours: string
  currentDiners?: number
  hasSeats?: boolean
  recommended?: string[]
}

interface MenuItem {
  name: string
  price: number
  icon: string
  isHealthy?: boolean
}

interface MenuCard {
  canteenName: string
  staples: string[]
  dishes: MenuItem[]
  soups: MenuItem[]
  combo: {
    name: string
    price: number
    items: string[]
  }
}

interface OrderCard {
  comboName: string
  items: string[]
  price: number
  deliveryOptions?: { type: string; label: string }[]
  confirmed?: boolean
  deliveryAddress?: string
  deliveryTime?: string
  deliveryFee?: string
}

interface DeliveryCard {
  comboName: string
  status: string
  distance: string
  eta: string
}

interface DiscountCard {
  policies: { title: string; description: string; discount: string }[]
}

// Quick nav tabs
const quickNavTabs = [
  { id: "venue", label: "场馆预约", icon: Building2 },
  { id: "activity", label: "活动报名", icon: Calendar },
  { id: "canteen", label: "社区食堂", icon: UtensilsCrossed, active: true },
  { id: "childcare", label: "托育服务", icon: Baby },
]

// Suggested questions
const defaultSuggestions = [
  "我想吃饭，附近哪里有社区食堂？",
  "翠竹社区食堂今天有什么菜？",
  "社区食堂有什么优惠政策？",
  "有没有清淡一点的菜？",
]

export function AICanteenChatView() {
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
      "我想吃饭，附近哪里有社区食堂？",
      "翠竹社区食堂今天有什么菜？",
      "帮我点一份鸡腿套餐",
      "社区食堂有什么优惠政策？",
      "有没有清淡一点的菜？",
      "我的餐送到哪里了？",
      "能不能送餐到家？",
      "长者用餐有优惠吗？",
    ]
    const shuffled = allSuggestions.sort(() => 0.5 - Math.random())
    setSuggestions(shuffled.slice(0, 4))
  }

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      let aiResponse: Message

      if (userMessage.includes("吃饭") || userMessage.includes("食堂") && userMessage.includes("附近")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我帮你找到了罗湖区附近的社区食堂：",
          cardType: "canteen",
          cards: [
            {
              name: "翠竹社区食堂",
              address: "罗湖区翠竹街道翠竹路",
              distance: "600米",
              hours: "11:00 - 19:00",
              currentDiners: 25,
              hasSeats: true,
              recommended: ["红烧鸡腿套餐 ¥18", "土豆牛肉套餐 ¥20"],
            },
            {
              name: "东门社区长者食堂",
              address: "罗湖区东门街道人民北路",
              distance: "1.2公里",
              hours: "10:30 - 18:30",
            },
            {
              name: "莲塘社区食堂",
              address: "罗湖区莲塘街道国威路",
              distance: "2公里",
              hours: "11:00 - 19:00",
            },
          ] as CanteenCard[],
          quickReplies: ["查看翠竹食堂菜单", "帮我导航", "有什么优惠？"],
        }
      } else if (userMessage.includes("菜") || userMessage.includes("菜单")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "这是翠竹社区食堂今日菜单：",
          cardType: "menu",
          cards: [{
            canteenName: "翠竹社区食堂",
            staples: ["米饭", "杂粮饭"],
            dishes: [
              { name: "清炒时蔬", price: 6, icon: "🥬", isHealthy: true },
              { name: "红烧鸡腿", price: 12, icon: "🍗" },
              { name: "土豆烧牛肉", price: 15, icon: "🥩" },
              { name: "番茄炒蛋", price: 8, icon: "🍳", isHealthy: true },
            ],
            soups: [{ name: "紫菜蛋花汤", price: 3, icon: "🥣" }],
            combo: {
              name: "健康午餐套餐",
              price: 18,
              items: ["米饭", "红烧鸡腿", "时蔬", "汤"],
            },
          }] as MenuCard[],
          quickReplies: ["点鸡腿套餐", "有清淡的菜吗？", "能送餐吗？"],
        }
      } else if (userMessage.includes("点") && (userMessage.includes("套餐") || userMessage.includes("鸡腿"))) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "好的，我帮你确认订单：",
          cardType: "order",
          cards: {
            comboName: "健康午餐套餐",
            items: ["米饭", "红烧鸡腿", "清炒时蔬", "紫菜蛋花汤"],
            price: 18,
            deliveryOptions: [
              { type: "pickup", label: "到店取餐" },
              { type: "delivery", label: "预约送餐" },
            ],
          } as OrderCard,
          quickReplies: ["到店取餐", "送餐到家"],
        }
      } else if (userMessage.includes("送") || userMessage.includes("配送") || userMessage.includes("送餐")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "可以为你安排社区送餐服务，请确认送餐信息：",
          cardType: "order",
          cards: {
            comboName: "健康午餐套餐",
            items: ["米饭", "红烧鸡腿", "清炒时蔬", "紫菜蛋花汤"],
            price: 18,
            confirmed: false,
            deliveryAddress: "罗湖区翠竹花园3栋",
            deliveryTime: "约30分钟",
            deliveryFee: "长者用户免费，普通用户¥3",
          } as OrderCard,
          quickReplies: ["确认下单", "修改地址", "到店取餐"],
        }
      } else if (userMessage.includes("确认")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "订单已提交！",
          cardType: "order",
          cards: {
            comboName: "健康午餐套餐",
            items: ["米饭", "红烧鸡腿", "清炒时蔬", "紫菜蛋花汤"],
            price: 18,
            confirmed: true,
            deliveryAddress: "罗湖区翠竹花园3栋",
            deliveryTime: "约30分钟送达",
          } as OrderCard,
          quickReplies: ["查看订单进度", "联系配送员"],
        }
      } else if (userMessage.includes("送到哪") || userMessage.includes("进度") || userMessage.includes("配送")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "你的订单正在配送中：",
          cardType: "delivery",
          cards: {
            comboName: "健康午餐套餐",
            status: "配送中",
            distance: "800米",
            eta: "10分钟",
          } as DeliveryCard,
          quickReplies: ["联系配送员", "查看订单详情"],
        }
      } else if (userMessage.includes("优惠") || userMessage.includes("折扣")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "社区食堂目前有以下优惠政策：",
          cardType: "discount",
          cards: {
            policies: [
              { title: "长者优惠", description: "60岁以上长者用餐", discount: "8折" },
              { title: "特殊群体优惠", description: "低保或残障人士", discount: "6折" },
              { title: "社区套餐", description: "午餐套餐", discount: "18元起" },
            ],
          } as DiscountCard,
          quickReplies: ["推荐套餐", "查看菜单", "帮我点餐"],
        }
      } else if (userMessage.includes("清淡") || userMessage.includes("健康")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "有的，我给你推荐几道清淡菜品：",
          cardType: "menu",
          cards: [{
            canteenName: "清淡推荐",
            staples: ["杂粮饭"],
            dishes: [
              { name: "清炒时蔬", price: 6, icon: "🥬", isHealthy: true },
              { name: "番茄炒蛋", price: 8, icon: "🍳", isHealthy: true },
            ],
            soups: [{ name: "紫菜蛋花汤", price: 3, icon: "🥣" }],
            combo: {
              name: "清淡健康套餐",
              price: 15,
              items: ["杂粮饭", "清炒时蔬", "番茄炒蛋", "紫菜汤"],
            },
          }] as MenuCard[],
          quickReplies: ["点清淡套餐", "看其他菜品", "能送餐吗？"],
        }
      } else if (userMessage.includes("到店") || userMessage.includes("去店里")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "好的，这是翠竹社区食堂的信息：",
          cardType: "canteen",
          cards: [{
            name: "翠竹社区食堂",
            address: "罗湖区翠竹街道翠竹路",
            distance: "600米",
            hours: "11:00 - 19:00",
            currentDiners: 25,
            hasSeats: true,
          }] as CanteenCard[],
          quickReplies: ["帮我导航", "查看菜单", "有什么推荐？"],
        }
      } else {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我可以帮你查找附近的社区食堂、查看菜单、点餐和预约送餐服务。请问你需要什么帮助？",
          quickReplies: ["附近有什么食堂？", "查看菜单", "有什么优惠？"],
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

  const renderCanteenCards = (cards: CanteenCard[]) => (
    <div className="space-y-2 mt-2">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">🍚</span>
                <h4 className="font-bold text-sky-800 text-sm">{card.name}</h4>
              </div>
              <div className="mt-1.5 space-y-0.5 text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-500" />
                  <span>{card.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-sky-500" />
                    {card.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-500" />
                    {card.hours}
                  </span>
                </div>
                {card.currentDiners && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-sky-500" />
                      用餐人数：约{card.currentDiners}人
                    </span>
                    {card.hasSeats && (
                      <span className="text-emerald-600 text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">有空位</span>
                    )}
                  </div>
                )}
              </div>
              {card.recommended && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {card.recommended.map((item, i) => (
                    <span key={i} className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="flex-1 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-medium flex items-center justify-center gap-1">
              <UtensilsCrossed className="w-3 h-3" />
              查看菜单
            </button>
            <button className="flex-1 py-1.5 rounded-lg bg-sky-100 text-sky-700 text-xs font-medium flex items-center justify-center gap-1">
              <Navigation className="w-3 h-3" />
              导航
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  const renderMenuCard = (cards: MenuCard[]) => (
    <div className="space-y-2 mt-2">
      {cards.map((menu, index) => (
        <div key={index} className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm">
          <h4 className="font-bold text-sky-800 text-sm flex items-center gap-2">
            🍱 {menu.canteenName} 今日菜单
          </h4>
          
          <div className="mt-2 text-xs">
            <div className="text-slate-500 mb-1">主食：{menu.staples.join("、")}</div>
            
            <div className="space-y-1 mt-2">
              {menu.dishes.map((dish, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="flex items-center gap-1.5">
                    <span>{dish.icon}</span>
                    <span className="text-slate-700">{dish.name}</span>
                    {dish.isHealthy && (
                      <Leaf className="w-3 h-3 text-emerald-500" />
                    )}
                  </span>
                  <span className="text-amber-600 font-medium">¥{dish.price}</span>
                </div>
              ))}
              {menu.soups.map((soup, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="flex items-center gap-1.5">
                    <span>{soup.icon}</span>
                    <span className="text-slate-700">{soup.name}</span>
                  </span>
                  <span className="text-amber-600 font-medium">¥{soup.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-700">{menu.combo.name}</span>
                  <div className="text-[10px] text-amber-600 mt-0.5">
                    {menu.combo.items.join(" + ")}
                  </div>
                </div>
                <span className="text-lg font-bold text-amber-600">¥{menu.combo.price}</span>
              </div>
            </div>
          </div>

          <button className="w-full mt-2 py-2 rounded-lg bg-sky-500 text-white text-xs font-medium flex items-center justify-center gap-1">
            <ShoppingCart className="w-3 h-3" />
            点这个套餐
          </button>
        </div>
      ))}
    </div>
  )

  const renderOrderCard = (card: OrderCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      {card.confirmed ? (
        <>
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold">订单已提交！</span>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg text-xs space-y-1">
            <div className="font-medium text-slate-800">🍱 {card.comboName}</div>
            <div className="text-slate-500">{card.items.join("、")}</div>
            <div className="text-amber-600 font-bold">¥{card.price}</div>
            <div className="border-t border-slate-200 pt-1 mt-1">
              <div className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-3 h-3" />
                {card.deliveryAddress}
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <Clock className="w-3 h-3" />
                {card.deliveryTime}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="flex-1 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-medium">
              查看订单进度
            </button>
            <button className="flex-1 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium flex items-center justify-center gap-1">
              <Phone className="w-3 h-3" />
              联系配送员
            </button>
          </div>
        </>
      ) : card.deliveryAddress ? (
        <>
          <h4 className="font-bold text-sky-800 text-sm mb-2">确认送餐信息</h4>
          <div className="p-2 bg-slate-50 rounded-lg text-xs space-y-1.5">
            <div className="font-medium text-slate-800">🍱 {card.comboName} - ¥{card.price}</div>
            <div className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3 h-3 text-sky-500" />
              送餐地址：{card.deliveryAddress}
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <Clock className="w-3 h-3 text-sky-500" />
              预计送达：{card.deliveryTime}
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <Truck className="w-3 h-3 text-sky-500" />
              配送费：{card.deliveryFee}
            </div>
          </div>
          <button className="w-full mt-2 py-2 rounded-lg bg-sky-500 text-white text-xs font-medium">
            确认下单
          </button>
        </>
      ) : (
        <>
          <h4 className="font-bold text-sky-800 text-sm mb-2">订单确认</h4>
          <div className="p-2 bg-slate-50 rounded-lg text-xs space-y-1">
            <div className="font-medium text-slate-800">🍱 {card.comboName}</div>
            <div className="text-slate-500">{card.items.join("、")}</div>
            <div className="text-amber-600 font-bold text-base">¥{card.price}</div>
          </div>
          {card.deliveryOptions && (
            <div className="mt-2 space-y-1.5">
              <div className="text-xs text-slate-600 font-medium">选择取餐方式：</div>
              <div className="flex gap-2">
                {card.deliveryOptions.map((opt, i) => (
                  <button
                    key={i}
                    className="flex-1 py-2 rounded-lg border-2 border-sky-200 text-sky-700 text-xs font-medium flex items-center justify-center gap-1 hover:bg-sky-50"
                  >
                    {opt.type === "pickup" ? <Store className="w-3 h-3" /> : <Truck className="w-3 h-3" />}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )

  const renderDeliveryCard = (card: DeliveryCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
          <Truck className="w-4 h-4 text-sky-600" />
        </div>
        <div>
          <div className="font-bold text-sky-800 text-sm">{card.comboName}</div>
          <div className="text-[10px] text-emerald-600">{card.status}</div>
        </div>
      </div>
      <div className="p-2 bg-gradient-to-r from-sky-50 to-cyan-50 rounded-lg">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-600">
            <Package className="w-3 h-3 text-sky-500" />
            已从翠竹社区食堂出发
          </div>
        </div>
        <div className="flex items-center justify-between mt-1 text-xs">
          <span className="text-slate-600">距离你约 {card.distance}</span>
          <span className="font-bold text-sky-600">预计 {card.eta} 送达</span>
        </div>
      </div>
      <button className="w-full mt-2 py-2 rounded-lg bg-emerald-500 text-white text-xs font-medium flex items-center justify-center gap-1">
        <Phone className="w-3 h-3" />
        联系配送员
      </button>
    </div>
  )

  const renderDiscountCard = (card: DiscountCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      <h4 className="font-bold text-sky-800 text-sm flex items-center gap-2 mb-2">
        <Percent className="w-4 h-4 text-amber-500" />
        优惠政策
      </h4>
      <div className="space-y-2">
        {card.policies.map((policy, i) => (
          <div key={i} className="flex items-center justify-between p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
            <div>
              <div className="font-medium text-slate-800 text-xs">{policy.title}</div>
              <div className="text-[10px] text-slate-500">{policy.description}</div>
            </div>
            <span className="text-amber-600 font-bold text-sm">{policy.discount}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMessageCards = (message: Message) => {
    if (!message.cards) return null

    switch (message.cardType) {
      case "canteen":
        return renderCanteenCards(message.cards as CanteenCard[])
      case "menu":
        return renderMenuCard(message.cards as MenuCard[])
      case "order":
        return renderOrderCard(message.cards as OrderCard)
      case "delivery":
        return renderDeliveryCard(message.cards as DeliveryCard)
      case "discount":
        return renderDiscountCard(message.cards as DiscountCard)
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sky-50 via-sky-50/50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-bold">罗小i</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Type className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Nav Tabs */}
      <div className="bg-white border-b border-sky-100 px-2 py-2">
        <div className="flex gap-1">
          {quickNavTabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                tab.active
                  ? "bg-sky-500 text-white"
                  : "bg-sky-50 text-sky-600 hover:bg-sky-100"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {messages.length === 0 ? (
          <>
            {/* Welcome */}
            <div className="flex flex-col items-center pt-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mb-3">
                <Image
                  src="/images/ai-assistant-avatar.jpg"
                  alt="罗小i"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-sky-100 text-center max-w-[85%]">
                <h2 className="text-lg font-bold text-sky-700 mb-1">Hi，我是罗小i</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  您的社区食堂智能助手，我可以帮您查找附近食堂、查看菜单、点餐和预约送餐！
                </p>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-sky-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-sky-700">猜您想了解</span>
                <button
                  onClick={refreshSuggestions}
                  className="text-xs text-sky-500 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  换一换
                </button>
              </div>
              <div className="space-y-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="w-full text-left p-2.5 rounded-xl bg-gradient-to-r from-sky-50 to-cyan-50 text-xs text-slate-700 hover:from-sky-100 hover:to-cyan-100 transition-all border border-sky-100"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] ${
                    message.type === "user"
                      ? "bg-sky-500 text-white rounded-2xl rounded-tr-sm px-3 py-2"
                      : ""
                  }`}
                >
                  {message.type === "ai" && (
                    <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm border border-sky-100">
                      <p className="text-sm text-slate-700">{message.content}</p>
                      {renderMessageCards(message)}
                      {message.quickReplies && (
                        <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-100">
                          {message.quickReplies.map((reply, i) => (
                            <button
                              key={i}
                              onClick={() => handleSend(reply)}
                              className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-600 text-[10px] font-medium hover:bg-sky-100"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {message.type === "user" && (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-sky-100">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-sky-100 p-3">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500">
            <Mic className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="请输入您的问题..."
              className="w-full px-4 py-2.5 rounded-full bg-sky-50 border border-sky-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 flex items-center justify-center text-white shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
