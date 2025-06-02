import {
    Calendar, Clock, Home, Settings, Users, UtensilsCrossed, BarChart3
  } from "lucide-react"
  
  export const navMain = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Reservas", url: "/reservas", icon: Calendar },
    { title: "Mesas", url: "/mesas", icon: UtensilsCrossed },
    { title: "Clientes", url: "/clientes", icon: Users },
    { title: "Horários", url: "/horarios", icon: Clock },
    { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
    { title: "Configurações", url: "/configuracoes", icon: Settings },
  ]
  