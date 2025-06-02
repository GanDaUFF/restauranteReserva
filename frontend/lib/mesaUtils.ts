import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import type { Table } from "@/types/mesas"

export const getStatusInfo = (status: string) => {
  switch (status) {
    case "disponivel":
      return {
        label: "Disponível",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
        bgColor: "bg-green-50 hover:bg-green-100",
      }
    case "ocupada":
      return {
        label: "Ocupada",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: XCircle,
        bgColor: "bg-red-50 hover:bg-red-100",
      }
    case "reservada":
      return {
        label: "Reservada",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
        bgColor: "bg-yellow-50 hover:bg-yellow-100",
      }
    case "confirmacao_pendente":
      return {
        label: "Aguardando Confirmação",
        color: "bg-orange-100 text-orange-800 border-orange-200",
        icon: AlertTriangle,
        bgColor: "bg-orange-50 hover:bg-orange-100",
      }
    case "indisponivel":
      return {
        label: "Indisponível",
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: XCircle,
        bgColor: "bg-gray-50 hover:bg-gray-100",
      }
    default:
      return {
        label: "Desconhecido",
        color: "bg-muted text-muted-foreground border",
        icon: CheckCircle,
        bgColor: "bg-muted/50",
      }
  }
}

export const canOccupyTable = (table: Table): boolean => {
  if (table.status === "ocupada" || table.status === "indisponivel") return false

  if (table.status === "reservada" && table.reserva) {
    const now = new Date()
    const reservaTime = new Date(table.reserva.horario)
    const diffMinutes = (reservaTime.getTime() - now.getTime()) / (1000 * 60)
    return diffMinutes > 50
  }

  return table.status === "disponivel"
}

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
}
