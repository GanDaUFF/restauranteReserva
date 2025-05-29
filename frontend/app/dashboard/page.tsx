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

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Reservas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 p-4 flex flex-col justify-center">
              <h3 className="font-semibold text-orange-800">Total de Reservas</h3>
              <p className="text-2xl font-bold text-orange-900">24</p>
            </div>
            <div className="aspect-video rounded-xl bg-gradient-to-br from-green-100 to-green-200 p-4 flex flex-col justify-center">
              <h3 className="font-semibold text-green-800">Confirmadas</h3>
              <p className="text-2xl font-bold text-green-900">18</p>
            </div>
            <div className="aspect-video rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 flex flex-col justify-center">
              <h3 className="font-semibold text-yellow-800">Pendentes</h3>
              <p className="text-2xl font-bold text-yellow-900">4</p>
            </div>
            <div className="aspect-video rounded-xl bg-gradient-to-br from-red-100 to-red-200 p-4 flex flex-col justify-center">
              <h3 className="font-semibold text-red-800">Canceladas</h3>
              <p className="text-2xl font-bold text-red-900">2</p>
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
            <ReservationsTable />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
