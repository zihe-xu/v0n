"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  Send,
  Mic,
  RefreshCw,
  FileText,
  Clock,
  CheckCircle,
  Building2,
  Calendar,
  UtensilsCrossed,
  Baby,
  Sparkles,
  MoreHorizontal,
  AlertCircle,
  Wallet,
  Home,
  Briefcase,
  FileCheck,
  ClipboardList,
  MessageSquare,
  Eye,
  Edit3,
  Bell,
  CreditCard,
  Type,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  cards?: SubsidyCard[] | FormCard | TicketCard | ProgressCard
  cardType?: "subsidy" | "form" | "ticket" | "progress"
  quickReplies?: string[]
}

interface SubsidyCard {
  name: string
  target: string
  amount: string
  duration?: string
  requirements?: string[]
}

interface FormCard {
  title: string
  fields: { label: string; value?: string; placeholder?: string }[]
  department: string
}

interface TicketCard {
  type: string
  ticketNo: string
  department: string
  status: string
  estimatedTime: string
  content?: string
}

interface ProgressCard {
  ticketNo: string
  status: string
  department: string
  latestUpdate: string
  estimatedCompletion: string
  timeline?: { time: string; event: string; done: boolean }[]
}

const quickNavTabs = [
  { id: "venue", label: "场馆预约", icon: Building2 },
  { id: "activity", label: "活动报名", icon: Calendar },
  { id: "canteen", label: "社区食堂", icon: UtensilsCrossed },
  { id: "childcare", label: "托育服务", icon: Baby },
]

const defaultSuggestions = [
  "我听说有社区补贴，怎么申请？",
  "我想投诉小区噪音问题",
  "帮我查一下投诉处理情况",
  "居住证怎么办理？",
]

export function AIGovernmentChatView() {
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
      "我听说有社区补贴，怎么申请？",
      "租房补贴怎么申请？",
      "我想投诉小区噪音问题",
      "帮我查一下投诉处理情况",
      "居住证怎么办理？",
      "社保怎么查询？",
      "医保报销政策是什么？",
      "怎么预约政务大厅？",
    ]
    const shuffled = allSuggestions.sort(() => 0.5 - Math.random())
    setSuggestions(shuffled.slice(0, 4))
  }

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true)
    
    setTimeout(() => {
      let aiResponse: Message

      if (userMessage.includes("补贴") && !userMessage.includes("租房")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "目前罗湖区提供多种补贴服务，我为你整理如下：",
          cardType: "subsidy",
          cards: [
            {
              name: "就业补贴",
              target: "应届毕业生或就业困难人员",
              amount: "最高3000元/月",
              requirements: ["深圳户籍或居住证", "就业满6个月"],
            },
            {
              name: "租房补贴",
              target: "符合条件的青年人才",
              amount: "最高1500元/月",
              duration: "最长3年",
              requirements: ["年龄45岁以下", "无自有住房"],
            },
            {
              name: "育儿补贴",
              target: "0-3岁儿童家庭",
              amount: "每月500-1000元",
              requirements: ["罗湖区户籍", "有0-3岁儿童"],
            },
          ] as SubsidyCard[],
          quickReplies: ["了解租房补贴", "申请就业补贴", "查看育儿补贴"],
        }
      } else if (userMessage.includes("租房") && userMessage.includes("补贴")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "好的，我为你介绍人才租房补贴详情：",
          cardType: "subsidy",
          cards: [{
            name: "人才租房补贴",
            target: "符合条件的青年人才",
            amount: "每月最高1500元",
            duration: "最长可申请3年",
            requirements: [
              "在深圳就业",
              "年龄45岁以下",
              "无自有住房",
              "社保连续缴纳6个月以上",
            ],
          }] as SubsidyCard[],
          quickReplies: ["帮我填写申请", "查看申请进度", "咨询其他补贴"],
        }
      } else if (userMessage.includes("填写") || userMessage.includes("申请") && userMessage.includes("帮")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "好的，请填写以下申请信息：",
          cardType: "form",
          cards: {
            title: "人才租房补贴申请",
            fields: [
              { label: "姓名", placeholder: "请输入姓名" },
              { label: "身份证号", placeholder: "请输入身份证号" },
              { label: "当前居住地址", placeholder: "请输入居住地址" },
              { label: "工作单位", placeholder: "请输入工作单位" },
              { label: "联系电话", placeholder: "请输入手机号" },
            ],
            department: "罗湖区人社局",
          } as FormCard,
          quickReplies: ["确认提交", "修改信息", "暂不申请"],
        }
      } else if (userMessage.includes("提交") || userMessage.includes("确认")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "申请已提交成功！",
          cardType: "ticket",
          cards: {
            type: "人才租房补贴申请",
            ticketNo: "LH20260309001",
            department: "罗湖区人社局",
            status: "已受理",
            estimatedTime: "5个工作日",
          } as TicketCard,
          quickReplies: ["查看办理进度", "咨询其他业务", "返回首页"],
        }
      } else if (userMessage.includes("投诉") && !userMessage.includes("查")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我可以帮你提交民意速办工单。请描述你的问题，例如：\n\n• 问题类型（噪音/环境/安全等）\n• 发生时间\n• 具体地点\n• 问题详情",
          quickReplies: ["晚上施工噪音扰民", "小区垃圾未清理", "路灯损坏"],
        }
      } else if (userMessage.includes("噪音") || userMessage.includes("施工")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我帮你整理了投诉信息：",
          cardType: "ticket",
          cards: {
            type: "民意速办投诉",
            ticketNo: "",
            department: "城市管理局",
            status: "待确认",
            estimatedTime: "1-3个工作日",
            content: "问题类型：噪音扰民\n发生时间：夜间施工\n地点：罗湖区XX小区附近",
          } as TicketCard,
          quickReplies: ["确认提交", "补充信息", "取消投诉"],
        }
      } else if (userMessage.includes("查") && (userMessage.includes("投诉") || userMessage.includes("进度"))) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我帮你查询到了最新工单进度：",
          cardType: "progress",
          cards: {
            ticketNo: "MY20260309002",
            status: "处理中",
            department: "罗湖区城管局",
            latestUpdate: "工作人员已联系施工单位进行整改",
            estimatedCompletion: "预计今天内处理完成",
            timeline: [
              { time: "03-09 09:00", event: "工单提交成功", done: true },
              { time: "03-09 10:30", event: "城管局已受理", done: true },
              { time: "03-09 14:00", event: "现场核实中", done: true },
              { time: "预计今日", event: "处理完成", done: false },
            ],
          } as ProgressCard,
          quickReplies: ["补充信息", "催办处理", "完成时通知我"],
        }
      } else if (userMessage.includes("居住证")) {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "办理深圳居住证需要满足以下条件：\n\n**申请条件**\n• 在深圳居住\n• 已办理居住登记满12个月\n\n**办理方式**\n1. 线上申请（深圳公安微信公众号）\n2. 政务大厅现场办理\n\n我可以帮你在线办理居住证申请，需要现在办理吗？",
          quickReplies: ["在线办理", "预约政务大厅", "查看所需材料"],
        }
      } else {
        aiResponse = {
          id: Date.now().toString(),
          type: "ai",
          content: "我是罗小i，你的智能政务助手。我可以帮你：\n\n• 咨询各类补贴政策\n• 提交民意速办投诉\n• 查询办理进度\n• 办理证件业务\n\n请问有什么可以帮你的？",
          quickReplies: ["查询补贴政策", "我要投诉", "办理居住证", "查询办理进度"],
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

  const renderSubsidyCards = (cards: SubsidyCard[]) => (
    <div className="space-y-2 mt-2">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl border border-sky-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">{card.name}</span>
            </div>
          </div>
          <div className="p-3 space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>适合人群：{card.target}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-500" />
              <span className="font-bold text-emerald-600">{card.amount}</span>
              {card.duration && (
                <span className="text-xs text-muted-foreground">({card.duration})</span>
              )}
            </div>
            {card.requirements && (
              <div className="pt-2 border-t border-dashed">
                <p className="text-xs text-muted-foreground mb-1">申请条件：</p>
                <div className="space-y-1">
                  {card.requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-foreground">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  const renderFormCard = (card: FormCard) => (
    <div className="bg-white rounded-xl border border-sky-100 overflow-hidden mt-2">
      <div className="bg-gradient-to-r from-sky-500 to-blue-500 px-3 py-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-white" />
          <span className="text-white font-medium text-sm">{card.title}</span>
        </div>
      </div>
      <div className="p-3 space-y-3">
        {card.fields.map((field, index) => (
          <div key={index}>
            <label className="text-xs text-muted-foreground block mb-1">{field.label}</label>
            <input 
              type="text"
              placeholder={field.placeholder}
              defaultValue={field.value}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-sky-400"
            />
          </div>
        ))}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
          <Building2 className="w-3 h-3" />
          <span>办理部门：{card.department}</span>
        </div>
      </div>
    </div>
  )

  const renderTicketCard = (card: TicketCard) => (
    <div className="bg-white rounded-xl border border-sky-100 overflow-hidden mt-2">
      <div className={`px-3 py-2 ${card.status === "已受理" || card.status === "待确认" ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-emerald-500 to-green-500"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-white" />
            <span className="text-white font-medium text-sm">{card.type}</span>
          </div>
          <span className="text-white/90 text-xs px-2 py-0.5 bg-white/20 rounded-full">{card.status}</span>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {card.ticketNo && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">工单编号</span>
            <span className="font-mono font-bold text-sky-600">{card.ticketNo}</span>
          </div>
        )}
        {card.content && (
          <div className="text-xs text-foreground bg-gray-50 rounded-lg p-2 whitespace-pre-line">
            {card.content}
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Building2 className="w-3 h-3" />
          <span>受理部门：{card.department}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>预计处理时间：{card.estimatedTime}</span>
        </div>
      </div>
    </div>
  )

  const renderProgressCard = (card: ProgressCard) => (
    <div className="bg-white rounded-xl border border-sky-100 overflow-hidden mt-2">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-white" />
            <span className="text-white font-medium text-sm">工单进度查询</span>
          </div>
          <span className="text-white/90 text-xs px-2 py-0.5 bg-white/20 rounded-full">{card.status}</span>
        </div>
      </div>
      <div className="p-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">工单编号</span>
          <span className="font-mono font-bold text-sky-600">{card.ticketNo}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Building2 className="w-3 h-3" />
          <span>{card.department}</span>
        </div>
        <div className="bg-blue-50 rounded-lg p-2">
          <p className="text-xs text-blue-700 font-medium">最新进度</p>
          <p className="text-sm text-blue-900 mt-1">{card.latestUpdate}</p>
        </div>
        {card.timeline && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">办理时间线</p>
            <div className="space-y-2">
              {card.timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${item.done ? "bg-emerald-500" : "bg-gray-200"}`}>
                    {item.done && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs ${item.done ? "text-foreground" : "text-muted-foreground"}`}>{item.event}</p>
                    <p className="text-[10px] text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 rounded-lg p-2">
          <Bell className="w-3 h-3" />
          <span>{card.estimatedCompletion}</span>
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
            <span className="font-medium">政务服务助手</span>
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
            {/* AI Avatar & Welcome */}
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
                  你的智能政务助手，可以帮你咨询政策、申请补贴、提交投诉、查询进度。
                </p>
              </div>
            </div>

            {/* Suggestions */}
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
              
              {message.cardType === "subsidy" && renderSubsidyCards(message.cards as SubsidyCard[])}
              {message.cardType === "form" && renderFormCard(message.cards as FormCard)}
              {message.cardType === "ticket" && renderTicketCard(message.cards as TicketCard)}
              {message.cardType === "progress" && renderProgressCard(message.cards as ProgressCard)}
              
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

// Add Users icon since it was used but not imported
const Users = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
