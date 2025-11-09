// import { AppSidebar } from "@/components/ui/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { AppSidebar } from "./components/navbar"

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="flex flex-col flex-1">
        {/* Thanh trên cùng */}
        <div className="border-b p-2 flex items-center">
          <SidebarTrigger />
          <h1 className="ml-2 font-semibold">Tiêu đề trang</h1>
        </div>

        {/* Nội dung chính */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}
