import * as React from "react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import {
  ChevronRight,
  Ban,
  Save,
  BookOpen,
  Wallet,
  MessageSquare,
  Settings,
  TrendingUp,
  GraduationCap,
  Users,
  Plus,
  Pencil,
  BarChart3,
  Star,
} from "lucide-react"
import { ReviewListWithFilter } from "./feed-back-review"
import { InstructorAccountSettings } from "./instructor-setting"

type InstructorStatus = "Active" | "Pending" | "Suspended"

type InstructorProfile = {
  name: string
  title: string
  status: InstructorStatus
  avatar: string
  email: string
  website: string
  revenueTotal: number
  revenueDeltaPct: number
  hoursTaught: number
  studentCount: number
}

type Course = {
  id: string
  title: string
  createdAt: string
  lastUpdated: string
  enrolled: string
  rating: number
  revenue: number
  status: "Live" | "Draft"
  cover: string
}

type Feedback = {
  id: string
  name: string
  timeAgo: string
  stars: number // 1..5
  content: string
  course: string
  avatar: string
}

const profileSeed: InstructorProfile = {
  name: "Dr. Aris Thorne",
  title: "Senior AI Researcher",
  status: "Active",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBQlwlsnHgt7gUmVWWGakS4iTPicJOc3pNLA0bfiZSMmDWQeYo_B-zcR1SHHtbETNY-iRp3XI6Xu5hpGdgl94-CeSPiBNyEm8XRKIrzHpnMN98flH868vWNqjtRj9gqvevgeXZC8g0YZGAmvSrnU2OUZZxp-U4l4aBb8AOEOYWze5N9SDPgk6vIiZZclECPyUnqgz9nKNpjYkeO0_tylGcxycyhZYZ8ERkEm-R9VwGS5KH7GUJgvzQaYujGo1qwehxzy2UtBibh4NQ",
  email: "a.thorne@neural.lab",
  website: "aris-thorne.io",
  revenueTotal: 45210,
  revenueDeltaPct: 12,
  hoursTaught: 1240,
  studentCount: 8502,
}

const coursesSeed: Course[] = [
  {
    id: "c1",
    title: "Deep Learning 101: From Neural Nets to Transformers",
    createdAt: "Oct 24, 2023",
    lastUpdated: "2 days ago",
    enrolled: "3,402 Students",
    rating: 4.9,
    revenue: 12450,
    status: "Live",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHvTahnU4r8u9ULrvHQolG95QAIv9Dk1H376yqs9u4opKSecar1TkTEBbIakzRLoj5D1GZYzH9ne3Ye4LThZnJrT3dNTjm7MO92rvLwGNvLDp1ZEE6aTw7Qo0u4xKhUqtztfY_L-4ucsh6Ha-Ttzpw_mbSaHTu8yWOgiGeMzR-Lrfh1abePpLw6RNot7Gd8YX5y5f0yv1FNaxvJ45FskkYlRvou2_oD2qGm2EbFghy9M0m85ROfhXOIBquVsCzOTjxQZl7LYkNGOA",
  },
  {
    id: "c2",
    title: "Advanced NLP for Generative AI Models",
    createdAt: "Jan 12, 2024",
    lastUpdated: "1 week ago",
    enrolled: "1,120 Students",
    rating: 4.7,
    revenue: 8900,
    status: "Live",
    cover:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBUk4w6YCn2V13QZL_OrC8i3GGYiaGNY_1xuxJvupDr7AA7YBH5nZL5PbxEjGAfNWZmxQJ0nWuydzTEc83Sl2y6YS3ONoSZapsPYpKq2XiAjZNiBpbGEMka7oo-C1frJ49nEzhYNXABrPqHJOWYjlXkKMRHheobdAe69wnAm3XLMcAkIWdZfwCJprHs1mktC_lSRaieOihbLJDFzpy9RM1gdPrsl31RYzUOP6Z8UMcqfc2ibCRWQnaXG_39SHjkQHsoI8PdL9-Mg_c",
  },
]

const feedbackSeed: Feedback[] = [
  {
    id: "f1",
    name: "Leo Vance",
    timeAgo: "2 hours ago",
    stars: 5,
    content:
      `"Dr. Thorne's explanation of backpropagation is the first one that actually clicked for me. The coding labs are top-notch!"`,
    course: "Deep Learning 101",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCy0qSuezoJnYvSmXFTfYNFbUFKCbkaWxrgCpP99rRW9gE8HZhs5dv86rB-Brejn_ggjJE2ZZOmzyRjIZBaMFOAMkvVRCsGziyJGRBkF9i7hwEHioTmkNQqmZq__sU2keNTpmcnxmlybwXiwbeG2ncWb6WTIfxUT57oNiLoN0uwDo4hOozOrjBk50JLmGumv6OXp4e40GQSHAer_jnyYgh99f6uUss-Q-LpUe6Tgv2zV9ZCwBJ-FFDbyC6Ur9qvCylRMyAl8MOSQcw",
  },
  {
    id: "f2",
    name: "Maya Rivera",
    timeAgo: "6 hours ago",
    stars: 4,
    content:
      `"Great technical depth. Sometimes the pace is a bit fast but the course notes are comprehensive enough to keep up."`,
    course: "Advanced NLP",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXgyx47wtAYhl-35IQ4ZykMV0NVpITz5iZU7ys7sTVTwlhlAJT6oduue-wamAW2L-prl9szPy9_6fkTdhQ1sAdalekLhfUx5suYmrHrVzR9EWLVYi2e7Q4nzfkqfdafvuobqtI5BDfsaeswhY_Q4ARzAQ_f5-AQouYgymAl_xL_8GMjo8G7LEBSiYSj9rpno-AODCzilvkMOAOX4F2YrNqqUDElCduiUHQp9Rtl8KjX4m-0SyxabRbfYsi87w26mD-mGV7PHY9QbI",
  },
]

function formatMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

function GlassPanel({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      {...props}
      className={cn("border-white/10 bg-white/5 backdrop-blur-md text-white", className)}
    />
  )
}

function GlassCard({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card
      {...props}
      className={cn("border-white/10 bg-white/[0.06] text-white", className)}
    />
  )
}

export default function InstructorProfilePage() {
  const [tab, setTab] = React.useState<"courses" | "payouts" | "feedback" | "settings">(
    "courses"
  )

  const [revenueShare, setRevenueShare] = React.useState<number>(70)
  const [allowBeta, setAllowBeta] = React.useState<boolean>(true)
  const [allowDM, setAllowDM] = React.useState<boolean>(false)
  const [notes, setNotes] = React.useState<string>("")

  const p = profileSeed

  return (
    <div className="flex h-screen overflow-hidden bg-[#070A1A] text-white">
      <main className="flex-1 flex flex-col overflow-hidden px-8 py-6 max-w-7xl mx-auto w-full gap-6">
        {/* Breadcrumbs + actions */}
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">CMS</span>
            <ChevronRight className="h-4 w-4 text-slate-500" />
            <span className="text-slate-500">Instructors</span>
            <ChevronRight className="h-4 w-4 text-slate-500" />
            <span className="text-primary font-medium">Instructor Profile</span>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
              onClick={() => console.log("Suspend")}
            >
              <Ban className="h-4 w-4" />
              Suspend Account
            </Button>

            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => console.log("Save")}
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </nav>

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-80 flex flex-col gap-6 overflow-hidden">
            <GlassPanel className="p-6 rounded-xl flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src={p.avatar}
                  alt="Instructor Portrait"
                  className="w-32 h-32 rounded-full border-4 border-primary/20 object-cover"
                />
                <span className="absolute bottom-1 right-2 w-5 h-5 bg-green-500 border-4 border-[#070A1A] rounded-full shadow-[0_0_18px_rgba(34,197,94,0.45)]" />
              </div>

              <h2 className="text-2xl font-bold">{p.name}</h2>
              <p className="text-primary/80 font-medium mb-4">{p.title}</p>

              <Badge
                variant="outline"
                className="mb-6 bg-primary/10 border-primary/30 text-primary text-xs font-semibold tracking-wider uppercase"
              >
                Active Instructor
              </Badge>

              <div className="grid grid-cols-1 w-full gap-3">
                <GlassCard className="p-3 rounded-lg text-left">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Total Revenue
                  </p>
                  <div className="flex items-end justify-between">
                    <span className="text-xl font-bold">{formatMoney(p.revenueTotal)}</span>
                    <span className="text-xs text-green-400 flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {p.revenueDeltaPct}%
                    </span>
                  </div>
                </GlassCard>

                <GlassCard className="p-3 rounded-lg text-left">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Hours Taught
                  </p>
                  <div className="flex items-end justify-between">
                    <span className="text-xl font-bold">{p.hoursTaught.toLocaleString()}</span>
                    <GraduationCap className="h-4 w-4 text-primary/60" />
                  </div>
                </GlassCard>

                <GlassCard className="p-3 rounded-lg text-left">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Student Count
                  </p>
                  <div className="flex items-end justify-between">
                    <span className="text-xl font-bold">{p.studentCount.toLocaleString()}</span>
                    <Users className="h-4 w-4 text-primary/60" />
                  </div>
                </GlassCard>
              </div>
            </GlassPanel>

            <GlassPanel className="p-6 rounded-xl">
              <h3 className="text-sm font-bold mb-4 uppercase tracking-widest">
                Internal Contact
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">@</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Work Email</p>
                    <p className="text-sm text-slate-200">{p.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">🌐</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Website</p>
                    <p className="text-sm text-slate-200">{p.website}</p>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </aside>

          {/* Right content */}
          <section className="flex-1 flex flex-col gap-6 overflow-hidden">
            {/* Tabs */}
            <GlassPanel className="p-1 rounded-xl">
              <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
                <TabsList className="grid grid-cols-4 w-full bg-transparent p-0 gap-1">
                  <TabsTrigger
                    value="courses"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-[0_12px_30px_rgba(59,130,246,0.18)] rounded-lg py-3"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Courses
                  </TabsTrigger>

                  <TabsTrigger
                    value="payouts"
                    className="rounded-lg py-3 text-slate-300 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Payout History
                  </TabsTrigger>

                  <TabsTrigger
                    value="feedback"
                    className="rounded-lg py-3 text-slate-300 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Student Feedback
                  </TabsTrigger>

                  <TabsTrigger
                    value="settings"
                    className="rounded-lg py-3 text-slate-300 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </TabsTrigger>
                </TabsList>

                {/* Scroll area */}
                <div className="mt-6 flex-1 overflow-y-auto space-y-6 pr-2">
                  {/* Courses */}
                  <TabsContent value="courses" className="m-0 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">
                          Active Courses{" "}
                          <span className="text-slate-500 text-sm ml-2 font-normal">
                            ({coursesSeed.length})
                          </span>
                        </h3>

                        <Button
                          variant="ghost"
                          className="text-primary hover:text-white hover:bg-white/5"
                          onClick={() => console.log("Add course")}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Course
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {coursesSeed.map((c) => (
                          <CourseCard key={c.id} course={c} />
                        ))}
                      </div>
                    </div>

                    {/* Quick controls */}
                    <GlassPanel className="p-6 rounded-xl">
                      <h3 className="text-lg font-bold mb-6">Admin Quick Controls</h3>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                              Revenue Share (%)
                            </label>

                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <Slider
                                  value={[revenueShare]}
                                  onValueChange={(v) => setRevenueShare(v[0] ?? 0)}
                                  min={0}
                                  max={100}
                                  step={1}
                                />
                              </div>
                              <span className="text-xl font-bold">{revenueShare}%</span>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-white/5">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                              Permission Overrides
                            </label>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-300 hover:text-white transition-all">
                                  Allow Beta Feature Access
                                </span>
                                <Switch checked={allowBeta} onCheckedChange={setAllowBeta} />
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-300 hover:text-white transition-all">
                                  Direct Messaging (Public)
                                </span>
                                <Switch checked={allowDM} onCheckedChange={setAllowDM} />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Internal Admin Notes
                          </label>
                          <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add notes for other admins to see regarding this instructor's performance or background check..."
                            className="min-h-[128px] bg-slate-900/50 border-white/10 text-slate-200 focus-visible:ring-primary"
                          />
                        </div>
                      </div>
                    </GlassPanel>

                    {/* Feedback preview */}
                    <ReviewListWithFilter
  reviews={feedbackSeed}
  onReply={(id) => {
    console.log("Reply review id =", id)
  }}
  onFlag={(id) => {
    console.log("Flag review id =", id)
  }}
/>

                  </TabsContent>

                  {/* Payouts placeholder */}
                  <TabsContent value="payouts" className="m-0">
                    <GlassPanel className="p-6 rounded-xl">
                      <h3 className="text-lg font-bold mb-2">Payout History</h3>
                      <p className="text-slate-400 text-sm">
                        (Placeholder) Bạn muốn mình render bảng payouts theo dữ liệu nào?
                      </p>
                    </GlassPanel>
                  </TabsContent>

                  {/* Feedback tab */}
                  <TabsContent value="feedback" className="m-0">
                           <ReviewListWithFilter
  reviews={feedbackSeed}
  onReply={(id) => {
    console.log("Reply review id =", id)
  }}
  onFlag={(id) => {
    console.log("Flag review id =", id)
  }}
/>
                  </TabsContent>

                  {/* Settings placeholder */}
                  <TabsContent value="settings" className="m-0">
                   <InstructorAccountSettings />
                  </TabsContent>
                </div>
              </Tabs>
            </GlassPanel>

            <Separator className="bg-white/10" />
          </section>
        </div>
      </main>
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  return (
    <GlassCard className="p-5 rounded-xl flex flex-col sm:flex-row sm:items-center gap-6">
      <div className="w-full sm:w-24 sm:h-24 h-40 rounded-lg overflow-hidden shrink-0 border border-white/5">
        <img src={course.cover} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="min-w-0">
            <h4 className="text-white font-bold text-lg leading-tight">
              {course.title}
            </h4>
            <p className="text-slate-500 text-sm">
              Created: {course.createdAt} • Last Updated: {course.lastUpdated}
            </p>
          </div>

          <Badge
            variant="outline"
            className="px-3 py-1 bg-green-500/10 text-green-400 border-green-500/20 rounded-full text-[10px] font-bold uppercase"
          >
            {course.status}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
              Enrolled
            </p>
            <p className="text-white font-medium">{course.enrolled}</p>
          </div>

          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
              Rating
            </p>
            <p className="text-white font-medium flex items-center gap-1">
              {course.rating.toFixed(1)}{" "}
              <Star className="h-4 w-4 text-yellow-500" />
            </p>
          </div>

          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
              Revenue
            </p>
            <p className="text-white font-medium">{formatMoney(course.revenue)}</p>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col gap-2">
        <Button
          variant="secondary"
          className="bg-primary/20 text-primary hover:bg-primary hover:text-white text-xs font-bold"
          onClick={() => console.log("Edit", course.id)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          EDIT
        </Button>
        <Button
          variant="secondary"
          className="bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white text-xs font-bold"
          onClick={() => console.log("Analytics", course.id)}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          ANALYTICS
        </Button>
      </div>
    </GlassCard>
  )
}

