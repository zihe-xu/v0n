"use client"

import Image from "next/image"
import { Star, ChevronRight, Building2, Clock } from "lucide-react"

const products = [
  {
    id: 1,
    title: "精细处见真章 -- 一款优秀的挂绳",
    subtitle: "离不开对材质和工艺的严格把控",
    image: "/images/product-rope.jpg",
    company: "汕头厚山科技有限公司",
    time: "2个月前",
    isNew: true,
    tag: "产品推介",
  },
  {
    id: 2,
    title: "滨州特色优质产品推介 -- 家纺产品（床上手作品）",
    subtitle: "一家纺产品（床上手作品）",
    image: "/images/product-textile.jpg",
    company: "滨州市民企之家",
    time: "1天前",
    isNew: false,
    tag: "产品推介",
  },
  {
    id: 3,
    title: "传统手工编织绳结 -- 匠心工艺",
    subtitle: "传统文化与现代工艺的完美融合",
    image: "/images/craft-ornament.jpg",
    company: "深圳文创工坊",
    time: "3天前",
    isNew: false,
    tag: "手工艺",
  },
]

export function ProductsView() {
  return (
    <div className="bg-background">
      {/* Section header */}
      <div className="px-4 pt-4 pb-1">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">优秀产品推荐</h2>
        </div>

        {/* Highlight banner */}
        <div className="rounded-xl bg-gradient-to-r from-amber-50 to-primary/5 border border-primary/10 p-3 mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-foreground">
              {'【美好时光】'}
            </span>
            <span className="text-xs font-semibold text-primary">
              公司介绍与产品推介
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            精选社区优质企业产品，品质保障值得信赖
          </p>
        </div>
      </div>

      {/* Product cards */}
      <div className="flex flex-col">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

interface ProductCardProps {
  product: {
    id: number
    title: string
    subtitle: string
    image: string
    company: string
    time: string
    isNew: boolean
    tag: string
  }
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <button className="flex gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors border-b border-border/50 last:border-b-0 group">
      {/* Image */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-primary text-[8px] font-bold text-primary-foreground">
            NEW
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <h3 className="text-xs font-semibold text-foreground line-clamp-2 leading-snug mb-1">
            {product.title}
          </h3>
          <span className="inline-block px-1.5 py-0.5 rounded bg-primary/10 text-[9px] font-medium text-primary mb-1">
            {product.tag}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-0.5">
            <Building2 className="w-2.5 h-2.5" />
            <span className="line-clamp-1">{product.company}</span>
          </span>
          <span className="flex items-center gap-0.5 flex-shrink-0">
            <Clock className="w-2.5 h-2.5" />
            {product.time}
          </span>
        </div>
      </div>

      <ChevronRight className="w-4 h-4 text-muted-foreground/50 self-center flex-shrink-0" />
    </button>
  )
}
