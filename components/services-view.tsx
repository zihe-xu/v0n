"use client"

import { ChevronRight } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Decorative Background Patterns — bottom-right, themed colors       */
/* ------------------------------------------------------------------ */

function PatternCommunity() {
  return (
    <svg className="absolute right-0 bottom-0 w-28 h-28" viewBox="0 0 112 112" fill="none">
      {/* House cluster */}
      <path d="M80 50L92 38L104 50V72H80V50Z" fill="#D97706" opacity="0.12"/>
      <path d="M62 58L72 48L82 58V72H62V58Z" fill="#F59E0B" opacity="0.1"/>
      <rect x="86" y="56" width="8" height="10" rx="1" fill="#D97706" opacity="0.08"/>
      <rect x="68" y="62" width="6" height="8" rx="1" fill="#F59E0B" opacity="0.07"/>
      {/* Decorative circles */}
      <circle cx="96" cy="82" r="6" fill="#FBBF24" opacity="0.1"/>
      <circle cx="76" cy="88" r="4" fill="#F59E0B" opacity="0.08"/>
      {/* Tree shapes */}
      <path d="M56 76L60 66L64 76H56Z" fill="#D97706" opacity="0.06"/>
      <rect x="58" y="76" width="3" height="5" fill="#D97706" opacity="0.05"/>
      {/* Roof lines */}
      <path d="M70 42L80 32L90 42" stroke="#D97706" strokeWidth="1.5" opacity="0.08" fill="none"/>
    </svg>
  )
}

function PatternLife() {
  return (
    <svg className="absolute right-0 bottom-0 w-28 h-28" viewBox="0 0 112 112" fill="none">
      {/* Map pin */}
      <path d="M88 40C88 52 78 62 78 62C78 62 68 52 68 40C68 34.5 72.5 30 78 30C83.5 30 88 34.5 88 40Z" fill="#0284C7" opacity="0.1"/>
      <circle cx="78" cy="40" r="4" fill="#0EA5E9" opacity="0.12"/>
      {/* Compass rose */}
      <path d="M96 72L100 80L96 88L92 80Z" fill="#0284C7" opacity="0.08"/>
      <path d="M88 80L96 76L104 80L96 84Z" fill="#38BDF8" opacity="0.07"/>
      {/* Road lines */}
      <path d="M55 90C65 85 75 88 85 78C95 68 100 72 108 70" stroke="#0284C7" strokeWidth="2" opacity="0.06" fill="none" strokeLinecap="round"/>
      <path d="M60 100C70 92 80 96 90 88" stroke="#38BDF8" strokeWidth="1.5" opacity="0.05" fill="none" strokeLinecap="round"/>
      {/* Dots */}
      <circle cx="70" cy="72" r="2.5" fill="#0EA5E9" opacity="0.08"/>
      <circle cx="102" cy="58" r="2" fill="#0284C7" opacity="0.06"/>
    </svg>
  )
}

function PatternElder() {
  return (
    <svg className="absolute right-0 bottom-0 w-28 h-28" viewBox="0 0 112 112" fill="none">
      {/* Heart shape */}
      <path d="M82 50C82 44 88 38 94 42C100 38 106 44 106 50C106 60 94 70 94 70C94 70 82 60 82 50Z" fill="#E11D48" opacity="0.09"/>
      {/* Hands shape */}
      <path d="M66 80C68 74 74 72 78 76C80 72 86 72 88 78C88 84 78 92 78 92C78 92 66 86 66 80Z" fill="#FB7185" opacity="0.07"/>
      {/* Person silhouette */}
      <circle cx="96" cy="80" r="5" fill="#E11D48" opacity="0.06"/>
      <path d="M90 90C90 86 92.5 84 96 84C99.5 84 102 86 102 90V100H90V90Z" fill="#E11D48" opacity="0.05"/>
      {/* Warm dots */}
      <circle cx="74" cy="56" r="3" fill="#FB7185" opacity="0.08"/>
      <circle cx="108" cy="66" r="2" fill="#FDA4AF" opacity="0.1"/>
      <circle cx="64" cy="96" r="2.5" fill="#FB7185" opacity="0.06"/>
    </svg>
  )
}

function PatternEducation() {
  return (
    <svg className="absolute right-0 bottom-0 w-28 h-28" viewBox="0 0 112 112" fill="none">
      {/* Graduation cap */}
      <path d="M86 50L106 60L86 70L66 60L86 50Z" fill="#059669" opacity="0.12"/>
      <path d="M72 64V78L86 84L100 78V64" stroke="#059669" strokeWidth="2" opacity="0.08" fill="none"/>
      <rect x="84" y="56" width="4" height="22" fill="#10B981" opacity="0.07"/>
      {/* Book */}
      <rect x="60" y="86" width="18" height="14" rx="2" fill="#059669" opacity="0.06"/>
      <path d="M69 86V100" stroke="#10B981" strokeWidth="1" opacity="0.08"/>
      {/* Pencil */}
      <rect x="96" y="76" width="3" height="20" rx="1" fill="#10B981" opacity="0.07" transform="rotate(-15 96 76)"/>
      {/* Stars */}
      <circle cx="78" cy="44" r="2" fill="#34D399" opacity="0.1"/>
      <circle cx="100" cy="46" r="1.5" fill="#059669" opacity="0.08"/>
    </svg>
  )
}

function PatternMedical() {
  return (
    <svg className="absolute right-0 bottom-0 w-28 h-28" viewBox="0 0 112 112" fill="none">
      {/* Medical cross */}
      <rect x="82" y="42" width="12" height="36" rx="2" fill="#2563EB" opacity="0.1"/>
      <rect x="70" y="54" width="36" height="12" rx="2" fill="#2563EB" opacity="0.1"/>
      {/* Heartbeat line */}
      <path d="M55 88L65 88L70 78L76 98L82 82L86 88L108 88" stroke="#3B82F6" strokeWidth="2" opacity="0.08" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Stethoscope circle */}
      <circle cx="96" cy="90" r="8" stroke="#60A5FA" strokeWidth="1.5" opacity="0.07" fill="none"/>
      <circle cx="96" cy="90" r="3" fill="#3B82F6" opacity="0.06"/>
      {/* Pill capsule */}
      <rect x="60" y="66" width="6" height="12" rx="3" fill="#60A5FA" opacity="0.06" transform="rotate(-30 60 66)"/>
    </svg>
  )
}

function PatternAppeal() {
  return (
    <svg className="absolute right-0 bottom-0 w-28 h-28" viewBox="0 0 112 112" fill="none">
      {/* Chat bubble */}
      <rect x="64" y="40" width="38" height="28" rx="6" fill="#CA8A04" opacity="0.1"/>
      <path d="M76 68L70 78L82 68" fill="#CA8A04" opacity="0.1"/>
      {/* Text lines inside bubble */}
      <rect x="72" y="48" width="22" height="2.5" rx="1" fill="#EAB308" opacity="0.08"/>
      <rect x="72" y="54" width="16" height="2.5" rx="1" fill="#EAB308" opacity="0.07"/>
      <rect x="72" y="60" width="10" height="2.5" rx="1" fill="#EAB308" opacity="0.06"/>
      {/* Megaphone shape */}
      <path d="M62 84L78 76V96L62 88V84Z" fill="#CA8A04" opacity="0.07"/>
      <rect x="56" y="82" width="6" height="8" rx="1" fill="#EAB308" opacity="0.06"/>
      {/* Exclamation marks */}
      <circle cx="98" cy="80" r="2" fill="#F59E0B" opacity="0.08"/>
      <rect x="97" y="72" width="2.5" height="6" rx="1" fill="#F59E0B" opacity="0.08"/>
    </svg>
  )
}

function PatternEmployment() {
  return (
    <svg className="absolute right-0 bottom-0 w-28 h-28" viewBox="0 0 112 112" fill="none">
      {/* Briefcase */}
      <rect x="68" y="52" width="34" height="26" rx="4" fill="#4F46E5" opacity="0.09"/>
      <rect x="78" y="44" width="14" height="12" rx="3" fill="none" stroke="#4F46E5" strokeWidth="2" opacity="0.08"/>
      <rect x="82" y="62" width="6" height="8" rx="2" fill="#818CF8" opacity="0.07"/>
      {/* Growth chart */}
      <path d="M60 96L70 88L80 92L90 82L100 74" stroke="#6366F1" strokeWidth="2" opacity="0.07" fill="none" strokeLinecap="round"/>
      <circle cx="100" cy="74" r="2.5" fill="#6366F1" opacity="0.08"/>
      {/* Lightbulb */}
      <circle cx="66" cy="44" r="6" stroke="#818CF8" strokeWidth="1.5" opacity="0.07" fill="none"/>
      <path d="M63 50V54H69V50" stroke="#818CF8" strokeWidth="1" opacity="0.06" fill="none"/>
      <path d="M66 38V34" stroke="#A5B4FC" strokeWidth="1" opacity="0.06"/>
    </svg>
  )
}

function PatternCityManage() {
  return (
    <svg className="absolute right-0 bottom-0 w-28 h-28" viewBox="0 0 112 112" fill="none">
      {/* City skyline */}
      <rect x="60" y="56" width="12" height="44" fill="#0D9488" opacity="0.08"/>
      <rect x="74" y="42" width="14" height="58" fill="#14B8A6" opacity="0.07"/>
      <rect x="90" y="50" width="12" height="50" fill="#0D9488" opacity="0.06"/>
      {/* Windows */}
      <rect x="64" y="62" width="4" height="4" rx="0.5" fill="#2DD4BF" opacity="0.08"/>
      <rect x="64" y="72" width="4" height="4" rx="0.5" fill="#2DD4BF" opacity="0.08"/>
      <rect x="78" y="48" width="4" height="4" rx="0.5" fill="#5EEAD4" opacity="0.07"/>
      <rect x="78" y="58" width="4" height="4" rx="0.5" fill="#5EEAD4" opacity="0.07"/>
      <rect x="78" y="68" width="4" height="4" rx="0.5" fill="#5EEAD4" opacity="0.07"/>
      <rect x="94" y="56" width="4" height="4" rx="0.5" fill="#2DD4BF" opacity="0.06"/>
      <rect x="94" y="66" width="4" height="4" rx="0.5" fill="#2DD4BF" opacity="0.06"/>
      {/* Tree */}
      <circle cx="108" cy="86" r="6" fill="#14B8A6" opacity="0.07"/>
      <rect x="107" y="92" width="2" height="6" fill="#0D9488" opacity="0.05"/>
      {/* Gear */}
      <circle cx="56" cy="88" r="7" stroke="#14B8A6" strokeWidth="1.5" opacity="0.06" fill="none"/>
      <circle cx="56" cy="88" r="3" fill="#14B8A6" opacity="0.05"/>
    </svg>
  )
}

function PatternGovern() {
  return (
    <svg className="absolute right-0 bottom-0 w-28 h-28" viewBox="0 0 112 112" fill="none">
      {/* Government building */}
      <path d="M78 52L92 40L106 52" stroke="#475569" strokeWidth="2" opacity="0.1" fill="none"/>
      <rect x="74" y="52" width="36" height="6" fill="#64748B" opacity="0.08"/>
      {/* Pillars */}
      <rect x="78" y="58" width="5" height="22" rx="1" fill="#64748B" opacity="0.07"/>
      <rect x="89" y="58" width="5" height="22" rx="1" fill="#64748B" opacity="0.07"/>
      <rect x="100" y="58" width="5" height="22" rx="1" fill="#64748B" opacity="0.07"/>
      {/* Base */}
      <rect x="72" y="80" width="40" height="5" rx="1" fill="#475569" opacity="0.06"/>
      {/* Document */}
      <rect x="60" y="88" width="14" height="18" rx="2" fill="#64748B" opacity="0.06"/>
      <rect x="64" y="92" width="6" height="1.5" rx="0.5" fill="#94A3B8" opacity="0.06"/>
      <rect x="64" y="96" width="4" height="1.5" rx="0.5" fill="#94A3B8" opacity="0.05"/>
      {/* Scale */}
      <circle cx="68" cy="50" r="4" stroke="#94A3B8" strokeWidth="1" opacity="0.06" fill="none"/>
    </svg>
  )
}

function PatternParty() {
  return (
    <svg className="absolute right-0 bottom-0 w-28 h-28" viewBox="0 0 112 112" fill="none">
      {/* Large star */}
      <path d="M88 42L92 56L106 56L94 64L98 78L88 68L78 78L82 64L70 56L84 56L88 42Z" fill="#DC2626" opacity="0.1"/>
      {/* Flag */}
      <rect x="62" y="70" width="3" height="34" fill="#DC2626" opacity="0.07"/>
      <path d="M65 70L85 76L65 82Z" fill="#EF4444" opacity="0.08"/>
      {/* Ribbon */}
      <path d="M90 84C95 82 100 85 105 82" stroke="#F87171" strokeWidth="2" opacity="0.07" fill="none" strokeLinecap="round"/>
      <path d="M92 90C97 88 102 91 107 88" stroke="#FCA5A5" strokeWidth="1.5" opacity="0.06" fill="none" strokeLinecap="round"/>
      {/* Small stars */}
      <circle cx="74" cy="48" r="2" fill="#F87171" opacity="0.08"/>
      <circle cx="104" cy="44" r="1.5" fill="#FCA5A5" opacity="0.07"/>
    </svg>
  )
}

function PatternOther() {
  return (
    <svg className="absolute right-0 bottom-0 w-28 h-28" viewBox="0 0 112 112" fill="none">
      {/* Music note - for cultural center */}
      <circle cx="80" cy="64" r="5" fill="#78716C" opacity="0.08"/>
      <rect x="85" y="44" width="2" height="20" fill="#78716C" opacity="0.07"/>
      <path d="M87 44L97 40V46L87 50Z" fill="#A8A29E" opacity="0.07"/>
      {/* Palette */}
      <circle cx="98" cy="78" r="10" stroke="#78716C" strokeWidth="1.5" opacity="0.07" fill="none"/>
      <circle cx="94" cy="74" r="2" fill="#D6D3D1" opacity="0.08"/>
      <circle cx="102" cy="76" r="2" fill="#A8A29E" opacity="0.07"/>
      <circle cx="98" cy="82" r="2" fill="#78716C" opacity="0.06"/>
      {/* Book stack */}
      <rect x="64" y="86" width="18" height="4" rx="1" fill="#A8A29E" opacity="0.07"/>
      <rect x="66" y="90" width="18" height="4" rx="1" fill="#78716C" opacity="0.06"/>
      <rect x="62" y="94" width="18" height="4" rx="1" fill="#D6D3D1" opacity="0.06"/>
      {/* Rocket (youth) */}
      <path d="M70 56L74 44L78 56L74 54Z" fill="#A8A29E" opacity="0.06"/>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ServiceCategory {
  title: string
  titleColor: string
  bgColor: string
  borderColor: string
  arrowBg: string
  dotColor: string
  textColor: string
  pattern: () => React.ReactNode
  items: string[]
}

const serviceCategories: ServiceCategory[] = [
  {
    title: "社区特色",
    titleColor: "text-amber-700/70",
    bgColor: "bg-amber-50/40",
    borderColor: "border-amber-100/50",
    arrowBg: "bg-amber-400/50",
    dotColor: "bg-amber-400/60",
    textColor: "text-amber-900",
    pattern: PatternCommunity,
    items: [
      "社区办事", "社区热线", "社区补贴", "养老产品租赁",
      "早教课堂", "中海物业",
    ],
  },
  {
    title: "生活常用",
    titleColor: "text-sky-700/70",
    bgColor: "bg-sky-50/35",
    borderColor: "border-sky-100/50",
    arrowBg: "bg-sky-400/50",
    dotColor: "bg-sky-400/60",
    textColor: "text-sky-900",
    pattern: PatternLife,
    items: [
      "掌上地图", "行街指南", "活动报名", "场馆预约",
      "图书借阅", "志愿服务", "智慧停车", "实时公交",
    ],
  },
  {
    title: "长者服务",
    titleColor: "text-rose-700/70",
    bgColor: "bg-rose-50/30",
    borderColor: "border-rose-100/40",
    arrowBg: "bg-rose-400/45",
    dotColor: "bg-rose-400/55",
    textColor: "text-rose-900",
    pattern: PatternElder,
    items: ["长者食堂", "长者服务站", "居家养老", "机构养老", "社会保障", "补贴优待"],
  },
  {
    title: "教育托育",
    titleColor: "text-emerald-700/70",
    bgColor: "bg-emerald-50/30",
    borderColor: "border-emerald-100/40",
    arrowBg: "bg-emerald-400/45",
    dotColor: "bg-emerald-400/55",
    textColor: "text-emerald-900",
    pattern: PatternEducation,
    items: [
      "社区托育", "周边学校", "托育机构", "招考查询",
      "学位申请", "学校地段查询", "学区房查询", "招生智能客服",
    ],
  },
  {
    title: "医疗服务",
    titleColor: "text-blue-700/70",
    bgColor: "bg-blue-50/30",
    borderColor: "border-blue-100/40",
    arrowBg: "bg-blue-400/45",
    dotColor: "bg-blue-400/55",
    textColor: "text-blue-900",
    pattern: PatternMedical,
    items: [
      "罗湖区人民医院服务", "罗湖区中医院服务",
      "罗湖区妇幼保健院服务", "社康服务", "疫苗服务",
    ],
  },
  {
    title: "我有诉求",
    titleColor: "text-yellow-700/70",
    bgColor: "bg-yellow-50/30",
    borderColor: "border-yellow-100/40",
    arrowBg: "bg-yellow-500/40",
    dotColor: "bg-yellow-500/50",
    textColor: "text-yellow-900",
    pattern: PatternAppeal,
    items: ["@罗湖-民意速办", "意见反馈"],
  },
  {
    title: "就业创业",
    titleColor: "text-indigo-700/70",
    bgColor: "bg-indigo-50/25",
    borderColor: "border-indigo-100/35",
    arrowBg: "bg-indigo-400/40",
    dotColor: "bg-indigo-400/50",
    textColor: "text-indigo-900",
    pattern: PatternEmployment,
    items: ["企业孵化", "党群创享站", "社区招工", "棚友集市", "就业信息"],
  },
  {
    title: "智慧城管",
    titleColor: "text-teal-700/70",
    bgColor: "bg-teal-50/25",
    borderColor: "border-teal-100/35",
    arrowBg: "bg-teal-400/40",
    dotColor: "bg-teal-400/50",
    textColor: "text-teal-900",
    pattern: PatternCityManage,
    items: ["小散工程备案", "三小门店门楣招牌备案", "养犬服务"],
  },
  {
    title: "政务办理",
    titleColor: "text-slate-600/70",
    bgColor: "bg-slate-50/30",
    borderColor: "border-slate-100/35",
    arrowBg: "bg-slate-400/40",
    dotColor: "bg-slate-400/50",
    textColor: "text-slate-800",
    pattern: PatternGovern,
    items: ["个人办事", "法人办事", "一件事一次办", "一件事导办", "秒批服务", "无感申办"],
  },
  {
    title: "智慧党建",
    titleColor: "text-red-700/70",
    bgColor: "bg-red-50/25",
    borderColor: "border-red-100/30",
    arrowBg: "bg-red-500/40",
    dotColor: "bg-red-400/50",
    textColor: "text-red-900",
    pattern: PatternParty,
    items: ["党员服务", "党群服务"],
  },
  {
    title: "其他服务",
    titleColor: "text-stone-600/70",
    bgColor: "bg-stone-50/30",
    borderColor: "border-stone-100/30",
    arrowBg: "bg-stone-400/40",
    dotColor: "bg-stone-400/45",
    textColor: "text-stone-800",
    pattern: PatternOther,
    items: ["文化馆", "少年宫", "青年驿站"],
  },
]

/* ------------------------------------------------------------------ */
/*  Service Category Section                                           */
/* ------------------------------------------------------------------ */

function ServiceSection({ category }: { category: ServiceCategory }) {
  const Pattern = category.pattern

  return (
    <div className="mx-3 mb-3">
      <div
        className={`relative rounded-2xl ${category.bgColor} p-3.5 border ${category.borderColor} overflow-hidden`}
      >
        {/* Decorative background pattern — bottom right */}
        <Pattern />

        {/* Header */}
        <div className="relative flex items-center justify-between mb-3 z-10">
          <h3 className={`text-base font-bold ${category.titleColor} tracking-wide`}>
            {category.title}
          </h3>
          <button
            className={`w-7 h-7 rounded-full ${category.arrowBg} flex items-center justify-center`}
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Pill grid - 2 columns */}
        <div className="relative grid grid-cols-2 gap-2.5 z-10">
          {category.items.map((item) => (
            <button
              key={item}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/70 border border-white/80 backdrop-blur-sm hover:bg-white/90 active:scale-[0.98] transition-all"
            >
              <span className={`w-2 h-2 rounded-full ${category.dotColor} shrink-0`} />
              <span className={`text-sm font-medium ${category.textColor}/80 leading-tight truncate`}>
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main View                                                          */
/* ------------------------------------------------------------------ */

export function ServicesView() {
  return (
    <div className="flex flex-col min-h-full bg-background overflow-y-auto pb-4 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Top spacing */}
      <div className="h-2" />

      {/* Service categories */}
      {serviceCategories.map((cat) => (
        <ServiceSection key={cat.title} category={cat} />
      ))}
    </div>
  )
}
