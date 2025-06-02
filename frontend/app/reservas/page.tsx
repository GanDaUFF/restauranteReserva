"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ReservationsTable } from "@/components/reservations-table"
import CardsHome from "@/components/cardsHome"
import { navMain } from "@/lib/sideBarMenu"
import HeaderTopBar from "@/components/headerTopBar"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar navMain={navMain} />
      <SidebarInset>
      <HeaderTopBar />
        <div className="flex flex-1 flex-col gap-4 p-4">
        <CardsHome />
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
            <ReservationsTable />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
