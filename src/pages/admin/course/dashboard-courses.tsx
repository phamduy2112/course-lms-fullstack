"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

type RangeKey = "7D" | "30D" | "3M" | "All"
const ranges: RangeKey[] = ["7D", "30D", "3M", "All"]

// Demo data (bạn thay bằng API của bạn)
const enrollmentDataByRange: Record<RangeKey, { label: string; enroll: number }[]> = {
  "7D": [
    { label: "Mon", enroll: 120 },
    { label: "Tue", enroll: 220 },
    { label: "Wed", enroll: 160 },
    { label: "Thu", enroll: 280 },
    { label: "Fri", enroll: 200 },
    { label: "Sat", enroll: 320 },
    { label: "Sun", enroll: 260 },
  ],
  "30D": Array.from({ length: 14 }).map((_, i) => ({
    label: `W${i + 1}`,
    enroll: 140 + i * 18 + (i % 3) * 35,
  })),
  "3M": Array.from({ length: 12 }).map((_, i) => ({
    label: `M${i + 1}`,
    enroll: 180 + i * 22 + (i % 4) * 28,
  })),
  "All": Array.from({ length: 16 }).map((_, i) => ({
    label: `P${i + 1}`,
    enroll: 120 + i * 20 + (i % 5) * 30,
  })),
}

const topLectures = [
  { idx: "01", title: "Introduction to Neural Networks", duration: "15:30", completion: 96, views: "4.5k" },
  { idx: "04", title: "Backpropagation Explained", duration: "22:15", completion: 92, views: "3.8k" },
  { idx: "07", title: "Building Your First Model", duration: "45:00", completion: 85, views: "3.2k" },
]

const progressDist = [
  { name: "Just Started (0–25%)", value: 45 },
  { name: "Midway (26–75%)", value: 25 },
  { name: "Near Completion (76%+)", value: 30 },
]

const donutColors = ["hsl(var(--primary))", "hsl(142.1 76.2% 36.3%)", "hsl(215 20.2% 65.1%)"]

type TooltipPayload = { value: number }
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-sm">
      <div className="mb-1 font-medium">{label}</div>
      <div className="text-muted-foreground">
        Enrollments: <span className="font-semibold text-foreground">{payload[0].value}</span>
      </div>
    </div>
  )
}

function clampPct(n: number) {
  return Math.max(0, Math.min(100, n))
}

export default function LmsDashboard() {
  const [range, setRange] = React.useState<RangeKey>("7D")
  const [course, setCourse] = React.useState<string>("1")

  const data = enrollmentDataByRange[range]
  const totalStudents = 850

  // KPI demo
  const kpis = [
    { label: "Enrollments", value: "1,245", delta: "+12%" },
    { label: "Revenue", value: "$12,450", delta: "+5%" },
    { label: "Rating", value: "4.8", sub: "Based on 320 reviews" },
    { label: "Completion", value: "76%", delta: "+2%" },
    { label: "Active Now", value: "85", sub: "Students learning right now" },
  ] as const

  return (
    <div className="flex h-full w-full flex-col gap-6 p-4 md:p-6">
      {/* Heading */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">Course Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Theo dõi enrollments, tiến độ học viên, reviews và hiệu suất bài giảng.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="w-full sm:w-[360px]">
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Mastering AI with Python: Deep Learning</SelectItem>
                  <SelectItem value="2">Full Stack Web Development 2024</SelectItem>
                  <SelectItem value="3">React Native for Beginners</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="text-black">Edit Course</Button>
              <Button className="text-white">Go to Course Page</Button>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {kpis.map((k) => (
          <Card key={k.label} className="overflow-hidden glass-card text-white">
            <CardHeader className="space-y-1 pb-3">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider">
                {k.label}
              </CardDescription>
              <CardTitle className="text-3xl">{k.value}</CardTitle>
            </CardHeader>

            <CardContent className="pt-0">
              {"delta" in k ? (
                <Badge variant="secondary" className="gap-1">
                  <span className="text-emerald-600">▲</span>
                  {k.delta}
                </Badge>
              ) : (
                <p className="text-xs text-muted-foreground">{k.sub}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chart */}
      <Card className="glass-card text-white">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle>Enrollment Over Time</CardTitle>
            <CardDescription>Chọn range để xem xu hướng enrollments.</CardDescription>
          </div>

          <Tabs value={range} onValueChange={(v) => setRange(v as RangeKey)}>
            <TabsList>
              {ranges.map((r) => (
                <TabsTrigger key={r} value={r}>
                  {r}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart className="" data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <YAxis
             
                tickLine={false}
                axisLine={false}
                fontSize={12}
                width={30}
              />
              <RechartsTooltip content={<ChartTooltip />} />
              <Bar fill="#ffffff"  dataKey="enroll"  radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Engagement & Progress */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Top Lectures */}
        <Card className="glass-card text-white">
          <CardHeader className="flex flex-row items-center justify-between ">
            <div className="space-y-1">
              <CardTitle>Top Lectures</CardTitle>
              <CardDescription>Những bài giảng có performance tốt nhất.</CardDescription>
            </div>
            <Button variant="ghost" className="text-xs">
              View All
            </Button>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {topLectures.map((l) => (
                <div key={l.idx} className="rounded-lg border p-4 bg-background/5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9  items-center justify-center rounded-md bg-background/20 text-sm font-bold text-primary">
                        {l.idx}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{l.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {l.duration} • {l.completion}% completion rate
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{l.views} Views</Badge>
                  </div>

                  {/* <div className="mt-3">
                    <Progress value={clampPct(l.completion)} />
                  </div> */}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress donut */}
        <Card className="glass-card text-white">
            <div className="bg-background/5"></div>
          <CardHeader>
            <CardTitle>Student Progress Breakdown</CardTitle>
            <CardDescription>Phân bố tiến độ học tập của học viên.</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="h-[220px] w-full sm:w-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie

                    data={progressDist}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {progressDist.map((_, idx) => (
                      <Cell key={idx} fill={donutColors[idx]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null
                      const p = payload[0] as any
                      return (
                        <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-sm">
                          <div className="font-medium">{p.name}</div>
                          <div className="text-muted-foreground">
                            Share: <span className="font-semibold text-foreground">{p.value}%</span>
                          </div>
                        </div>
                      )
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full space-y-3">
              <div className="rounded-lg border p-4">
                <div className="text-2xl font-bold">{totalStudents}</div>
                <div className="text-xs text-muted-foreground">Total Students</div>
              </div>

              <Separator />

              <div className="space-y-2">
                {progressDist.map((p, idx) => (
                  <div key={p.name} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm text-muted-foreground">{p.name}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{p.value}%</span>
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: donutColors[idx] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Rating breakdown */}
        <Card className="lg:col-span-1 glass-card text-white">
          <CardHeader>
            <CardTitle>Reviews Analysis</CardTitle>
            <CardDescription>Tổng quan rating và phân bố sao.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4 text-center">
              <div className="text-5xl font-bold">4.8</div>
              <div className="mt-1 text-sm text-muted-foreground">Course Rating</div>
            </div>

            <div className="space-y-3">
              {[
                { star: 5, pct: 80 },
                { star: 4, pct: 15 },
                { star: 3, pct: 3 },
                { star: 2, pct: 1 },
                { star: 1, pct: 1 },
              ].map((r) => (
                <div key={r.star} className="flex items-center gap-3">
                  <div className="w-6 text-sm font-semibold">{r.star}★</div>
                  <div className="flex-1">
                    <Progress className="bg-amber-200 [&>div]:bg-amber-400" value={r.pct} />
                  </div>
                  <div className="w-10 text-right text-xs text-muted-foreground">{r.pct}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent feedback */}
        <Card className="lg:col-span-2 glass-card text-white">
          <CardHeader className="flex flex-row items-center  justify-between">
            <div className="space-y-1 ">
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>Những đánh giá gần đây từ học viên.</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="text-black" size="sm">
                Filter
              </Button>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <ScrollArea className="h-[320px] pr-3">
              <div className="space-y-3  bg-background/5">
                {[
                  {
                    name: "Sarah Jenkins",
                    time: "2 hours ago",
                    stars: 5,
                    content:
                      "This course completely changed my understanding of AI. The section on Neural Networks was particularly well explained. Would love more examples on PyTorch though!",
                  },
                  {
                    name: "Marcus Chen",
                    time: "1 day ago",
                    stars: 4,
                    content:
                      "Great content but the audio quality in Module 3 is a bit low. Otherwise, excellent explanations.",
                  },
                ].map((rv) => (
                  <div key={rv.name} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{rv.name}</div>
                        <div className="text-xs text-muted-foreground">{rv.time}</div>
                      </div>
                      <Badge variant="secondary">{rv.stars}★</Badge>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {rv.content}
                    </p>
                    <div className="mt-3">
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      {/* <div className="flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>© 2024 LMS Instructor. All rights reserved.</div>
        <div className="flex gap-4">
          <Button variant="link" className="h-auto p-0 text-muted-foreground">
            Help Center
          </Button>
          <Button variant="link" className="h-auto p-0 text-muted-foreground">
            Terms
          </Button>
          <Button variant="link" className="h-auto p-0 text-muted-foreground">
            Privacy
          </Button>
        </div>
      </div> */}
    </div>
  )
}
