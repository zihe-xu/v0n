// 行街指南 - 点位数据和类型定义

export type PlaceCategory = "逸游" | "乐购" | "欢娱" | "畅行" | "舌尖" | "宿享"

export interface Place {
  id: string
  name: string
  category: PlaceCategory
  description: string
  detailDescription?: string
  coverImage: string
  images: string[]
  stampImage: string
  address: string
  phone?: string
  openingHours?: string
  distance?: number // 单位：米
  likes: number
  comments: number
  checkins: number
  isRecommended: boolean
  isOnline: boolean
  hasMarker: boolean
  markerPosition?: { x: number; y: number }
  tags: string[]
}

export interface Comment {
  id: string
  placeId: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
  status: "pending" | "approved" | "rejected"
  rejectReason?: string
  likes: number
}

export interface CheckinRecord {
  id: string
  placeId: string
  placeName: string
  userId: string
  userName: string
  userAvatar: string
  checkinTime: string
  photo?: string
  stampImage: string
}

// 分类配置
export const categoryConfig: Record<PlaceCategory, { label: string; color: string; bgColor: string }> = {
  "逸游": { label: "逸游金岭", color: "text-primary", bgColor: "bg-primary/10" },
  "乐购": { label: "乐购金岭", color: "text-red-500", bgColor: "bg-red-50" },
  "欢娱": { label: "欢娱金岭", color: "text-amber-500", bgColor: "bg-amber-50" },
  "畅行": { label: "畅行金岭", color: "text-emerald-500", bgColor: "bg-emerald-50" },
  "舌尖": { label: "舌尖金岭", color: "text-sky-500", bgColor: "bg-sky-50" },
  "宿享": { label: "宿享金岭", color: "text-indigo-500", bgColor: "bg-indigo-50" },
}

// 模拟景点数据
export const placesData: Place[] = [
  {
    id: "1",
    name: "思月书院",
    category: "逸游",
    description: "始建于清康熙年间，原为张姓宗祠，曾作为省港大罢工接待站，现为市级文物保护单位。",
    detailDescription: "书院重建后保留了岭南建筑风格，展示东门历史文化，是了解深圳城市变迁的重要窗口。院内设有历史展览、书法展示和传统文化体验区，常年举办各类文化活动。",
    coverImage: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582192730841-2a682d7375f9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600298881979-2611c12a0e59?w=800&h=600&fit=crop"
    ],
    stampImage: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=200&h=200&fit=crop",
    address: "深圳市罗湖区金岭社区思月路34号",
    phone: "0755-58801784",
    openingHours: "09:00-18:00（周一闭馆）",
    distance: 280,
    likes: 328,
    comments: 56,
    checkins: 1024,
    isRecommended: true,
    isOnline: true,
    hasMarker: true,
    markerPosition: { x: 52, y: 75 },
    tags: ["历史文化", "书院", "免费开放"],
  },
  {
    id: "2",
    name: "大望桥",
    category: "逸游",
    description: "横跨正坑水，连接两岸社区的标志性景观桥，是居民休闲散步的好去处。",
    detailDescription: "桥身采用现代设计与传统元素相结合，夜间灯光璀璨，是观赏社区夜景的绝佳位置。桥两侧设有观景平台和休息座椅。",
    coverImage: "https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&h=600&fit=crop"],
    stampImage: "https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=200&h=200&fit=crop",
    address: "深圳市罗湖区金岭社区大望路",
    distance: 520,
    likes: 256,
    comments: 32,
    checkins: 856,
    isRecommended: true,
    isOnline: true,
    hasMarker: true,
    markerPosition: { x: 38, y: 32 },
    tags: ["景观桥", "夜景", "休闲"],
  },
  {
    id: "3",
    name: "正坑水碧道",
    category: "畅行",
    description: "沿正坑水打造的生态绿道，全长约3公里，是骑行和跑步的理想选择。",
    detailDescription: "碧道沿途设有多处休息亭、公共卫生间和饮水点，两旁绿树成荫，空气清新。周末常有社区活动在此举行。",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"],
    stampImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    address: "深圳市罗湖区金岭社区正坑水沿岸",
    openingHours: "全天开放",
    distance: 180,
    likes: 412,
    comments: 78,
    checkins: 2156,
    isRecommended: true,
    isOnline: true,
    hasMarker: true,
    markerPosition: { x: 62, y: 25 },
    tags: ["骑行", "跑步", "绿道"],
  },
  {
    id: "4",
    name: "深圳市兰科植物保护中心",
    category: "逸游",
    description: "国家级兰科植物保护研究机构，收藏珍稀兰花品种超过2000种。",
    detailDescription: "中心设有科普展厅、温室大棚和户外展示区，定期举办兰花展览和科普讲座，是亲子教育和自然探索的好去处。",
    coverImage: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=600&fit=crop"],
    stampImage: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200&h=200&fit=crop",
    address: "深圳市罗湖区金岭社区望桐路",
    phone: "0755-25712968",
    openingHours: "09:00-17:00（周一闭馆）",
    distance: 680,
    likes: 189,
    comments: 24,
    checkins: 567,
    isRecommended: false,
    isOnline: true,
    hasMarker: true,
    markerPosition: { x: 50, y: 42 },
    tags: ["自然科普", "亲子", "兰花"],
  },
  {
    id: "5",
    name: "深圳金石艺术博物馆",
    category: "逸游",
    description: "专注于金石篆刻艺术的民办博物馆，馆藏历代印章、碑帖等珍品。",
    detailDescription: "博物馆分为印章展厅、碑帖展厅和体验工坊三个区域，游客可以在专业老师指导下体验篆刻艺术。",
    coverImage: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=600&fit=crop"],
    stampImage: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=200&h=200&fit=crop",
    address: "深圳市罗湖区金岭社区艺术路88号",
    phone: "0755-25789012",
    openingHours: "10:00-18:00（周二闭馆）",
    distance: 420,
    likes: 145,
    comments: 18,
    checkins: 389,
    isRecommended: false,
    isOnline: true,
    hasMarker: true,
    markerPosition: { x: 48, y: 52 },
    tags: ["文化艺术", "博物馆", "篆刻"],
  },
  {
    id: "6",
    name: "引凤桥",
    category: "逸游",
    description: "古典园林风格的景观桥，桥身雕刻精美，寓意"引凤来栖"。",
    detailDescription: "桥下流水潺潺，两岸竹林环绕，是社区内著名的网红打卡点，吸引众多摄影爱好者前来取景。",
    coverImage: "https://images.unsplash.com/photo-1551009175-15bdf9dcb580?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1551009175-15bdf9dcb580?w=800&h=600&fit=crop"],
    stampImage: "https://images.unsplash.com/photo-1551009175-15bdf9dcb580?w=200&h=200&fit=crop",
    address: "深圳市罗湖区金岭社区凤凰路",
    distance: 350,
    likes: 267,
    comments: 45,
    checkins: 712,
    isRecommended: false,
    isOnline: true,
    hasMarker: true,
    markerPosition: { x: 40, y: 62 },
    tags: ["山水景观", "步行桥", "网红打卡"],
  },
  {
    id: "7",
    name: "梧桐山",
    category: "逸游",
    description: "深圳第一高峰，海拔943.7米，是市民登山健身的热门目的地。",
    detailDescription: "梧桐山风景区内有多条登山步道，沿途可观赏山间瀑布、古树名木，山顶可俯瞰深圳全景和大鹏湾。",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop"],
    stampImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop",
    address: "深圳市罗湖区梧桐山国家森林公园",
    openingHours: "06:00-18:00",
    distance: 1200,
    likes: 523,
    comments: 89,
    checkins: 3456,
    isRecommended: true,
    isOnline: true,
    hasMarker: true,
    markerPosition: { x: 68, y: 60 },
    tags: ["登山", "自然风光", "健身"],
  },
  {
    id: "8",
    name: "社区绿道",
    category: "畅行",
    description: "贯穿社区的慢行系统，串联各主要景点和居住区。",
    detailDescription: "绿道全长5公里，设有专用自行车道和步行道，沿途配备智能健身设施和休息驿站。",
    coverImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop"],
    stampImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=200&h=200&fit=crop",
    address: "深圳市罗湖区金岭社区",
    openingHours: "全天开放",
    distance: 100,
    likes: 178,
    comments: 22,
    checkins: 1567,
    isRecommended: false,
    isOnline: true,
    hasMarker: true,
    markerPosition: { x: 15, y: 78 },
    tags: ["骑行", "步行", "健身"],
  },
  {
    id: "9",
    name: "东部过境高速",
    category: "畅行",
    description: "连接深圳东部与香港的重要交通枢纽，大型工程建筑地标。",
    detailDescription: "高速公路观景台可远眺深港两地，是观赏现代化基础设施的独特视角。",
    coverImage: "https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&h=600&fit=crop"],
    stampImage: "https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=200&h=200&fit=crop",
    address: "深圳市罗湖区东部过境高速观景点",
    distance: 800,
    likes: 89,
    comments: 12,
    checkins: 234,
    isRecommended: false,
    isOnline: true,
    hasMarker: true,
    markerPosition: { x: 30, y: 90 },
    tags: ["交通", "观景", "地标"],
  },
]

// 模拟评论数据
export const commentsData: Comment[] = [
  {
    id: "c1",
    placeId: "1",
    userId: "u1",
    userName: "李阿姨",
    userAvatar: "",
    content: "书院环境很好，周末带孙子来参观学习传统文化，孩子很喜欢！",
    createdAt: "2024-05-08 14:30",
    status: "approved",
    likes: 12,
  },
  {
    id: "c2",
    placeId: "1",
    userId: "u2",
    userName: "张先生",
    userAvatar: "",
    content: "建议增加一些互动体验项目，让参观更有趣味性。",
    createdAt: "2024-05-07 10:15",
    status: "approved",
    likes: 8,
  },
  {
    id: "c3",
    placeId: "1",
    userId: "u3",
    userName: "王小姐",
    userAvatar: "",
    content: "周一闭馆，建议在入口处增加明显提示。",
    createdAt: "2024-05-06 16:45",
    status: "pending",
    likes: 0,
  },
  {
    id: "c4",
    placeId: "3",
    userId: "u4",
    userName: "跑步爱好者",
    userAvatar: "",
    content: "碧道跑步体验很棒，空气清新，就是有些路段没有遮阳设施。",
    createdAt: "2024-05-05 07:30",
    status: "approved",
    likes: 24,
  },
]

// 模拟打卡记录
export const checkinRecordsData: CheckinRecord[] = [
  {
    id: "ck1",
    placeId: "1",
    placeName: "思月书院",
    userId: "u1",
    userName: "李阿姨",
    userAvatar: "",
    checkinTime: "2024-05-08 15:30",
    photo: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=400&h=400&fit=crop",
    stampImage: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=200&h=200&fit=crop",
  },
  {
    id: "ck2",
    placeId: "3",
    placeName: "正坑水碧道",
    userId: "u1",
    userName: "李阿姨",
    userAvatar: "",
    checkinTime: "2024-05-07 08:15",
    stampImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
  },
  {
    id: "ck3",
    placeId: "7",
    placeName: "梧桐山",
    userId: "u2",
    userName: "张先生",
    userAvatar: "",
    checkinTime: "2024-05-06 06:30",
    photo: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop",
    stampImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop",
  },
]

// 辅助函数：根据距离格式化显示
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters}m`
  }
  return `${(meters / 1000).toFixed(1)}km`
}

// 辅助函数：检查是否在打卡范围内
export function isWithinCheckinRange(distance: number): boolean {
  return distance <= 300
}
