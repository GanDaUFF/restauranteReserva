// app/mesas/page.tsx
"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import HeaderTopBar from "@/components/headerTopBar"
import { navMain } from "@/lib/sideBarMenu"
import TablesManagement from "@/components/TablesManagement"

export default function TablesPage() {
  return (
    <SidebarProvider>
      <AppSidebar navMain={navMain} />
      <SidebarInset>
        <HeaderTopBar />
        <div className="p-4">
          <TablesManagement />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
