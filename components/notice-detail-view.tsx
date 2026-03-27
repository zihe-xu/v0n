"use client"

import { ChevronLeft, Share2, Download, FileText, Eye, Calendar, Building2 } from "lucide-react"

interface NoticeDetailViewProps {
  onBack?: () => void
}

export function NoticeDetailView({ onBack }: NoticeDetailViewProps) {
  return (
    <div className="bg-background min-h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        {onBack ? (
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="返回"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        ) : (
          <div className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </div>
        )}
        <h1 className="text-lg font-semibold text-foreground">公告详情</h1>
        <button className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors" aria-label="分享">
          <Share2 className="w-4.5 h-4.5 text-muted-foreground" />
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        {/* Title section */}
        <div className="px-4 pt-5 pb-4 bg-card">
          <h2 className="text-xl font-bold text-foreground leading-snug text-balance mb-4">
            关于XXXXX的通知公告
          </h2>

          {/* Meta info pills */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/8 text-xs font-medium text-primary">
              <Building2 className="w-3 h-3" />
              XXXXXX单位
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
              <Calendar className="w-3 h-3" />
              2024-10-10 12:00
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
              <Eye className="w-3 h-3" />
              1,234 次阅读
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />
        </div>

        {/* Article body */}
        <div className="px-4 py-4 bg-card">
          <div className="text-sm text-foreground/85 leading-relaxed space-y-4">
            <p className="indent-[2em]">
              根据《广东省2024年考试录用公务员公告》，现就罗湖区职位考生体检有关事项公告如下：
            </p>

            <div>
              <p className="font-semibold text-foreground mb-1.5">一、入围体检人员</p>
              <p className="indent-[2em]">
                入围体检人员名单以中共深圳市委组织部发布名单为准，名单在深圳组工在线网站（http://www.zzb.sz.gov.cn）公布。
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-1.5">二、体检安排</p>
              <p className="indent-[2em]">
                体检时间：5月17日、18日面试的考生，于5月20日上午体检。
              </p>
              <p className="indent-[2em] mt-1.5">
                报到时间：体检当天7:15-7:45签到（超过7:45视为自动放弃）。
              </p>
              <p className="indent-[2em] mt-1.5">
                集合地点：深圳市罗湖区党群服务中心（黄贝岭地铁站B出口右转）。
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-1.5">三、体检须知</p>
              <p className="indent-[2em]">
                体检前，报考者应提前认真阅读体检须知（详见附件），熟悉当天或当场复检的项目及相关要求，并保持电话畅通。以便罗湖区委组织部临时通过电话或手机短信方式与考生联系。
              </p>
              <p className="indent-[2em] mt-1.5">
                体检当天，考生须携带本人笔试准考证、身份证证件原件，2张近期正面免冠证件照。罗湖区委组织部将在体检当天组织各职位面试最后一名考生在指定地点集合并统一报到。由罗湖区委组织部统一带至指定体检机构进行体检。如因联系确因不可抗拒因素无法按时参加体检的，请提前一天报罗湖区委组织部同意。不按时参加体检的，视为放弃体检资格。体检结束后，从工作人员处拿取本人笔试准考证，所携带的通讯工具交由交罗湖区委组织部工作人员统一保管。对违反规定擅自携带或使用通讯工具的，在体检过程中主动泄露个人姓名等信息的或与本次体检无关人员会面或交流的，未经许可离开体检现场的，以及体检过程中弄虚作假或者隐瞒影响体检结果的疾病的，体检机构工作人员确认体检项目无错漏、错检后，须向代检者或替换检者追究相关责任。
              </p>
            </div>

            <p className="indent-[2em]">
              如有不明事宜，请咨询罗湖区委组织部，政策咨询电话：0755-25666751。
            </p>

            {/* Signature */}
            <div className="flex flex-col items-end pt-4 gap-1">
              <p className="text-sm font-medium text-foreground">中共深圳市罗湖区委组织部</p>
              <p className="text-sm text-muted-foreground">2024年5月16日</p>
            </div>
          </div>
        </div>

        {/* Attachments */}
        <div className="mx-4 my-4 rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-border/50 bg-muted/30">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-primary inline-block" />
              附件下载
            </h3>
          </div>
          <div className="p-3 flex flex-col gap-2">
            {/* Attachment 1 */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">附件：体检须知.wps</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">128 KB</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Download className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-4" />
      </div>
    </div>
  )
}
