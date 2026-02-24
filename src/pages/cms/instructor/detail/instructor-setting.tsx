import * as React from "react"
import { cn } from "@/lib/utils"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import {
  BookOpen,
  Wallet,
  MessageSquare,
  Settings,
  BadgeDollarSign,
  ShieldCheck,
  StickyNote,
  UserCog,
  UserX,
} from "lucide-react"

function GlassPanel({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      {...props}
      className={cn("border-white/10 bg-white/5 backdrop-blur-md text-white", className)}
    />
  )
}

type TabKey = "courses" | "payouts" | "feedback" | "settings"

export function InstructorAccountSettings() {
  const [tab, setTab] = React.useState<TabKey>("settings")

  const [revenueShare, setRevenueShare] = React.useState<number>(70)

  const [allowBeta, setAllowBeta] = React.useState(true)
  const [publicDM, setPublicDM] = React.useState(false)
  const [courseDelete, setCourseDelete] = React.useState(false)

  const [adminNotes, setAdminNotes] = React.useState("")
  const [activeAccount, setActiveAccount] = React.useState(true)

  const maxChars = 2402
  const charsLeft = Math.max(0, maxChars - adminNotes.length)

  return (
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              {/* Revenue Management */}
              <GlassPanel className="p-6 rounded-xl">
                <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                  <BadgeDollarSign className="h-4 w-4 text-primary" />
                  Revenue Management
                </h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Revenue Share (%)
                      </label>
                      <span className="text-2xl font-bold text-primary">{revenueShare}%</span>
                    </div>

                    <Slider
                      value={[revenueShare]}
                      onValueChange={(v) => setRevenueShare(v[0] ?? 0)}
                      min={0}
                      max={100}
                      step={1}
                    />

                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] text-slate-500 font-bold">0%</span>
                      <span className="text-[10px] text-slate-500 font-bold">50%</span>
                      <span className="text-[10px] text-slate-500 font-bold">100%</span>
                    </div>

                    <p className="text-[10px] text-slate-500 mt-4 italic border-t border-white/5 pt-3">
                      Standard platform tier is 60%. Current {revenueShare}% share is a special
                      administrative override.
                    </p>
                  </div>
                </div>
              </GlassPanel>

              {/* Permission Management */}
              <GlassPanel className="p-6 rounded-xl">
                <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Permission Management
                </h3>

                <div className="space-y-5">
                  <PermRow
                    title="Allow Beta Feature Access"
                    sub="Early access to AI sandbox tools"
                    checked={allowBeta}
                    onCheckedChange={setAllowBeta}
                  />
                  <PermRow
                    title="Direct Messaging (Public)"
                    sub="Students can message instructor before enrollment"
                    checked={publicDM}
                    onCheckedChange={setPublicDM}
                  />
                  <PermRow
                    title="Course Deletion Rights"
                    sub="Grant ability to hard-delete published courses"
                    danger
                    checked={courseDelete}
                    onCheckedChange={setCourseDelete}
                  />
                </div>
              </GlassPanel>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Internal notes */}
              <GlassPanel className="p-6 rounded-xl flex flex-col h-[320px]">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                  <StickyNote className="h-4 w-4 text-primary" />
                  Internal Admin Notes
                </h3>

                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Staff-only comments about this instructor's performance, special contract terms, or background verification details..."
                  className="flex-1 bg-slate-900/50 border-white/10 text-slate-200 focus-visible:ring-primary resize-none"
                />

                <div className="flex items-center justify-between mt-4">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                    Last modified: Oct 12, 2023
                  </p>
                  <span className="text-[10px] text-slate-500">
                    {charsLeft.toLocaleString()} Characters left
                  </span>
                </div>
              </GlassPanel>

              {/* Account status */}
              <GlassPanel className="p-6 rounded-xl">
                <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                  <UserCog className="h-4 w-4 text-primary" />
                  Account Status
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      <div>
                        <p className="text-sm font-bold uppercase tracking-tight">
                          {activeAccount ? "Active Account" : "Inactive Account"}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Instructor can login and manage courses
                        </p>
                      </div>
                    </div>

                    <Switch checked={activeAccount} onCheckedChange={setActiveAccount} />
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <Button
                      variant="secondary"
                      className="w-full px-4 py-3 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white font-bold text-[11px] uppercase tracking-widest"
                      onClick={() => console.log("Suspend")}
                    >
                      <UserX className="h-4 w-4 mr-2" />
                      Suspend Account
                    </Button>

                    <p className="text-[10px] text-slate-500 text-center mt-3 leading-relaxed">
                      Suspending this account will immediately revoke access, unpublish all
                      courses, and freeze any pending payouts.
                    </p>
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>
  )
}

function TabBtn({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all text-sm",
        active
          ? "bg-primary text-white font-medium shadow-[0_12px_30px_rgba(59,130,246,0.18)]"
          : "text-slate-400 hover:text-white hover:bg-white/5"
      )}
    >
      {icon}
      {label}
    </button>
  )
}

function PermRow({
  title,
  sub,
  danger,
  checked,
  onCheckedChange,
}: {
  title: string
  sub: string
  danger?: boolean
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span
          className={cn(
            "text-sm transition-all font-medium",
            danger ? "text-red-400 hover:text-red-300" : "text-slate-200 hover:text-white"
          )}
        >
          {title}
        </span>
        <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{sub}</span>
      </div>

      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}
