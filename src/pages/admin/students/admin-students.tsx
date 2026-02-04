"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { EnrollStudentDialog } from "./enroll-students"

type StudentStatus = "active" | "idle" | "completed"
type CourseKey = "all" | "uiux" | "python" | "react"

type Student = {
  id: string
  name: string
  email: string
  avatarUrl: string
  online: boolean
  courseTitle: string
  courseModule: string
  enrolledAt: string
  progressPct: number
  lastActiveText: string
  lastActiveTone: "normal" | "danger"
  progressTone: "primary" | "yellow" | "red"
}

const students: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkU9CoMR37ALqtznBatoDGH3Kg72I5mHow__j4oQE0O_w961F9lvd9edrtm2YMZnTSRXZXtJ0-tP-dQMm9vJDdYkqmrjwTpoZJ1bjiZgXJ4mm5xt50wOieUxg3q1NBB7a8ktdyMGlsNfcKagUYIvFwd0fKMe3u7iMvHJDcvaDHmlvOg5PT20EBwW_ur8i5_xdDMcgPR4ieY8F9sjtwTrqeiCh2hvG3U3kh3oKBj5EttWkCVlvH5ug2ocURal1LRvke8p8ZgGUZogc",
    online: true,
    courseTitle: "Advanced UI/UX Design",
    courseModule: "Module 4: Prototyping",
    enrolledAt: "Oct 24, 2023",
    progressPct: 75,
    lastActiveText: "Last active: 2h ago",
    lastActiveTone: "normal",
    progressTone: "primary",
  },
  {
    id: "2",
    name: "Mark Smith",
    email: "mark.s@example.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpJLP0FfhHifGmliI3cfQBibFvXb9Oycw3xeREGJ_Te5kzgPH1zWkxgOUyX-SJ8VNSbHNHTaUvSekLl0-NjhvgwqBfYSXF9lZC6IUxTPFPl_0dwdiNvW3FSr1cEod6nOFXt8k5vi5VDTqnsoBtnW_FOtrqy8dFrOup-z5bpNVodgT-QnooErV5RsQe1tJ2GzsNT0afa0c7v3ylS_kIPUoEI5UA6m7wMs8zuqf1wb3-8DZ7uqXhTzp7QjHNRZCRWWafpzVbTWhMEqs",
    online: true,
    courseTitle: "Python for Data Science",
    courseModule: "Module 2: Pandas",
    enrolledAt: "Nov 01, 2023",
    progressPct: 32,
    lastActiveText: "Last active: 5m ago",
    lastActiveTone: "normal",
    progressTone: "yellow",
  },
  {
    id: "3",
    name: "Sarah Lee",
    email: "sarah.lee@example.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQKUhFLDadkmRMRu0IMdhNdN5X8JfCY1kyI4msbJigdOSURe7KDssKydZIt2vNOR5Y5fOoqvkgwsBT76gfixVdibBREm7stdW38YD4gW0h9OQD1pOCWwM29X9BScG11PyGufoQ5yrq1jlQKEjFM1x_WLm5X5Th4JGjGclID59dVcSNy9rGhw0aQ5uw1TFI4U2w4eaRUn_EFc_8F_igPewLKNtMQmMIW3tZi1YMqno4-iTMt_SKp04uromaQa2CCWJzk7uSih44dC8",
    online: false,
    courseTitle: "React Native Masterclass",
    courseModule: "Module 1: Intro",
    enrolledAt: "Sep 15, 2023",
    progressPct: 12,
    lastActiveText: "Last active: 5d ago",
    lastActiveTone: "danger",
    progressTone: "red",
  },
]

function progressColorClass(tone: Student["progressTone"]) {
  // ✅ shadcn Progress: đổi màu indicator bằng [&>div]:bg-...
  if (tone === "yellow") return "[&>div]:bg-yellow-500"
  if (tone === "red") return "[&>div]:bg-red-500"
  return "[&>div]:bg-primary"
}

export default function StudentManagement() {
  const [query, setQuery] = React.useState("")
  const [course, setCourse] = React.useState<CourseKey>("all")
  const [status, setStatus] = React.useState<StudentStatus | "any">("any")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return students.filter((s) => {
      const matchQ =
        !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)

      const matchCourse =
        course === "all" ||
        (course === "uiux" && s.courseTitle.includes("UI/UX")) ||
        (course === "python" && s.courseTitle.includes("Python")) ||
        (course === "react" && s.courseTitle.includes("React"))

      const matchStatus =
        status === "any" ||
        (status === "active" && s.lastActiveTone === "normal") ||
        (status === "idle" && s.lastActiveText.includes("d")) ||
        (status === "completed" && s.progressPct >= 95)

      return matchQ && matchCourse && matchStatus
    })
  }, [query, course, status])

  return (
    <div className="flex h-full grow flex-col bg-[#101323]">
      <div className="flex flex-1 justify-center py-5 px-4 ">
        <div className="flex w-full flex-1 flex-col gap-6">
          {/* Page Heading */}
          <div className="flex flex-wrap justify-between gap-3 px-4 pt-4">
            <div className="flex min-w-72 flex-col gap-2">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Student Management
              </h1>
              <p className="text-[#909acb] text-base">
                Manage 452 students across 3 active courses
              </p>
            </div>

       <EnrollStudentDialog
  onSubmit={async (values) => {
    // TODO: call API enroll
    // await api.post("/students/enroll", values)
    console.log(values)
  }}
/>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
            <Card className="border border-[#313a68] bg-[#181d34]/20 backdrop-blur-sm text-white">
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[#909acb] text-sm font-medium">Total Students</p>
                  <span className="text-[#909acb]">groups</span>
                </div>
                <p className="text-3xl font-bold">452</p>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                  <span>trending_up</span>
                  <span>+12 this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-[#313a68] bg-[#181d34]/20 backdrop-blur-sm text-white">
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[#909acb] text-sm font-medium">Active Today</p>
                  <span className="text-[#909acb]">online_prediction</span>
                </div>
                <p className="text-3xl font-bold">128</p>
                <p className="text-[#909acb] text-xs font-medium">28% of total base</p>
              </CardContent>
            </Card>

            <Card className="border border-[#313a68] bg-[#181d34]/20 backdrop-blur-sm text-white">
              <CardContent className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[#909acb] text-sm font-medium">Avg. Completion</p>
                  <span className="text-[#909acb]">donut_large</span>
                </div>
                <p className="text-3xl font-bold">78%</p>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                  <span>arrow_upward</span>
                  <span>Top tier engagement</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="px-4 py-2">
            <Card className="rounded-lg border border-[#313a68] bg-[#181d34]/40 p-4">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row gap-4 items-end">
                  {/* Search */}
                  <div className="flex-1 w-full">
                    <label className="block text-[#909acb] text-xs font-bold mb-1 ml-1">
                      SEARCH
                    </label>
                    <div className="flex w-full items-stretch rounded-lg border border-[#313a68] bg-[#181d34] focus-within:ring-1 ring-[#313a68] overflow-hidden">
                      <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by Student Name or Email"
                        className="h-12 border-0 bg-transparent text-white placeholder:text-[#909acb]/70"
                      />
                      <div className="flex items-center justify-center px-4 text-[#909acb] border-l border-[#313a68]">
                        search
                      </div>
                    </div>
                  </div>

                  {/* Course */}
                  <div className="w-full lg:w-64">
                    <label className="block text-[#909acb] text-xs font-bold mb-1 ml-1">
                      COURSE
                    </label>
                    <Select value={course} onValueChange={(v) => setCourse(v as CourseKey)}>
                      <SelectTrigger className="h-12 bg-[#181d34] border-[#313a68] text-white">
                        <SelectValue placeholder="All Courses" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#181d34] border-[#313a68] text-white">
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="uiux">Advanced UI/UX Design</SelectItem>
                        <SelectItem value="python">Python for Data Science</SelectItem>
                        <SelectItem value="react">React Native Masterclass</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status */}
                  <div className="w-full lg:w-48">
                    <label className="block text-[#909acb] text-xs font-bold mb-1 ml-1">
                      STATUS
                    </label>
                    <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                      <SelectTrigger className="h-12 bg-[#181d34] border-[#313a68] text-white">
                        <SelectValue placeholder="Any Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#181d34] border-[#313a68] text-white">
                        <SelectItem value="any">Any Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="idle">Idle &gt; 7 days</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    className="h-12 px-6 text-[#909acb] hover:bg-[#313a68]/50 hover:text-white"
                    onClick={() => {
                      setQuery("")
                      setCourse("all")
                      setStatus("any")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <div className="px-4">
            <Card className="rounded-lg border border-[#313a68] bg-[#181d34]/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#181d34] border-b border-[#313a68]">
                        <TableHead className="p-4 text-xs font-bold text-[#909acb] uppercase tracking-wider min-w-[250px]">
                          Student
                        </TableHead>
                        <TableHead className="p-4 text-xs font-bold text-[#909acb] uppercase tracking-wider min-w-[200px]">
                          Current Course
                        </TableHead>
                        <TableHead className="p-4 text-xs font-bold text-[#909acb] uppercase tracking-wider min-w-[150px]">
                          Enrolled
                        </TableHead>
                        <TableHead className="p-4 text-xs font-bold text-[#909acb] uppercase tracking-wider min-w-[200px]">
                          Progress
                        </TableHead>
                        <TableHead className="p-4 text-xs font-bold text-[#909acb] uppercase tracking-wider text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-[#313a68]">
                      {filtered.map((s) => (
                        <TableRow
                          key={s.id}
                          className="hover:bg-[#313a68]/20 transition-colors"
                        >
                          <TableCell className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div
                                  className="size-10 rounded-full bg-cover bg-center border border-[#313a68]"
                                  style={{ backgroundImage: `url('${s.avatarUrl}')` }}
                                />
                                <div
                                  className={[
                                    "absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#181d34]",
                                    s.online ? "bg-emerald-500" : "bg-gray-500",
                                  ].join(" ")}
                                />
                              </div>

                              <div>
                                <p className="text-white text-sm font-bold">{s.name}</p>
                                <p className="text-[#909acb] text-xs">{s.email}</p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="p-4">
                            <div className="flex flex-col">
                              <span className="text-white text-sm font-medium">
                                {s.courseTitle}
                              </span>
                              <span className="text-[#909acb] text-xs">
                                {s.courseModule}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell className="p-4 text-sm text-[#909acb]">
                            {s.enrolledAt}
                          </TableCell>

                          <TableCell className="p-4">
                            <div className="flex flex-col gap-2 w-full max-w-[220px]">
                              <div className="flex justify-between text-xs">
                                <span className="text-white font-medium">
                                  {s.progressPct}%
                                </span>
                                <span
                                  className={
                                    s.lastActiveTone === "danger"
                                      ? "text-red-400"
                                      : "text-[#909acb]"
                                  }
                                >
                                  {s.lastActiveText}
                                </span>
                              </div>

                              {/* ✅ Progress: đổi màu track + indicator */}
                              <Progress
                                value={s.progressPct}
                                className={[
                                  "h-1.5 bg-[#313a68]",
                                  progressColorClass(s.progressTone),
                                ].join(" ")}
                              />
                            </div>
                          </TableCell>

                          <TableCell className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-[#909acb] hover:text-white hover:bg-[#313a68]"
                                title="Send Message"
                              >
                               <MdEmail className="size-4" />
                              </Button>
                              {/* <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-[#909acb] hover:text-white hover:bg-[#313a68]"
                                title="View Progress"
                              >
                                trending_up
                              </Button> */}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-[#909acb] hover:text-white hover:bg-[#313a68]"
                                title="More Options"
                              >
                                <HiOutlineDotsVertical />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="bg-[#181d34] border-t border-[#313a68] px-4 py-3 flex items-center justify-between">
                  <div className="text-[#909acb] text-sm hidden sm:block">
                    Showing <span className="text-white font-bold">1-5</span> of{" "}
                    <span className="text-white font-bold">452</span> students
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-9 border-[#313a68] text-[#909acb] hover:bg-[#313a68] hover:text-white"
                      disabled
                    >
                      <FaAngleLeft />
                    </Button>

                    <Button
                      type="button"
                      className="size-9 bg-primary text-white font-bold shadow-[0_0_10px_rgba(13,51,242,0.4)]"
                    >
                      1
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="size-9 border-[#313a68] text-[#909acb] hover:bg-[#313a68] hover:text-white"
                    >
                      2
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="size-9 border-[#313a68] text-[#909acb] hover:bg-[#313a68] hover:text-white hidden sm:inline-flex"
                    >
                      3
                    </Button>

                    <span className="text-[#909acb] text-sm px-1">...</span>

                    <Button
                      type="button"
                      variant="outline"
                      className="size-9 border-[#313a68] text-[#909acb] hover:bg-[#313a68] hover:text-white hidden sm:inline-flex"
                    >
                      12
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-9 border-[#313a68] text-[#909acb] hover:bg-[#313a68] hover:text-white"
                    >
                      <FaAngleRight />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="h-10" />
        </div>
      </div>
    </div>
  )
}
