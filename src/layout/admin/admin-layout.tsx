import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { AppSidebar } from "./components/navbar"

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="relative flex min-h-screen flex-1 flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
        {/* Topbar */}
        <div className="sticky top-0 z-20 rounded-2xl border border-white/10 bg-white/5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3">
            <SidebarTrigger/>
            <div className="h-5 w-px bg-white/10" />

            <h1 className="text-sm font-semibold tracking-wide">
              Tiêu đề trang
            </h1>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden sm:block text-xs text-slate-400">
                Welcome back
              </div>
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/10">
                Action
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="mx-auto w-full">
            <div >
              <div className="p-4 sm:p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}
