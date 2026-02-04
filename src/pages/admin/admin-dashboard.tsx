import * as React from "react"
// import { DateRangeDialog } from "./DateRangeDialog"
// import { ExportReportDialog } from "./ExportReportDialog"

type MetricCard = {
  title: string
  icon: React.ReactNode
  value: string
  delta?: { text: string; positive?: boolean }
  footer?: React.ReactNode
}

type PendingRow = {
  submission: string
  type: "Course" | "Instructor"
  date: string
  status: "Pending"
  icon: string // material icon name
}

type TransactionRow = {
  name: string
  course: string
  price: string
  status: "COMPLETED"
  avatarUrl: string
}

export default function AdminDashboard() {
  const [rangeLabel, setRangeLabel] = React.useState("Last 30 Days")

  const metricCards: MetricCard[] = [
    {
      title: "Total Revenue",
      icon: <span className="material-symbols-outlined text-primary">payments</span>,
      value: "$128,430",
      delta: { text: "+12.5%", positive: true },
      footer: (
        <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-3/4" />
        </div>
      ),
    },
    {
      title: "Active Students",
      icon: <span className="material-symbols-outlined text-primary">group</span>,
      value: "45,200",
      delta: { text: "+5.2%", positive: true },
      footer: (
        <div className="mt-4 flex gap-1 items-end h-6">
          <div className="w-full bg-primary/40 rounded-t-sm" style={{ height: "40%" }} />
          <div className="w-full bg-primary/40 rounded-t-sm" style={{ height: "60%" }} />
          <div className="w-full bg-primary/40 rounded-t-sm" style={{ height: "30%" }} />
          <div className="w-full bg-primary rounded-t-sm" style={{ height: "90%" }} />
        </div>
      ),
    },
    {
      title: "Pending Courses",
      icon: <span className="material-symbols-outlined text-[#facc15]">pending_actions</span>,
      value: "12",
      delta: { text: "Require review", positive: false },
      footer: <p className="text-xs text-[#909acb] mt-4 italic">3 submitted today</p>,
    },
    {
      title: "Instructor Apps",
      icon: <span className="material-symbols-outlined text-primary">person_add</span>,
      value: "8",
      delta: { text: "+2", positive: true },
      footer: (
        <div className="flex -space-x-2 mt-4 overflow-hidden">
          <img
            className="inline-block h-6 w-6 rounded-full ring-2 ring-background-dark"
            alt="User avatar 1"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRZtAsw3XeVOxIzHfKsMrbdMavT4dM0snfdDD4Yf03uRP6cY8wmz5D4IDsDtnJJxBQX6M-KA_Vdf_6TD4pvuqeQY4plnSH9tOoFjSlQJWry8n2HB8-Xy-w0GN7wtbAm0HeKxP3p15M8ay9dWCIzn552eTi2z1iRKqQl3jsiDBHiW2fvArZcPXuxktXDGrGu529hZBFLrtaE6u5YPi1e5eIRuYDxoa1Bz3owkNtg1naggs3t5ljeAu_UJTQoA2lL634-Ym-mp-5fGM"
          />
          <img
            className="inline-block h-6 w-6 rounded-full ring-2 ring-background-dark"
            alt="User avatar 2"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbVtbcq9mgJ4_wTaDhYZfkecdek1wZ-qoM7bGQGIMMetNiNdurXao7iwuvU3-LNrsfUjP1OWBSrQR2TCOUjOMsJzqD96_S8RzJE5_6RXt275D-bmQ_maPwrZPv_8bymRG7Hm6hZ8q0cN2kYr3ffS-_DWGmVqXCL-AfenyaVpOhjvkyzS0Bzv6d6OjIJtptmKhnokY4ZKilLEgB2e-cS6j_j8waqk7qzsBwXhW3xu9Qx90tWsxtXeWGYcSg3K2QG3RanoCY5wzoDuQ"
          />
          <img
            className="inline-block h-6 w-6 rounded-full ring-2 ring-background-dark"
            alt="User avatar 3"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBWaLxzvQ0uRtxCyv9JbW35VgD4YoWhDJIsVa-Vhco4IrdSgrprnjt-LNk-vmSb1vlv2b2kti_dOu8NWOek0AwZqe9Rsu6ycdPUNYFtuwVGpi-9bfdrP4It-ZpickyAdFKktX6mCiX3w9Bk7qmC6XPM_3FuU6i5URns_HeLSQfFHx5-2dTTyMW6Ilq1yWDAJQlLYW20w3J-FYyIY70JxDcZouMWwJuy9Pgmo3ZyvFmU5TcXeWH-JwyH7mQrywb7Jb1MuEV6PujYTE"
          />
          <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#222949] ring-2 ring-background-dark text-[10px] font-bold">
            +5
          </div>
        </div>
      ),
    },
  ]

  const pending: PendingRow[] = [
    { submission: "Advanced NLP with Transformers", type: "Course", date: "Oct 24, 2023", status: "Pending", icon: "menu_book" },
    { submission: "Sarah Jenkins, PhD", type: "Instructor", date: "Oct 23, 2023", status: "Pending", icon: "person" },
    { submission: "Rust Performance Workshop", type: "Course", date: "Oct 22, 2023", status: "Pending", icon: "menu_book" },
  ]

  const transactions: TransactionRow[] = [
    {
      name: "Alex Rivers",
      course: "Quantum Computing Fundamentals",
      price: "$199.00",
      status: "COMPLETED",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDAL64wvSn2zGQrQRUvW0NjHv-qNxLxho87HRrKhXUX6epJR4FRzKf9eU0oLWxMHeGAxoWd0bFsrZUtN1WyPTj_OL6mXdg58_Ui5CkykK8mICHJJ8Ah1B9rMXxpOjLdiB3RwJSMLVCH-ttpuyeM2PnuIwWLqFwbcNNUGKD-Hxkpre-efNBBS-v1R2xCivLtllnsQ0N1ju2T4OpWL9eQY0ZDQS2PV6rv8tw66H9X4vduI7meoCoLnjBTx6VPjiX8DL4-B7pPKv2cVGo",
    },
    {
      name: "Michael Chen",
      course: "Fullstack Mastery with Next.js",
      price: "$249.00",
      status: "COMPLETED",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBGl4g-X0WDX97G2b8tp2uoxoCcr9C7bV9VV7_sbHqDvD3OeT0GCZiUEDU9O5z110XGE_usoZACFO6i-_jIdln10-3GOJkSrx70LKtOAI_qfjLobmg3ulN-C3gwH1F55fV-39JeKg0g6SigGxlBvaPcmNMdALNtKcjI5Sl3RtVc1B_pDVumzErQIFJOVt0da_mbXjzKk3M1OGh6lHX6DtFcz7vEgeE5JiSI7Qia1LTzoM88ghlI8RfWey8cYurf0yGhY4U3W19Z0cw",
    },
    {
      name: "Elena Rodriguez",
      course: "Ethical Hacking & Cybersecurity",
      price: "$149.00",
      status: "COMPLETED",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAdFvTOAXzgNttwz02V6vpK8cpPRN-tXbVCPmboYoUWHy1XL-1XUXMqOFfW4FkWP9jUuceoyogOwqGdtqOFsgz7LlZNV3ubArQk0vXjkLKah-dA91RRctVNRErB0Bnz6OtsitjyBqvhUVqRBC3NtG6_JxG7D--WLmkXmAf3UCNGujPWIMSpaBzWG0FY3pXZLCli0deuC_umlWsnSJNFTWUZO4ycJh6ZbQa9uH3e_hDDI2PDjSK02mP8NpQX4uOFVZozFwxDQ7fBTyI",
    },
  ]

  return (
    <main className="max-w-[1440px] mx-auto px-6 py-10">
      {/* Heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black leading-tight tracking-[-0.033em]">Admin Insights</h1>
          <p className="text-[#909acb] mt-1">Global platform overview and performance tracking.</p>
        </div>

        <div className="flex gap-3">
          {/* <DateRangeDialog
            label={rangeLabel}
            onApply={(label) => setRangeLabel(label)}
          />

          <ExportReportDialog
            onSubmit={async (values) => {
              // TODO: call API export
              console.log("Export payload:", values)
            }}
          /> */}
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metricCards.map((m) => (
          <div key={m.title} className="glass-card rounded-xl p-6 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="text-[#909acb] text-sm font-medium uppercase tracking-wider">{m.title}</p>
              {m.icon}
            </div>

            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold leading-tight">{m.value}</p>
              {m.delta ? (
                <p
                  className={[
                    "text-xs font-bold",
                    m.delta.positive ? "text-[#0bda65]" : "text-[#909acb] font-medium",
                  ].join(" ")}
                >
                  {m.delta.text}
                </p>
              ) : null}
            </div>

            {m.footer}
          </div>
        ))}
      </div>

      {/* Main analytics grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Growth */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-white text-lg font-bold">Revenue Growth</p>
              <p className="text-[#909acb] text-sm">Monthly performance trajectory</p>
            </div>
            <div className="flex gap-2">
              <button className="size-8 rounded flex items-center justify-center bg-white/5 text-xs font-bold">W</button>
              <button className="size-8 rounded flex items-center justify-center bg-primary text-xs font-bold">M</button>
              <button className="size-8 rounded flex items-center justify-center bg-white/5 text-xs font-bold">Y</button>
            </div>
          </div>

          <div className="flex-1 min-h-[250px] relative">
            {/* keep SVG exactly */}
            <svg fill="none" height="250" preserveAspectRatio="none" viewBox="-3 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                fill="url(#paint0_linear_1)"
              />
              <path
                d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                stroke="#0d33f2"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1" x1="236" x2="236" y1="1" y2="149">
                  <stop stopColor="#0d33f2" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#0d33f2" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <div className="flex justify-between mt-4 px-2">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
                <p key={m} className="text-[#909acb] text-[11px] font-bold uppercase tracking-widest">
                  {m}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* User Engagement */}
        <div className="glass-card rounded-xl p-6 flex flex-col">
          <div className="mb-6">
            <p className="text-white text-lg font-bold">User Engagement</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold">12.5k</p>
              <p className="text-[#0bda65] text-sm font-medium">Daily Active</p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-7 items-end gap-3 h-full pt-4">
            {[
              { day: "M", h: 40, active: false },
              { day: "T", h: 55, active: false },
              { day: "W", h: 35, active: false },
              { day: "T", h: 90, active: true },
              { day: "F", h: 65, active: false },
              { day: "S", h: 45, active: false },
              { day: "S", h: 30, active: false },
            ].map((d, idx) => (
              <div key={`${d.day}-${idx}`} className="flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className={[
                    "w-full rounded-t",
                    d.active ? "bg-primary" : "bg-[#222949] border-t border-primary/40",
                  ].join(" ")}
                  style={{ height: `${d.h}%` }}
                />
                <p className="text-[#909acb] text-[10px] font-bold">{d.day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distribution + Pending */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Course Distribution */}
        <div className="lg:col-span-4 glass-card rounded-xl p-6">
          <div className="mb-6">
            <p className="text-white text-lg font-bold">Course Distribution</p>
            <p className="text-[#909acb] text-sm">Top learning categories</p>
          </div>

          <div className="space-y-6">
            {[
              { label: "Artificial Intelligence", pct: 42, bar: "bg-primary" },
              { label: "Backend Engineering", pct: 28, bar: "bg-primary/70" },
              { label: "Cloud Architecture", pct: 15, bar: "bg-primary/50" },
              { label: "DevOps & SRE", pct: 10, bar: "bg-primary/30" },
            ].map((x) => (
              <div key={x.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{x.label}</span>
                  <span className="text-[#909acb]">{x.pct}%</span>
                </div>
                <div className="h-2 w-full bg-[#222949] rounded-full">
                  <div className={["h-full rounded-full", x.bar].join(" ")} style={{ width: `${x.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="lg:col-span-8 glass-card rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <div>
              <p className="text-white text-lg font-bold">Pending Approvals</p>
              <p className="text-[#909acb] text-sm">Course and Instructor verification queue</p>
            </div>
            <button className="text-primary text-sm font-bold hover:underline">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[#909acb] text-[11px] uppercase tracking-widest">
                  <th className="px-6 py-4 font-bold">Submission</th>
                  <th className="px-6 py-4 font-bold">Type</th>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pending.map((row) => (
                  <tr key={row.submission} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-primary/20 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-sm">{row.icon}</span>
                        </div>
                        <span className="font-medium text-sm">{row.submission}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#909acb]">{row.type}</td>
                    <td className="px-6 py-4 text-sm">{row.date}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-[#facc15]/10 text-[#facc15] text-[10px] font-bold uppercase">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="px-3 py-1 bg-primary rounded text-xs font-bold hover:bg-primary/80 transition-all">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transactions + Quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6">
          <div className="mb-6">
            <p className="text-white text-lg font-bold">Recent Transactions</p>
            <p className="text-[#909acb] text-sm">Latest course enrollments</p>
          </div>

          <div className="space-y-4">
            {transactions.map((t, idx) => (
              <div
                key={t.name}
                className={[
                  "flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-all group",
                  idx !== 0 ? "border-t border-white/5" : "",
                ].join(" ")}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="size-10 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${t.avatarUrl}")` }}
                    aria-label={`${t.name} avatar`}
                  />
                  <div>
                    <p className="text-sm font-bold">{t.name}</p>
                    <p className="text-xs text-[#909acb]">{t.course}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold">{t.price}</p>
                  <p className="text-[10px] text-[#0bda65] font-bold">{t.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-4">
          <div className="glass-card rounded-xl p-6 h-full flex flex-col">
            <div className="mb-6">
              <p className="text-white text-lg font-bold">Quick Actions</p>
              <p className="text-[#909acb] text-sm">System management shortcuts</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button className="flex items-center gap-3 p-4 rounded-lg bg-primary hover:bg-primary/80 transition-all text-sm font-bold shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined">campaign</span>
                Broadcast Announcement
              </button>
              <button className="flex items-center gap-3 p-4 rounded-lg bg-[#222949] hover:bg-[#222949]/70 transition-all text-sm font-bold border border-white/5">
                <span className="material-symbols-outlined">analytics</span>
                Generate Monthly Report
              </button>
              <button className="flex items-center gap-3 p-4 rounded-lg bg-[#222949] hover:bg-[#222949]/70 transition-all text-sm font-bold border border-white/5">
                <span className="material-symbols-outlined">settings</span>
                Platform Settings
              </button>
              <button className="flex items-center gap-3 p-4 rounded-lg bg-[#222949] hover:bg-[#222949]/70 transition-all text-sm font-bold border border-white/5">
                <span className="material-symbols-outlined">support_agent</span>
                Admin Support Tickets
              </button>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5">
              <div className="flex items-center justify-between text-xs text-[#909acb]">
                <span>System Status:</span>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#0bda65] animate-pulse" />
                  <span className="font-bold text-white uppercase tracking-wider">Optimal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
