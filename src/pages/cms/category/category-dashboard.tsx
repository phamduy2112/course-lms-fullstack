export default function CategoryDashboard() {
  return (
    <main className="flex-1 flex flex-col min-w-0 p-8 relative pb-24">
      <Breadcrumb />
      <div className="glass-card rounded-2xl overflow-hidden flex flex-col p-8 gap-8">
        <Header />
        <Stats />
        <SubCategories />
        <CategoryCoursesTable />
      </div>

      {/* <BottomActions /> */}
    </main>
  );
}

function Breadcrumb() {
  return (
    <div className="flex items-center gap-2 text-[#909acb] text-sm mb-4">
      <span>Media &amp; Categories</span>
      <span className="material-symbols-outlined text-xs">chevron_right</span>
      <span className="text-primary font-medium">Programming</span>
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center gap-6">
      <div className="size-20 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 accent-glow">
        <span className="material-symbols-outlined text-primary text-4xl">terminal</span>
      </div>
      <div>
        <h1 className="text-white text-4xl font-black tracking-tight">Programming</h1>
        <p className="text-[#909acb] mt-1 text-lg">
          Main branch for all software engineering curricula
        </p>
      </div>
    </div>
  );
}

function Stats() {
  const cards = [
    { label: "Active Courses", value: "12", icon: "school", color: "text-primary", border: "border-primary" },
    { label: "Total Enrollments", value: "2,840", icon: "group", color: "text-accent-purple", border: "border-accent-purple" },
    { label: "Sub-categories", value: "3", icon: "account_tree", color: "text-blue-400", border: "border-blue-400" },
    { label: "Category Revenue", value: "$45,210", icon: "payments", color: "text-emerald-400", border: "border-emerald-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className={`glass-card rounded-xl p-5 border-l-2 ${c.border}`}>
          <p className="text-[#909acb] text-xs font-bold uppercase tracking-wider mb-2">{c.label}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">{c.value}</span>
            <span className={`material-symbols-outlined ${c.color}`}>{c.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SubCategories() {
  const items = [
    { name: "Python", courses: 8, icon: "code", color: "text-accent-purple", border: "border-accent-purple", bg: "bg-accent-purple/20" },
    { name: "JavaScript", courses: 15, icon: "javascript", color: "text-yellow-500", border: "border-yellow-500", bg: "bg-yellow-500/20" },
    { name: "C++ Engineering", courses: 6, icon: "terminal", color: "text-blue-600", border: "border-blue-600", bg: "bg-blue-600/20" },
    { name: "Go Lang", courses: 4, icon: "terminal", color: "text-emerald-500", border: "border-emerald-500", bg: "bg-emerald-500/20" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-white font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">folder_open</span>
          Sub-categories
        </h3>
        <button className="text-xs text-[#909acb] hover:text-white transition-colors">View All</button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((i) => (
          <div
            key={i.name}
            className={`glass-card rounded-xl p-4 min-w-[240px] border-l-4 ${i.border} hover:bg-white/5 transition-colors cursor-pointer group`}
          >
            <div className="flex items-center gap-4">
              <div className={`size-10 rounded-lg ${i.bg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${i.color}`}>{i.icon}</span>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{i.name}</h4>
                <p className="text-[#909acb] text-xs">{i.courses} Courses</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryCoursesTable() {
  const rows = [
    { title: "Advanced Python for Data Science", instructor: "Dr. Alex Rivers", students: "1,240", status: "Live", badge: "emerald" },
    { title: "Full-Stack React Mastery", instructor: "Sarah Jenkins", students: "840", status: "Live", badge: "emerald" },
    { title: "Memory Management in C++", instructor: "Marcus Chen", students: "0", status: "Draft", badge: "slate" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-white font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
          Category Courses
        </h3>
        <button className="flex items-center text-xs text-primary font-bold">
          <span className="material-symbols-outlined text-sm mr-1">filter_list</span> Filter
        </button>
      </div>

      <div className="glass-card rounded-xl overflow-hidden border-none">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#222949]/50 border-b border-[#313a68]">
              <th className="px-6 py-4 text-[#909acb] text-xs font-bold uppercase tracking-wider">Course Title</th>
              <th className="px-6 py-4 text-[#909acb] text-xs font-bold uppercase tracking-wider">Instructor</th>
              <th className="px-6 py-4 text-[#909acb] text-xs font-bold uppercase tracking-wider">Total Students</th>
              <th className="px-6 py-4 text-[#909acb] text-xs font-bold uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[#909acb] text-xs font-bold uppercase tracking-wider"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#222949]">
            {rows.map((r) => (
              <tr key={r.title} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-white font-medium">{r.title}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-300 text-sm">{r.instructor}</span>
                </td>
                <td className="px-6 py-4 text-slate-300 text-sm">{r.students}</td>
                <td className="px-6 py-4">
                  {r.badge === "emerald" ? (
                    <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase border border-emerald-500/20">
                      {r.status}
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-slate-500/10 text-slate-400 text-[10px] font-bold uppercase border border-slate-500/20">
                      {r.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="opacity-0 group-hover:opacity-100 text-[#909acb] hover:text-white transition-opacity">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// function BottomActions() {
//   return (
//     <div className="fixed bottom-0 left-0 lg:left-72 right-0 bg-background-dark/95 backdrop-blur-md border-t border-[#222949] p-4 z-40">
//       <div className="max-w-7xl mx-auto flex items-center justify-end gap-4 px-4">
//         <button className="flex items-center justify-center rounded-lg h-11 px-6 border border-primary/40 text-primary text-sm font-bold transition-all hover:bg-primary/10">
//           <span className="material-symbols-outlined mr-2">edit</span> Edit Category
//         </button>
//         <button className="flex items-center justify-center rounded-lg h-11 px-6 text-red-500/70 hover:text-red-500 hover:bg-red-500/5 text-sm font-bold transition-all">
//           <span className="material-symbols-outlined mr-2">delete</span> Delete
//         </button>
//       </div>
//     </div>
//   );
// }
