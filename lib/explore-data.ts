// 社区探索景点数据

export interface Place {
  id: string
  name: string
  image: string
  description: string
  hot?: number
  likes: number
  shares: number
  comments: number
  tags: string[]
  category: string
  phone?: string
  address: string
  hours?: string
}

export const places: Place[] = [
  {
    id: "siyue-academy",
    name: "思月书院",
    image: "/images/siyue-academy.jpg",
    description: "始建于清康熙年间，原为张姓宗祠，曾作为省港大罢工接待站，现为市级文物保护单位。书院重建后保留了岭南建筑风格，展示东门历史文化，是了解深圳城市变迁的重要窗口。",
    hot: 200,
    likes: 200,
    shares: 2,
    comments: 2,
    tags: ["热门", "历史文化"],
    category: "逸游金岭",
    phone: "58801784",
    address: "雪野路34弄",
    hours: "周二至周日 9:00-17:00",
  },
  {
    id: "dawang-bridge",
    name: "大望桥",
    image: "/images/dawang-bridge.jpg",
    description: "大望桥横跨梧桐山河，是金岭社区的标志性景观桥梁。桥身设计融合现代与传统元素，两侧绿道环绕，是市民休闲散步、观赏山景的绝佳去处。",
    hot: 200,
    likes: 180,
    shares: 5,
    comments: 8,
    tags: ["陆家嘴街道", "共赏江景如画"],
    category: "逸游金岭",
    address: "梧桐山河畔",
  },
  {
    id: "zhengkeng-greenway",
    name: "正坑水碧道",
    image: "/images/zhengkeng-greenway.jpg",
    description: "正坑水碧道沿正坑水而建，全长约3.5公里，是深圳首批碧道建设示范项目之一。步道两侧绿树成荫，水清岸绿，是跑步、骑行、散步的理想场所。",
    hot: 200,
    likes: 156,
    shares: 12,
    comments: 15,
    tags: ["陆家嘴街道", "共赏江景如画"],
    category: "逸游金岭",
    address: "正坑水两岸",
  },
  {
    id: "orchid-center",
    name: "深圳市兰科植物保护中心",
    image: "/images/orchid-center.jpg",
    description: "全国首家以兰科植物保护为主题的科研机构和科普教育基地，收集保存兰科植物1500余种，是国内兰科植物物种最丰富的保护中心之一。",
    likes: 89,
    shares: 3,
    comments: 6,
    tags: ["陆家嘴街道", "共赏江景如画"],
    category: "逸游金岭",
    phone: "25712008",
    address: "梧桐山风景区内",
    hours: "周二至周日 9:00-17:00（需预约）",
  },
  {
    id: "jinshi-museum",
    name: "深圳金石艺术博物馆",
    image: "/images/jinshi-museum.jpg",
    description: "深圳金石艺术博物馆是一座以金石文化为主题的专题博物馆，馆藏丰富的青铜器、印章、碑刻等珍贵文物，展示中华传统金石艺术的独特魅力。",
    likes: 67,
    shares: 4,
    comments: 3,
    tags: ["文化艺术", "博物馆"],
    category: "逸游金岭",
    phone: "25891234",
    address: "金岭路128号",
    hours: "周二至周日 10:00-18:00",
  },
  {
    id: "yinfeng-bridge",
    name: "引凤桥",
    image: "/images/yinfeng-bridge.jpg",
    description: "引凤桥是一座具有传统风格的景观步行桥，桥名取自\"筑巢引凤\"之意，象征金岭社区欢迎八方来客。桥上可远眺梧桐山美景，是拍照打卡的热门地点。",
    likes: 45,
    shares: 2,
    comments: 1,
    tags: ["山水景观", "步行桥"],
    category: "逸游金岭",
    address: "梧桐山绿道",
  },
  {
    id: "wutong-mountain",
    name: "梧桐山",
    image: "/images/wutong-mountain.jpg",
    description: "梧桐山是深圳第一高峰，海拔943.7米，也是深圳市民登山健身的首选之地。山上植被丰富，四季花开，登顶可俯瞰深圳全景和大鹏湾。",
    likes: 320,
    shares: 25,
    comments: 42,
    tags: ["自然景观", "登山健身"],
    category: "逸游金岭",
    address: "梧桐山风景区",
    hours: "6:00-18:00",
  },
  {
    id: "greenway",
    name: "绿道",
    image: "/images/greenway.jpg",
    description: "金岭社区绿道系统串联各大景点，总长超过10公里，沿途设有休息亭、饮水点、公共卫生间等便民设施，是市民骑行、跑步的最佳选择。",
    hot: 10,
    likes: 88,
    shares: 6,
    comments: 9,
    tags: ["户外运动", "骑行"],
    category: "畅行金岭",
    address: "金岭社区全域",
  },
  {
    id: "east-highway",
    name: "东部过境高速",
    image: "/images/east-highway.jpg",
    description: "东部过境高速是连接深圳东部各区的重要交通动脉，从金岭社区可快速到达盐田、大鹏等地，为居民出行提供便利。",
    likes: 23,
    shares: 1,
    comments: 0,
    tags: ["交通枢纽"],
    category: "畅行金岭",
    address: "金岭社区南侧",
  },
]

export const categories = [
  { id: "tour", label: "逸游金岭", color: "bg-primary" },
  { id: "shop", label: "乐购金岭", color: "bg-red-500" },
  { id: "fun", label: "欢娱金岭", color: "bg-amber-500" },
  { id: "travel", label: "畅行金岭", color: "bg-emerald-500" },
  { id: "food", label: "舌尖金岭", color: "bg-sky-500" },
  { id: "stay", label: "宿享金岭", color: "bg-indigo-500" },
]

export function getPlaceById(id: string): Place | undefined {
  return places.find(p => p.id === id)
}

export function getPlaceByName(name: string): Place | undefined {
  return places.find(p => p.name === name)
}
