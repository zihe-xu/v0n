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
  BookOpen,
  Library,
  Navigation,
  Calendar,
  Star,
  BookMarked,
  Bookmark,
  Download,
  Eye,
  CheckCircle,
  ChevronRight,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  cardType?: "libraries" | "book-detail" | "location" | "reserve-confirm" | "reserve-success" | "recommendations" | "rules" | "renew" | "ebook" | "my-books"
  isTyping?: boolean
}

const quickReplies = [
  "《三体》哪里有",
  "附近图书馆",
  "借书规则",
  "推荐科幻书",
]

const suggestedQuestions = [
  "《三体》这本书哪个图书馆有？",
  "附近有哪些图书馆？",
  "借书可以借多久？",
  "有没有科幻小说推荐？",
]

// Nav tabs for quick access
const navTabs = [
  { id: "venue", label: "场馆预约", icon: MapPin },
  { id: "activity", label: "活动报名", icon: Calendar },
  { id: "canteen", label: "社区食堂", icon: BookOpen },
  { id: "library", label: "图书借阅", icon: Library, active: true },
]

export function AILibraryChatView() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (text?: string) => {
    const messageText = text || inputValue
    if (!messageText.trim()) return

    setShowWelcome(false)
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()

    // Book search
    if (input.includes("三体") || input.includes("哪里有") || input.includes("哪个图书馆")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "我帮你查询到了《三体》的馆藏信息：",
        cardType: "libraries",
      }
    }

    // Library location
    if (input.includes("在哪") || input.includes("位置") || input.includes("怎么走")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "这是罗湖图书馆的详细位置信息：",
        cardType: "location",
      }
    }

    // Reserve book
    if (input.includes("预约") && !input.includes("确认")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "好的，我为你预约：",
        cardType: "reserve-confirm",
      }
    }

    // Confirm reservation
    if (input.includes("确认") || input.includes("确定")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "预约成功！",
        cardType: "reserve-success",
      }
    }

    // Book recommendations
    if (input.includes("推荐") || input.includes("科幻") || input.includes("什么书")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "我给你推荐几本热门科幻小说：",
        cardType: "recommendations",
      }
    }

    // Borrowing rules
    if (input.includes("规则") || input.includes("借多久") || input.includes("几本")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "图书馆借阅规则如下：",
        cardType: "rules",
      }
    }

    // Renew book
    if (input.includes("续借") || input.includes("延期")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "你当前借阅的书籍：",
        cardType: "renew",
      }
    }

    // Nearby libraries
    if (input.includes("附近") || input.includes("图书馆")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "罗湖区附近的图书馆：",
        cardType: "libraries",
      }
    }

    // E-book
    if (input.includes("电子书") || input.includes("在线阅读") || input.includes("在线看")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "部分图书支持在线阅读：",
        cardType: "ebook",
      }
    }

    // My books
    if (input.includes("我的") || input.includes("借阅记录")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "你当前的借阅记录：",
        cardType: "my-books",
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "ai",
      content: "我可以帮你查询图书馆藏书、预约借书、推荐图书等。请问你想查询什么书籍？",
    }
  }

  const handleQuickReply = (reply: string) => {
    handleSend(reply)
  }

  const refreshSuggestions = () => {
    // In real app, this would fetch new suggestions
  }

  // Render message cards
  const renderCard = (message: Message) => {
    switch (message.cardType) {
      case "libraries":
        return (
          <div className="space-y-2 mt-2">
            {[
              { name: "罗湖图书馆", address: "罗湖区太宁路", total: 3, available: 1, distance: "1.2km" },
              { name: "东湖街道图书馆", address: "罗湖区爱国路", total: 2, available: 1, distance: "2km" },
              { name: "莲塘社区图书馆", address: "罗湖区莲塘路", total: 1, available: 0, distance: "3km" },
            ].map((lib, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Library className="w-4 h-4 text-sky-500" />
                      <span className="font-semibold text-sm text-foreground">{lib.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{lib.address}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="text-muted-foreground">馆藏 <span className="font-medium text-foreground">{lib.total}本</span></span>
                      <span className={lib.available > 0 ? "text-emerald-600" : "text-red-500"}>
                        可借 <span className="font-medium">{lib.available}本</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">{lib.distance}</span>
                    {lib.available > 0 && (
                      <button 
                        className="mt-1 block text-xs text-sky-600 font-medium"
                        onClick={() => handleSend("帮我预约一本")}
                      >
                        预约
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 mt-2">
              <button 
                className="px-3 py-1.5 bg-sky-50 text-sky-600 rounded-full text-xs font-medium"
                onClick={() => handleSend("帮我预约一本")}
              >
                预约借书
              </button>
              <button 
                className="px-3 py-1.5 bg-sky-50 text-sky-600 rounded-full text-xs font-medium"
                onClick={() => handleSend("罗湖图书馆在哪里")}
              >
                查看位置
              </button>
            </div>
          </div>
        )

      case "book-detail":
        return (
          <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
            <div className="flex gap-3">
              <div className="w-16 h-20 bg-gradient-to-br from-sky-100 to-sky-200 rounded-lg flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-sky-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-foreground">三体</h4>
                <p className="text-xs text-muted-foreground mt-0.5">刘慈欣 著</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">4.9分</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  科幻巨作，讲述地球文明与三体文明的接触与冲突...
                </p>
              </div>
            </div>
          </div>
        )

      case "location":
        return (
          <div className="bg-white rounded-xl overflow-hidden border border-sky-100 shadow-sm mt-2">
            <div className="h-24 bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-sky-500" />
            </div>
            <div className="p-3">
              <div className="flex items-center gap-2">
                <Library className="w-4 h-4 text-sky-500" />
                <span className="font-semibold text-sm">罗湖图书馆</span>
              </div>
              <div className="mt-2 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>罗湖区太宁路</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>09:00 - 21:00</span>
                </div>
              </div>
              <div className="mt-3 p-2 bg-sky-50 rounded-lg">
                <p className="text-xs text-sky-700 font-medium">《三体》馆藏位置</p>
                <p className="text-xs text-sky-600 mt-1">三楼 · 科幻文学区 · 书架 <span className="font-bold">F12</span></p>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-sky-500 text-white rounded-lg text-xs font-medium">
                  <Navigation className="w-3 h-3" />
                  导航
                </button>
                <button 
                  className="flex-1 py-2 bg-sky-50 text-sky-600 rounded-lg text-xs font-medium"
                  onClick={() => handleSend("帮我预约一本")}
                >
                  预约借书
                </button>
              </div>
            </div>
          </div>
        )

      case "reserve-confirm":
        return (
          <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
            <div className="flex items-center gap-2 mb-3">
              <BookMarked className="w-4 h-4 text-sky-500" />
              <span className="font-semibold text-sm">预约确认</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">书名</span>
                <span className="font-medium">《三体》</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">图书馆</span>
                <span className="font-medium">罗湖图书馆</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">取书时间</span>
                <span className="font-medium">今天或明天</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">取书地点</span>
                <span className="font-medium">三楼服务台</span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button 
                className="flex-1 py-2 bg-sky-500 text-white rounded-lg text-xs font-medium"
                onClick={() => handleSend("确认预约")}
              >
                确认预约
              </button>
              <button className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                取消
              </button>
            </div>
          </div>
        )

      case "reserve-success":
        return (
          <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-sm mt-2">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <h4 className="font-semibold text-emerald-700">预约成功</h4>
            </div>
            <div className="mt-3 p-3 bg-emerald-50 rounded-lg space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-emerald-600">书名</span>
                <span className="font-medium text-emerald-700">《三体》</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-600">图书馆</span>
                <span className="font-medium text-emerald-700">罗湖图书馆</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-600">保留时间</span>
                <span className="font-medium text-emerald-700">48小时</span>
              </div>
            </div>
            <p className="text-xs text-amber-600 text-center mt-3">
              请在2天内到馆取书
            </p>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-sky-500 text-white rounded-lg text-xs font-medium">
                <Navigation className="w-3 h-3" />
                查看导航
              </button>
              <button className="flex-1 py-2 bg-sky-50 text-sky-600 rounded-lg text-xs font-medium">
                借阅规则
              </button>
            </div>
          </div>
        )

      case "recommendations":
        return (
          <div className="space-y-2 mt-2">
            {[
              { title: "三体", author: "刘慈欣", rating: 4.9, available: true },
              { title: "银河帝国", author: "阿西莫夫", rating: 4.8, available: true },
              { title: "沙丘", author: "弗兰克·赫伯特", rating: 4.7, available: true },
            ].map((book, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm">
                <div className="flex gap-3">
                  <div className="w-12 h-16 bg-gradient-to-br from-sky-100 to-sky-200 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-sky-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-foreground">《{book.title}》</h4>
                    <p className="text-xs text-muted-foreground">{book.author}</p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-muted-foreground">{book.rating}</span>
                      </div>
                      <button 
                        className="text-xs text-sky-600 font-medium"
                        onClick={() => handleSend(`《${book.title}》哪里有`)}
                      >
                        查看馆藏
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">这些书在罗湖图书馆都有馆藏</p>
          </div>
        )

      case "rules":
        return (
          <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
            <div className="flex items-center gap-2 mb-3">
              <BookMarked className="w-4 h-4 text-sky-500" />
              <span className="font-semibold text-sm">借阅规则</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">借阅期限</p>
                  <p className="text-xs text-muted-foreground">30天</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">可借数量</p>
                  <p className="text-xs text-muted-foreground">每人最多 5本图书</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">续借服务</p>
                  <p className="text-xs text-muted-foreground">可在线续借1次</p>
                </div>
              </div>
            </div>
            <button 
              className="w-full mt-3 py-2 bg-sky-50 text-sky-600 rounded-lg text-xs font-medium"
              onClick={() => handleSend("查看我的借阅记录")}
            >
              查看借阅记录
            </button>
          </div>
        )

      case "renew":
        return (
          <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm mt-2">
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw className="w-4 h-4 text-sky-500" />
              <span className="font-semibold text-sm">续借确认</span>
            </div>
            <div className="flex gap-3 p-2 bg-sky-50 rounded-lg">
              <div className="w-12 h-16 bg-gradient-to-br from-sky-100 to-sky-200 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-sky-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">《三体》</h4>
                <p className="text-xs text-muted-foreground mt-1">到期时间：3月15日</p>
                <p className="text-xs text-sky-600 mt-1">可续借 30天</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button 
                className="flex-1 py-2 bg-sky-500 text-white rounded-lg text-xs font-medium"
                onClick={() => {
                  setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    type: "ai",
                    content: "续借成功！《三体》新归还时间：4月15日",
                  }])
                }}
              >
                确认续借
              </button>
              <button className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                取消
              </button>
            </div>
          </div>
        )

      case "ebook":
        return (
          <div className="space-y-2 mt-2">
            {[
              { title: "三体", format: "PDF/EPUB" },
              { title: "活着", format: "PDF/EPUB" },
              { title: "百年孤独", format: "PDF" },
            ].map((book, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">《{book.title}》电子版</p>
                      <p className="text-xs text-muted-foreground">{book.format}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 bg-sky-50 rounded-lg">
                      <Eye className="w-4 h-4 text-sky-500" />
                    </button>
                    <button className="p-1.5 bg-sky-50 rounded-lg">
                      <Download className="w-4 h-4 text-sky-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">点击眼睛图标在线阅读，点击下载图标下载电子书</p>
          </div>
        )

      case "my-books":
        return (
          <div className="space-y-2 mt-2">
            {[
              { title: "三体", dueDate: "3月15日", status: "借阅中", canRenew: true },
              { title: "活着", dueDate: "3月20日", status: "借阅中", canRenew: true },
            ].map((book, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-12 bg-gradient-to-br from-sky-100 to-sky-200 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">《{book.title}》</p>
                      <p className="text-xs text-muted-foreground">到期：{book.dueDate}</p>
                    </div>
                  </div>
                  {book.canRenew && (
                    <button 
                      className="px-3 py-1.5 bg-sky-500 text-white rounded-lg text-xs font-medium"
                      onClick={() => handleSend(`续借《${book.title}》`)}
                    >
                      续借
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-400 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-1">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold">罗小i</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">图书借阅</span>
        </div>
      </div>

      {/* Quick Nav Tabs */}
      <div className="bg-white border-b border-sky-100 px-2 py-2 flex gap-1 overflow-x-auto">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              tab.active
                ? "bg-sky-500 text-white"
                : "bg-sky-50 text-sky-600 hover:bg-sky-100"
            }`}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {showWelcome && (
          <>
            {/* AI Welcome */}
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-sky-200 shadow-md mb-3">
                <Image
                  src="/images/ai-assistant-avatar.jpg"
                  alt="罗小i"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <h2 className="text-lg font-bold text-sky-700 mb-1">Hi，我是罗小i</h2>
              <p className="text-sm text-muted-foreground">
                你的图书借阅助手，可以帮你查书、预约、续借
              </p>
            </div>

            {/* Today's Recommendations */}
            <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                  <BookMarked className="w-4 h-4 text-sky-500" />
                  今日热门推荐
                </span>
              </div>
              <div className="space-y-2">
                {["三体", "活着", "人类简史"].map((book, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center gap-2 p-2 bg-sky-50 rounded-lg text-left hover:bg-sky-100 transition-colors"
                    onClick={() => handleSend(`《${book}》哪里有`)}
                  >
                    <BookOpen className="w-4 h-4 text-sky-500" />
                    <span className="text-sm text-sky-700">《{book}》</span>
                    <ChevronRight className="w-4 h-4 text-sky-400 ml-auto" />
                  </button>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-xl p-3 border border-sky-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">猜您想了解</span>
                <button 
                  className="text-xs text-sky-500 flex items-center gap-1"
                  onClick={refreshSuggestions}
                >
                  <RefreshCw className="w-3 h-3" />
                  换一换
                </button>
              </div>
              <div className="space-y-2">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left p-2 bg-sky-50 rounded-lg text-sm text-sky-700 hover:bg-sky-100 transition-colors"
                    onClick={() => handleSend(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.type === "ai" && (
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 shrink-0">
                <Image
                  src="/images/ai-assistant-avatar.jpg"
                  alt="AI"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}
            <div className={`max-w-[80%] ${message.type === "user" ? "order-1" : ""}`}>
              <div
                className={`px-3 py-2 rounded-2xl text-sm ${
                  message.type === "user"
                    ? "bg-sky-500 text-white rounded-br-md"
                    : "bg-white border border-sky-100 text-foreground rounded-bl-md shadow-sm"
                }`}
              >
                {message.content}
              </div>
              {message.cardType && renderCard(message)}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <Image
                src="/images/ai-assistant-avatar.jpg"
                alt="AI"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="bg-white border border-sky-100 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
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

      {/* Quick Replies */}
      {messages.length > 0 && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              className="px-3 py-1.5 bg-sky-50 text-sky-600 rounded-full text-xs font-medium whitespace-nowrap hover:bg-sky-100 transition-colors"
              onClick={() => handleQuickReply(reply)}
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-sky-100">
        <div className="flex items-center gap-2">
          <button className="p-2 text-sky-500 hover:bg-sky-50 rounded-full transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="请输入您的问题..."
              className="w-full px-4 py-2 bg-sky-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className="p-2 bg-sky-500 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
