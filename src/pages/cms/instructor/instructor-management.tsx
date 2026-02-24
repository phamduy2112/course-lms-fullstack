import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import {
  Bell,
  UserPlus,
  Users,
  Clock3,
  Star,
  Award,
  Search,
  SlidersHorizontal,
  Eye,
  Settings,
  Ban,
  CheckCircle2,
  XCircle,
  RotateCcw,
  History,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

type Status = "Active" | "Pending" | "Suspended"

type Instructor = {
  id: string
  name: string
  email: string
  avatar: string
  expertise: { label: string; tone: "primary" | "purple" | "blue" | "emerald" | "red" | "slate" }[]
  courses: number
  students: string
  rating: number | null
  earnings: number
  status: Status
}

const instructorsSeed: Instructor[] = [
  {
    id: "1",
    name: "James Wilson",
    email: "james.w@techcore.ai",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMVBtJhhYjTBSFjoopf8D6gMR0hHUp33W1xHDdcZJiC6N80z6JHb2C4o8-9lH-hEF7QpS6fyfv74ES_zKiP5l0L5PMh40KRzqLGG66_qnvKSDY9VKpcHdTBoL4eGuJpATqMZv8YGS4dRmfEuttYerMZFJKvsi5Uyog2RjLCh7G4ZtZSMuCnNrXspy4l88M6gS_uS0ntppzMZtCQIB-Fx0u3n9LYpzoWfu-32MnpFGBY00TX_ZYBwFWgGfBFUaEbIKDfcn5QPTkCEc",
    expertise: [
      { label: "Gen AI", tone: "primary" },
      { label: "LLMs", tone: "purple" },
    ],
    courses: 12,
    students: "14.2k Students",
    rating: 4.9,
    earnings: 84200,
    status: "Active",
  },
  {
    id: "2",
    name: "Dr. Sarah Chen",
    email: "s.chen@mit.edu",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6l83YBQMDDa1PpURb-IbMqJZ-ZwJnsXMUMc6eyk9UJJTh5BEB3YPI7MXwTrRgKgcmmRyMLrtzn1_zoWejTo5xbvTGluJEw-cPTVZ5iBHM-L0kfb-ZxU0iONPb3T86jwqkUxK7OJKbAT9eAIjWcNPAeTBr_-CHqRB8m9YObqXBFMvrWl_Z-mZADPFVIQZQkG85zniKCV8wCfoocJ3y5XpNAjoFJY8scEeSkptGODqiDZDNa1XKJlvwkCvRy77PB3m0BY9aRdmiFSE",
    expertise: [
      { label: "Data Science", tone: "blue" },
      { label: "Python", tone: "emerald" },
    ],
    courses: 8,
    students: "28.5k Students",
    rating: 5.0,
    earnings: 112500,
    status: "Active",
  },
  {
    id: "3",
    name: "Marcus Thorne",
    email: "m.thorne@cyberark.io",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDK77Es3XQatR7XwYAvJyYN7S6bDkfuUaua1E28z53o3MO5v7u80Tzc2kXmTzEcErb40WhX31JN-gs-DhFvxEAh8qXGdy3JlbR7kj4vQ2FjsQmAeqJ1K1ieXSnJZQTzt3RfQL5JRyL4iu4_i4zpej0zDCjU4b00mCdSK6EYRvntshTJt1BjzSV1S-sMRm59C2U3aES7_1A-PgCpBuBBuAXGuaUC4NZJoZXhDQv4VXNg_JbNWA8MU0tizF4b04Kt4VigYNIWJfJR0mA",
    expertise: [{ label: "Security", tone: "red" }],
    courses: 1,
    students: "0 Students",
    rating: null,
    earnings: 0,
    status: "Pending",
  },
  {
    id: "4",
    name: "Elena Rossi",
    email: "elena.r@designhub.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHte6xWS4TCb1M1hXPcQ4RS0So0Ulc0uYh8Jtrn-SppOK2PYc_p6XJTL-9ioyvUDc-ZvDWJkBLEiwVLolgSip53j8ReMjdnNcLPsrVbGepJ3YvH9GH6-dqjMThsNxxykf2Q2MbMOvvCxxYYj0I8FOGx2djO_cNWt5C3u212_W4PsIwj7HzqkeYMJgmXUiBJUA1_tmD7qaf322RgfyAXM9ZhIlPd6DMA3mYh7nq-CU0yVm9VTCYc1a_O7Zv4hm5i0LAEYOAlYO8_mc",
    expertise: [{ label: "UI/UX AI", tone: "slate" }],
    courses: 4,
    students: "3.1k Students",
    rating: 4.2,
    earnings: 12450,
    status: "Suspended",
  },
]

function toneToBadgeClass(tone: Instructor["expertise"][number]["tone"]) {
  switch (tone) {
    case "primary":
      return "bg-primary/10 text-primary border-primary/20"
    case "purple":
      return "bg-purple-500/10 text-purple-400 border-purple-500/20"
    case "blue":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20"
    case "emerald":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    case "red":
      return "bg-red-500/10 text-red-400 border-red-500/20"
    case "slate":
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20"
  }
}

function statusToBadge(status: Status) {
  if (status === "Active")
    return {
      className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    }
  if (status === "Pending")
    return { className: "bg-amber-500/10 text-amber-500 border-amber-500/20" }
  return { className: "bg-red-500/10 text-red-500 border-red-500/20" }
}

function formatMoney(n: number) {
  // $112,500.00
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

function GlassCard(props: React.ComponentProps<typeof Card>) {
  return (
    <Card
      {...props}
      className={cn(
        "border-white/10 bg-white/5 backdrop-blur-md text-white",
        props.className
      )}
    />
  )
}

export default function InstructorManagementPage() {
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<string>("all")
  const [status, setStatus] = React.useState<string>("all")
  const [level, setLevel] = React.useState<string>("all")

  const filtered = React.useMemo(() => {
    return instructorsSeed.filter((i) => {
      const q = query.trim().toLowerCase()
      const matchQuery =
        !q ||
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.expertise.some((e) => e.label.toLowerCase().includes(q))

      const matchCategory =
        category === "all" ||
        i.expertise.some((e) => e.label.toLowerCase().includes(category))

      const matchStatus = status === "all" || i.status.toLowerCase() === status

      // Level là demo UI (Top Rated / Intermediate / Rising Star)
      const matchLevel = level === "all" ? true : true

      return matchQuery && matchCategory && matchStatus && matchLevel
    })
  }, [query, category, status, level])

  return (
    <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-[#070A1A] text-white">
      {/* Top Header */}
      <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-bold">Instructor Management</h1>
          <p className="text-slate-400 text-sm">
            Oversee and manage your global teaching workforce
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-400 hover:text-white hover:bg-white/5"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </Button>

          <Button className="bg-primary hover:bg-primary/90 text-white font-bold shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_12px_30px_rgba(59,130,246,0.22)]">
            <UserPlus className="h-4 w-4" />
            Invite New Instructor
          </Button>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {/* Summary KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <GlassCard className="p-6 rounded-xl flex items-center gap-5 border-l-4 border-l-primary">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Instructors</p>
              <h3 className="text-2xl font-bold">1,284</h3>
            </div>
          </GlassCard>

          <GlassCard className="p-6 rounded-xl flex items-center gap-5 border-l-4 border-l-amber-500">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Clock3 className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">Pending Apps</p>
              <h3 className="text-2xl font-bold">42</h3>
            </div>
          </GlassCard>

          <GlassCard className="p-6 rounded-xl flex items-center gap-5 border-l-4 border-l-emerald-500">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Star className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium">
                Avg. Instructor Rating
              </p>
              <h3 className="text-2xl font-bold">4.88</h3>
            </div>
          </GlassCard>

          <GlassCard className="p-6 rounded-xl flex items-center gap-5 border-l-4 border-l-purple-500">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Award className="h-5 w-5 text-purple-500" />
            </div>
            <div className="min-w-0">
              <p className="text-slate-400 text-sm font-medium">Top Earner</p>
              <h3 className="text-lg font-bold truncate">Dr. Sarah Chen</h3>
            </div>
          </GlassCard>
        </div>

        {/* Filters Section */}
        <GlassCard className="p-4 rounded-xl">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[280px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email or specialty..."
                className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary text-white placeholder:text-slate-500"
              />
            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[190px] bg-white/5 border-white/10 text-slate-200">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="gen">Generative AI</SelectItem>
                <SelectItem value="machine">Machine Learning</SelectItem>
                <SelectItem value="cyber">Cybersecurity</SelectItem>
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[160px] bg-white/5 border-white/10 text-slate-200">
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status: All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>

            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-[160px] bg-white/5 border-white/10 text-slate-200">
                <SelectValue placeholder="Level: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Level: All</SelectItem>
                <SelectItem value="top">Top Rated</SelectItem>
                <SelectItem value="mid">Intermediate</SelectItem>
                <SelectItem value="rising">Rising Star</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 text-white"
            >
              <SlidersHorizontal className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </GlassCard>

        {/* Instructor Table */}
        <GlassCard className="rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/10">
                  <TableHead className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Instructor
                  </TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Expertise
                  </TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Metrics
                  </TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Rating
                  </TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Earnings Share
                  </TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((i) => {
                  const isSuspended = i.status === "Suspended"
                  const statusBadge = statusToBadge(i.status)

                  return (
                    <TableRow
                      key={i.id}
                      className="border-white/5 hover:bg-white/[0.02]"
                    >
                      {/* Instructor */}
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={i.avatar}
                            alt={`Portrait of instructor ${i.name}`}
                            className={cn(
                              "w-10 h-10 rounded-full object-cover border-2 border-primary/20",
                              isSuspended && "opacity-50"
                            )}
                          />
                          <div>
                            <p
                              className={cn(
                                "font-bold text-sm",
                                isSuspended && "text-slate-500"
                              )}
                            >
                              {i.name}
                            </p>
                            <p
                              className={cn(
                                "text-xs",
                                isSuspended ? "text-slate-600" : "text-slate-500"
                              )}
                            >
                              {i.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Expertise */}
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {i.expertise.map((e) => (
                            <Badge
                              key={e.label}
                              variant="outline"
                              className={cn(
                                "px-2 py-0.5 text-[10px] font-bold uppercase rounded",
                                toneToBadgeClass(e.tone)
                              )}
                            >
                              {e.label}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>

                      {/* Metrics */}
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className={cn("flex flex-col", isSuspended && "text-slate-500")}>
                          <span className="font-medium">{i.courses} Courses</span>
                          <span className={cn("text-xs", isSuspended ? "text-slate-500" : "text-slate-400")}>
                            {i.students}
                          </span>
                        </div>
                      </TableCell>

                      {/* Rating */}
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        {i.rating == null ? (
                          <div className="flex items-center gap-1 text-slate-600">
                            <Star className="h-4 w-4 opacity-60" />
                            <span className="text-sm font-bold">N/A</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-4 w-4" />
                            <span className="text-sm font-bold">{i.rating.toFixed(1)}</span>
                          </div>
                        )}
                      </TableCell>

                      {/* Earnings */}
                      <TableCell
                        className={cn(
                          "px-6 py-4 whitespace-nowrap text-sm font-bold",
                          isSuspended ? "text-slate-600" : "text-emerald-400"
                        )}
                      >
                        {formatMoney(i.earnings)}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant="outline"
                          className={cn("px-2.5 py-1 text-xs font-bold rounded-full", statusBadge.className)}
                        >
                          {i.status}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          {/* Active rows */}
                          {i.status === "Active" && (
                            <>
                              <IconAction title="View Profile" icon={<Eye className="h-4 w-4" />} />
                              <IconAction title="Settings" icon={<Settings className="h-4 w-4" />} />
                              <IconAction
                                title="Suspend"
                                intent="danger"
                                icon={<Ban className="h-4 w-4" />}
                              />
                            </>
                          )}

                          {/* Pending rows */}
                          {i.status === "Pending" && (
                            <>
                              <IconAction
                                title="Approve"
                                icon={<CheckCircle2 className="h-4 w-4" />}
                              />
                              <IconAction title="Settings" icon={<Settings className="h-4 w-4" />} />
                              <IconAction
                                title="Reject"
                                intent="danger"
                                icon={<XCircle className="h-4 w-4" />}
                              />
                            </>
                          )}

                          {/* Suspended rows */}
                          {i.status === "Suspended" && (
                            <>
                              <IconAction title="Re-activate" icon={<RotateCcw className="h-4 w-4" />} />
                              <IconAction title="History" icon={<History className="h-4 w-4" />} />
                              <IconAction
                                title="Delete"
                                intent="dangerSolid"
                                icon={<Trash2 className="h-4 w-4" />}
                              />
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-white/[0.02]">
            <p className="text-xs text-slate-500 font-medium">
              Showing 1 to 4 of 1,284 instructors
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-white/5 hover:bg-white/10 text-slate-400 disabled:opacity-30"
                disabled
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button className="h-8 w-8 p-0 rounded bg-primary text-white text-xs font-bold">
                1
              </Button>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 rounded hover:bg-white/5 text-slate-400 text-xs font-bold"
              >
                2
              </Button>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 rounded hover:bg-white/5 text-slate-400 text-xs font-bold"
              >
                3
              </Button>

              <span className="text-slate-600 text-xs px-1">...</span>

              <Button
                variant="ghost"
                className="h-8 w-8 p-0 rounded hover:bg-white/5 text-slate-400 text-xs font-bold"
              >
                128
              </Button>

              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-white/5 hover:bg-white/10 text-slate-400"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </GlassCard>

        <Separator className="bg-white/10" />
      </div>
    </main>
  )
}

function IconAction({
  title,
  icon,
  intent,
}: {
  title: string
  icon: React.ReactNode
  intent?: "danger" | "dangerSolid"
}) {
  const base =
    "h-8 w-8 p-0 rounded bg-white/5 hover:bg-white/10 text-slate-200 transition-all"
  const danger = "hover:bg-red-500/20 hover:text-red-500"
  const dangerSolid = "bg-red-500/20 text-red-500 hover:bg-red-500/30"

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      title={title}
      className={cn(base, intent === "danger" && danger, intent === "dangerSolid" && dangerSolid)}
      onClick={() => {
        // TODO: wire actions
        console.log(title)
      }}
    >
      {icon}
    </Button>
  )
}
