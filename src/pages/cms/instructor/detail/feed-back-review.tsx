import * as React from "react"
import { cn } from "@/lib/utils"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Search, Star, Reply, Flag } from "lucide-react"

type Review = {
  id: string
  name: string
  avatar?: string
  initials?: string
  initialsTone?: "primary" | "purple"
  course: string
  timeAgo: string
  stars: number
  content: string
}

function GlassPanel({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      {...props}
      className={cn("border-white/10 bg-white/5 backdrop-blur-md text-white", className)}
    />
  )
}

export function ReviewListWithFilter({
  reviews,
  onReply,
  onFlag,
}: {
  reviews: Review[]
  onReply?: (id: string) => void
  onFlag?: (id: string) => void
}) {
  const [q, setQ] = React.useState("")

  const filtered = React.useMemo(() => {
    const qq = q.trim().toLowerCase()
    if (!qq) return reviews
    return reviews.filter((r) => {
      return (
        r.name.toLowerCase().includes(qq) ||
        r.course.toLowerCase().includes(qq) ||
        r.content.toLowerCase().includes(qq)
      )
    })
  }, [q, reviews])

  return (
    <div className="space-y-4">
      {/* ONE FILTER */}
      <GlassPanel className="p-4 rounded-xl flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search reviews..."
            className="pl-10 bg-white/5 border-white/10 text-slate-200 placeholder:text-slate-500 focus-visible:ring-primary"
          />
        </div>
        <div className="text-xs text-slate-500 whitespace-nowrap">
          {filtered.length}/{reviews.length}
        </div>
      </GlassPanel>

      {/* LIST */}
      <div className="space-y-4">
        {filtered.map((r) => (
          <GlassPanel key={r.id} className="p-5 rounded-xl">
            <div className="flex gap-4">
              {r.avatar ? (
                <img
                  className="w-12 h-12 rounded-full object-cover shrink-0 border border-white/10"
                  src={r.avatar}
                  alt=""
                />
              ) : (
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-white/10 text-white font-bold",
                    r.initialsTone === "purple" ? "bg-purple-500/20" : "bg-primary/20"
                  )}
                >
                  {r.initials ?? "U"}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1 gap-4">
                  <div className="min-w-0">
                    <h5 className="text-white font-bold">{r.name}</h5>
                    <p className="text-[10px] text-primary/70 font-bold uppercase tracking-wider truncate">
                      {r.course}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{r.timeAgo}</span>
                </div>

                <Stars value={r.stars} />

                <p className="text-sm text-slate-300 leading-relaxed">{r.content}</p>

                <div className="mt-4 flex gap-4">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-[10px] font-bold text-slate-500 hover:text-primary uppercase tracking-widest"
                    onClick={() => (onReply ? onReply(r.id) : console.log("Reply", r.id))}
                  >
                    <Reply className="h-3.5 w-3.5 mr-1" />
                    Reply
                  </Button>

                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-[10px] font-bold text-slate-500 hover:text-primary uppercase tracking-widest"
                    onClick={() => (onFlag ? onFlag(r.id) : console.log("Flag", r.id))}
                  >
                    <Flag className="h-3.5 w-3.5 mr-1" />
                    Flag
                  </Button>
                </div>
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  )
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < value ? "text-yellow-500" : "text-slate-700")}
        />
      ))}
    </div>
  )
}
