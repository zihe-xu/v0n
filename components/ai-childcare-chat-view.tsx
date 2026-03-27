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
  Users,
  Star,
  CheckCircle,
  Type,
  Sparkles,
  MoreHorizontal,
  Calendar,
  UtensilsCrossed,
  Baby,
  Building2,
  Shield,
  Eye,
  GraduationCap,
  Heart,
  Camera,
  Bed,
  TreePine,
  CalendarCheck,
  FileText,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  cards?: ChildcareCard[] | DetailCard | TeacherCard | EnvironmentCard | VisitCard | FeeCard | SafetyCard | RegistrationCard
  cardType?: "childcare" | "detail" | "teacher" | "environment" | "visit" | "fee" | "safety" | "registration"
  quickReplies?: string[]
}

interface ChildcareCard {
  name: string
  address: string
  distance: string
  ageRange: string
  hours?: string
  hasSpots?: boolean
}

interface DetailCard {
  name: string
  services: string[]
  hours: string
  ageRange: string
}

interface TeacherCard {
  total: number
  qualification: string
  ratio: string
  roles: { title: string; desc: string }[]
}

interface EnvironmentCard {
  name: string
  facilities: { icon: string; name: string }[]
  safety: string[]
}

interface VisitCard {
  name: string
  times: string[]
  duration: string
  selectedTime?: string
  confirmed?: boolean
}

interface FeeCard {
  name: string
  plans: { type: string; period: string; price: number; includes: string[] }[]
}

interface SafetyCard {
  measures: { icon: string; title: string; desc: string }[]
  monitoring: boolean
}

interface RegistrationCard {
  name: string
  childInfo?: { name: string; age: string }
  parentInfo?: { phone: string }
  type?: string
  confirmed?: boolean
}

// Quick nav tabs
const quickNavTabs = [
  { id: "venue", label: "场馆预约", icon: Building2 },
  { id: "activity", label: "活动报名", icon: Calendar },
  { id: "canteen", label: "社区食堂", icon: UtensilsCrossed },
  { id: "childcare", label: "托育服务", icon: Baby, active: true },
]

// Suggested questions
const defaultSuggestions = [
  "我孩子三岁，附近哪里可以托育？",
  "翠竹社区托育中心怎么样？",
  "托育费用多少钱一个月？",
  "托育中心的老师怎么样？",
]

export function AIChildcareChatView() {
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
      "我孩子三岁，附近哪里可以托育？",
      "翠竹社区托育中心怎么样？",
      "托育费用多少钱一个月？",
      "托育中心的老师怎么样？",
      "托育环境怎么样？",
      "可以预约参观吗？",
      "怎么报名托育？",
      "孩子安全怎么保障？",
    ]
    const shuffled = allSuggestions.sort(() => 0.5 - Math.random())
    setSuggestions(shuffled.slice(0, 4))
  }

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      let aiResponse: Message

      if (userMessage.includes("托育") && (userMessage.includes("附近") || userMessage.includes("哪里") || userMessage.includes("孩子"))) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我帮你找到了罗湖区附近适合的托育机构：",
          cardType: "childcare",
          cards: [
            {
              name: "翠竹社区托育中心",
              address: "罗湖区翠竹街道翠竹路",
              distance: "800米",
              ageRange: "2-4岁",
              hours: "08:30 - 17:30",
              hasSpots: true,
            },
            {
              name: "东湖社区托育园",
              address: "罗湖区爱国路",
              distance: "1.5公里",
              ageRange: "2-4岁",
            },
            {
              name: "莲塘幼儿托育中心",
              address: "罗湖区莲塘街道国威路",
              distance: "2.3公里",
              ageRange: "1.5-4岁",
            },
          ] as ChildcareCard[],
          quickReplies: ["了解翠竹托育中心", "查看师资", "预约参观"],
        }
      } else if (userMessage.includes("翠竹") || (userMessage.includes("托育") && userMessage.includes("什么"))) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "翠竹社区托育中心详情：",
          cardType: "detail",
          cards: {
            name: "翠竹社区托育中心",
            services: ["日间托育照护", "幼儿早教活动", "儿童游戏互动", "午休照看"],
            hours: "周一至周五 08:30 - 17:30",
            ageRange: "2 - 4岁儿童",
          } as DetailCard,
          quickReplies: ["查看师资", "查看环境", "预约参观", "了解费用"],
        }
      } else if (userMessage.includes("老师") || userMessage.includes("师资")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "翠竹社区托育中心师资情况：",
          cardType: "teacher",
          cards: {
            total: 8,
            qualification: "全部持有幼儿教育或保育员资格证",
            ratio: "1位老师照看4名孩子",
            roles: [
              { title: "主班老师", desc: "幼教专业本科" },
              { title: "保育老师", desc: "持证保育员" },
            ],
          } as TeacherCard,
          quickReplies: ["查看环境", "预约参观", "了解费用"],
        }
      } else if (userMessage.includes("环境")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "翠竹社区托育中心环境：",
          cardType: "environment",
          cards: {
            name: "翠竹社区托育中心",
            facilities: [
              { icon: "🧸", name: "儿童活动室" },
              { icon: "🛏", name: "午休室" },
              { icon: "🍽", name: "儿童餐厅" },
              { icon: "🌳", name: "室外活动区" },
            ],
            safety: ["全园监控", "门禁系统", "每日消毒"],
          } as EnvironmentCard,
          quickReplies: ["预约参观", "了解费用", "报名托育"],
        }
      } else if (userMessage.includes("参观") || userMessage.includes("看看")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "可以预约参观，以下是可选时间：",
          cardType: "visit",
          cards: {
            name: "翠竹社区托育中心",
            times: ["周三 10:00", "周四 14:00", "周五 10:00"],
            duration: "约30分钟",
          } as VisitCard,
          quickReplies: ["预约周三上午", "预约周四下午", "预约周五上午"],
        }
      } else if (userMessage.includes("周三")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "好的，确认预约信息：",
          cardType: "visit",
          cards: {
            name: "翠竹社区托育中心",
            times: [],
            duration: "约30分钟",
            selectedTime: "周三 10:00",
          } as VisitCard,
          quickReplies: ["确认预约", "换个时间"],
        }
      } else if (userMessage.includes("周四")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "好的，确认预约信息：",
          cardType: "visit",
          cards: {
            name: "翠竹社区托育中心",
            times: [],
            duration: "约30分钟",
            selectedTime: "周四 14:00",
          } as VisitCard,
          quickReplies: ["确认预约", "换个时间"],
        }
      } else if (userMessage.includes("确认预约")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "预约成功！",
          cardType: "visit",
          cards: {
            name: "翠竹社区托育中心",
            times: [],
            duration: "约30分钟",
            selectedTime: "周四 14:00",
            confirmed: true,
          } as VisitCard,
          quickReplies: ["了解费用", "报名托育", "查看地址"],
        }
      } else if (userMessage.includes("费用") || userMessage.includes("多少钱") || userMessage.includes("价格")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "翠竹社区托育中心收费标准：",
          cardType: "fee",
          cards: {
            name: "翠竹社区托育中心",
            plans: [
              { type: "半日托", period: "上午托育", price: 1500, includes: ["日常照护", "早教活动"] },
              { type: "全日托", period: "全天托育", price: 2800, includes: ["日常照护", "早教活动", "午餐和点心"] },
            ],
          } as FeeCard,
          quickReplies: ["报名全日托", "报名半日托", "预约参观"],
        }
      } else if (userMessage.includes("安全") || userMessage.includes("保障")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "托育中心提供多项安全保障：",
          cardType: "safety",
          cards: {
            measures: [
              { icon: "🛡", title: "入园实名登记", desc: "家长身份核验" },
              { icon: "👨‍👩‍👧", title: "家长接送制度", desc: "固定接送人员" },
              { icon: "📹", title: "24小时监控", desc: "家长可远程查看" },
              { icon: "🌡", title: "每日体温检测", desc: "健康管理" },
              { icon: "🧹", title: "定期卫生消毒", desc: "环境清洁" },
            ],
            monitoring: true,
          } as SafetyCard,
          quickReplies: ["预约参观", "报名托育", "了解费用"],
        }
      } else if (userMessage.includes("报名")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "可以为你办理托育报名，请选择托育方式：",
          cardType: "registration",
          cards: {
            name: "翠竹社区托育中心",
          } as RegistrationCard,
          quickReplies: ["全日托", "半日托"],
        }
      } else if (userMessage.includes("全日托") || userMessage.includes("半日托")) {
        const type = userMessage.includes("全日托") ? "全日托" : "半日托"
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: `好的，已选择${type}，请确认报名信息：`,
          cardType: "registration",
          cards: {
            name: "翠竹社区托育中心",
            childInfo: { name: "宝宝", age: "3岁" },
            parentInfo: { phone: "138****8888" },
            type: type,
          } as RegistrationCard,
          quickReplies: ["确认报名", "修改信息"],
        }
      } else if (userMessage.includes("确认报名")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "报名提交成功！",
          cardType: "registration",
          cards: {
            name: "翠竹社区托育中心",
            childInfo: { name: "宝宝", age: "3岁" },
            type: "全日托",
            confirmed: true,
          } as RegistrationCard,
          quickReplies: ["查看入托须知", "联系托育中心"],
        }
      } else {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我可以帮你查找附近的托育机构、了解师资环境、预约参观和办理报名。请问你需要什么帮助？",
          quickReplies: ["附近有什么托育机构？", "托育费用多少？", "怎么报名？"],
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

  const renderChildcareCards = (cards: ChildcareCard[]) => (
    <div className="space-y-2 mt-2">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">👶</span>
                <h4 className="font-bold text-sky-800 text-sm">{card.name}</h4>
                {card.hasSpots && (
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">有名额</span>
                )}
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
                    <Baby className="w-3 h-3 text-pink-500" />
                    {card.ageRange}
                  </span>
                </div>
                {card.hours && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-500" />
                    <span>{card.hours}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="flex-1 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-medium flex items-center justify-center gap-1">
              <Eye className="w-3 h-3" />
              查看详情
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

  const renderDetailCard = (card: DetailCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">👶</span>
        <h4 className="font-bold text-sky-800 text-sm">{card.name}</h4>
      </div>
      <div className="bg-pink-50 rounded-lg p-2.5 mb-2">
        <p className="text-xs font-medium text-pink-700 mb-1.5">托育服务内容：</p>
        <div className="grid grid-cols-2 gap-1">
          {card.services.map((service, i) => (
            <div key={i} className="flex items-center gap-1 text-xs text-pink-600">
              <Heart className="w-3 h-3" />
              {service}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-1 text-xs text-slate-600">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-sky-500" />
          服务时间：{card.hours}
        </div>
        <div className="flex items-center gap-1">
          <Baby className="w-3 h-3 text-pink-500" />
          适合年龄：{card.ageRange}
        </div>
      </div>
    </div>
  )

  const renderTeacherCard = (card: TeacherCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">👩‍🏫</span>
        <h4 className="font-bold text-sky-800 text-sm">师资力量</h4>
      </div>
      <div className="bg-blue-50 rounded-lg p-2.5 mb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-blue-700">托育老师</span>
          <span className="font-bold text-blue-800">{card.total}名</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-blue-600">
          <GraduationCap className="w-3 h-3" />
          {card.qualification}
        </div>
      </div>
      <div className="space-y-1.5">
        {card.roles.map((role, i) => (
          <div key={i} className="flex items-center justify-between text-xs bg-slate-50 rounded-lg px-2.5 py-1.5">
            <span className="text-slate-700">{role.title}</span>
            <span className="text-slate-500">{role.desc}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3 text-amber-600" />
          <span className="text-xs font-medium text-amber-700">师生比例：{card.ratio}</span>
        </div>
      </div>
    </div>
  )

  const renderEnvironmentCard = (card: EnvironmentCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">🏠</span>
        <h4 className="font-bold text-sky-800 text-sm">{card.name}环境</h4>
      </div>
      <div className="bg-green-50 rounded-lg p-2.5 mb-2">
        <p className="text-xs font-medium text-green-700 mb-1.5">设施配置：</p>
        <div className="grid grid-cols-2 gap-1.5">
          {card.facilities.map((item, i) => (
            <div key={i} className="flex items-center gap-1 text-xs text-green-600 bg-white rounded-lg px-2 py-1">
              <span>{item.icon}</span>
              {item.name}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-2.5">
        <p className="text-xs font-medium text-blue-700 mb-1.5">安全配置：</p>
        <div className="flex flex-wrap gap-1">
          {card.safety.map((item, i) => (
            <span key={i} className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              {item}
            </span>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-sky-500 mt-2 flex items-center gap-1">
        <Camera className="w-3 h-3" />
        家长可以预约参观托育环境
      </p>
    </div>
  )

  const renderVisitCard = (card: VisitCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      {card.confirmed ? (
        <>
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold">预约成功！</span>
          </div>
          <div className="p-2.5 bg-emerald-50 rounded-lg text-xs space-y-1.5 border border-emerald-100">
            <div className="font-medium text-emerald-800">👶 {card.name}</div>
            <div className="flex items-center gap-1 text-emerald-700">
              <CalendarCheck className="w-3 h-3" />
              参观时间：{card.selectedTime}
            </div>
            <div className="flex items-center gap-1 text-emerald-700">
              <Clock className="w-3 h-3" />
              参观时长：{card.duration}
            </div>
            <div className="flex items-center gap-1 text-emerald-700">
              <MapPin className="w-3 h-3" />
              地址：罗湖区翠竹街道翠竹路
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="flex-1 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-medium flex items-center justify-center gap-1">
              <Navigation className="w-3 h-3" />
              导航前往
            </button>
            <button className="flex-1 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium flex items-center justify-center gap-1">
              <Calendar className="w-3 h-3" />
              添加日历
            </button>
          </div>
        </>
      ) : card.selectedTime ? (
        <>
          <h4 className="font-bold text-sky-800 text-sm mb-2">确认预约参观</h4>
          <div className="p-2.5 bg-amber-50 rounded-lg text-xs space-y-1.5 border border-amber-100">
            <div className="font-medium text-amber-800">👶 {card.name}</div>
            <div className="flex items-center gap-1 text-amber-700">
              <Calendar className="w-3 h-3" />
              参观时间：{card.selectedTime}
            </div>
            <div className="flex items-center gap-1 text-amber-700">
              <Clock className="w-3 h-3" />
              参观时长：{card.duration}
            </div>
          </div>
          <button className="w-full mt-2 py-2 rounded-lg bg-sky-500 text-white text-xs font-medium">
            确认预约
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📅</span>
            <h4 className="font-bold text-sky-800 text-sm">预约参观 - {card.name}</h4>
          </div>
          <p className="text-xs text-slate-600 mb-2">每次参观约{card.duration}，可选时间：</p>
          <div className="space-y-1.5">
            {card.times.map((time, i) => (
              <button
                key={i}
                className="w-full py-2 rounded-lg border-2 border-sky-200 text-sky-700 text-xs font-medium hover:bg-sky-50 flex items-center justify-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                {time}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )

  const renderFeeCard = (card: FeeCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">💰</span>
        <h4 className="font-bold text-sky-800 text-sm">{card.name}收费标准</h4>
      </div>
      <div className="space-y-2">
        {card.plans.map((plan, i) => (
          <div key={i} className="p-2.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-amber-800 text-sm">👶 {plan.type}</span>
              <span className="text-lg font-bold text-amber-600">¥{plan.price}/月</span>
            </div>
            <p className="text-[10px] text-amber-600 mb-1">{plan.period}</p>
            <div className="flex flex-wrap gap-1">
              {plan.includes.map((item, j) => (
                <span key={j} className="text-[10px] bg-white text-amber-700 px-1.5 py-0.5 rounded">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSafetyCard = (card: SafetyCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">🛡</span>
        <h4 className="font-bold text-sky-800 text-sm">安全保障措施</h4>
      </div>
      <div className="space-y-1.5">
        {card.measures.map((item, i) => (
          <div key={i} className="flex items-center gap-2 bg-blue-50 rounded-lg px-2.5 py-2">
            <span className="text-base">{item.icon}</span>
            <div className="flex-1">
              <p className="text-xs font-medium text-blue-800">{item.title}</p>
              <p className="text-[10px] text-blue-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {card.monitoring && (
        <div className="mt-2 p-2 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg border border-emerald-100">
          <p className="text-xs text-emerald-700 flex items-center gap-1">
            <Camera className="w-3 h-3" />
            家长可以通过手机查看孩子在园情况
          </p>
        </div>
      )}
    </div>
  )

  const renderRegistrationCard = (card: RegistrationCard) => (
    <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
      {card.confirmed ? (
        <>
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold">报名提交成功！</span>
          </div>
          <div className="p-2.5 bg-emerald-50 rounded-lg text-xs space-y-1.5 border border-emerald-100">
            <div className="font-medium text-emerald-800">👶 {card.name}</div>
            <div className="text-emerald-700">托育类型：{card.type}</div>
            <div className="text-emerald-700">儿童信息：{card.childInfo?.name}（{card.childInfo?.age}）</div>
          </div>
          <p className="text-[10px] text-sky-500 mt-2">工作人员将在1-2个工作日内联系您确认入托事宜</p>
          <div className="flex gap-2 mt-2">
            <button className="flex-1 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-medium flex items-center justify-center gap-1">
              <FileText className="w-3 h-3" />
              入托须知
            </button>
            <button className="flex-1 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium flex items-center justify-center gap-1">
              <Phone className="w-3 h-3" />
              联系中心
            </button>
          </div>
        </>
      ) : card.type ? (
        <>
          <h4 className="font-bold text-sky-800 text-sm mb-2">确认报名信息</h4>
          <div className="p-2.5 bg-amber-50 rounded-lg text-xs space-y-1.5 border border-amber-100">
            <div className="font-medium text-amber-800">👶 {card.name}</div>
            <div className="text-amber-700">托育类型：{card.type}</div>
            <div className="text-amber-700">儿童姓名：{card.childInfo?.name}</div>
            <div className="text-amber-700">儿童年龄：{card.childInfo?.age}</div>
            <div className="text-amber-700">联系电话：{card.parentInfo?.phone}</div>
          </div>
          <button className="w-full mt-2 py-2 rounded-lg bg-sky-500 text-white text-xs font-medium">
            确认报名
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📝</span>
            <h4 className="font-bold text-sky-800 text-sm">托育报名 - {card.name}</h4>
          </div>
          <p className="text-xs text-slate-600 mb-2">请选择托育方式：</p>
          <div className="space-y-1.5">
            <button className="w-full py-2.5 rounded-lg border-2 border-sky-200 text-sky-700 text-xs font-medium hover:bg-sky-50 flex items-center justify-center gap-2">
              <span>☀️</span>
              全日托 - ¥2800/月
            </button>
            <button className="w-full py-2.5 rounded-lg border-2 border-sky-200 text-sky-700 text-xs font-medium hover:bg-sky-50 flex items-center justify-center gap-2">
              <span>🌤</span>
              半日托 - ¥1500/月
            </button>
          </div>
        </>
      )}
    </div>
  )

  const renderCards = (message: Message) => {
    if (!message.cards) return null
    
    switch (message.cardType) {
      case "childcare":
        return renderChildcareCards(message.cards as ChildcareCard[])
      case "detail":
        return renderDetailCard(message.cards as DetailCard)
      case "teacher":
        return renderTeacherCard(message.cards as TeacherCard)
      case "environment":
        return renderEnvironmentCard(message.cards as EnvironmentCard)
      case "visit":
        return renderVisitCard(message.cards as VisitCard)
      case "fee":
        return renderFeeCard(message.cards as FeeCard)
      case "safety":
        return renderSafetyCard(message.cards as SafetyCard)
      case "registration":
        return renderRegistrationCard(message.cards as RegistrationCard)
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
        <h1 className="font-semibold">罗小i - 托育助手</h1>
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
                  您的专属托育助手，我可以帮您查找托育机构、了解师资环境、预约参观！
                </p>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-sky-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-sky-700 flex items-center gap-1">
                  <Baby className="w-4 h-4" />
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
