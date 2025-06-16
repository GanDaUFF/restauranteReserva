"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { navMain } from "@/lib/sideBarMenu"
import HeaderTopBar from "@/components/headerTopBar"
import { RelatoriosContent } from "@/components/relatorios-content"

export default function RelatoriosPage() {
  return (
    <SidebarProvider>
      <AppSidebar navMain={navMain} />
      <SidebarInset>
        <HeaderTopBar />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
            <RelatoriosContent />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
