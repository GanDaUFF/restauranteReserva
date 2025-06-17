"use client"

import type * as React from "react"
import { Calendar, ChevronUp, Home, Settings, UtensilsCrossed, Users, User2, Clock, BarChart3 } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Menu items do sistema
const data = {
  navMain: [
    
    {
      title: "Reservas",
      url: "/reservas",
      icon: Calendar,
      isActive: true,
    },
    {
      title: "Mesas",
      url: "/mesas",
      icon: UtensilsCrossed,
    },
  
    
    {
      title: "Relatórios",
      url: "#",
      icon: BarChart3,
    },
   
  ],
}


export interface NavItem {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navMain: NavItem[]
}


export function AppSidebar({ navMain, ...props }: AppSidebarProps) {
  const pathname = usePathname()
const router = useRouter()

  const nomeCliente = typeof window !== "undefined" ? localStorage.getItem("clienteNome") : null
  const emailCliente = typeof window !== "undefined" ? localStorage.getItem("clienteEmail") : null
  const tipoCliente = typeof window !== "undefined" ? localStorage.getItem("clienteTipo") : null
const itensFiltrados = navMain.filter((item) => {
  if (tipoCliente === "GERENTE") return true
  if (tipoCliente === "GARCOM") return ["/reservas", "/mesas"].includes(item.url)
  if (tipoCliente === "ATENDENTE") return ["/reservas"].includes(item.url)
  return false // caso tipo seja desconhecido, não mostra nada
})

  const handleLogout = () => {
    localStorage.clear()
    router.push("/login")
  }
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <UtensilsCrossed className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Restaurante</span>
                  <span className="truncate text-xs">Sistema de Reservas</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itensFiltrados.map((item) => {
                const isActive = pathname === item.url

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <User2 className="size-4" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{nomeCliente || "Usuário"}</span>
                    <span className="truncate text-xs">{emailCliente || "sem-email@exemplo.com"}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
