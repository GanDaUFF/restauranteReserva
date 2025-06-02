import { Button } from "@/components/ui/button"
import { CheckCircle, User } from "lucide-react"
import { ActionType, Table } from "@/types/mesas"

interface Props {
    table: Table
    onAcao: (table: Table, actionType: ActionType) => void
  }
  

export default function TableActions({ table, onAcao }: Props) {
  const btn = (tipo: string, label: string, variant = "", icon?: React.ReactNode) => (
    <Button
      key={tipo}
      size="sm"
      variant={variant === "outline" ? "outline" : undefined}
      className={variant === "filled" ? "bg-blue-600 hover:bg-blue-700" : ""}
      onClick={() => onAcao(table, "ocupar")}

    >
      {icon} {label}
    </Button>
  )

  switch (table.status) {
    case "disponivel":
      return (
        <>
          {btn("ocupar", "Ocupar", "filled", <User className="h-4 w-4 mr-1" />)}
          {btn("indisponibilizar", "Indisponibilizar", "outline")}
        </>
      )
    case "ocupada":
      return btn("liberar", "Liberar", "outline", <CheckCircle className="h-4 w-4 mr-1" />)
    case "reservada":
      return btn("cancelar_reserva", "Cancelar Reserva", "outline")
    case "confirmacao_pendente":
      return (
        <>
          {btn("confirmar_reserva", "Confirmar", "filled", <CheckCircle className="h-4 w-4 mr-1" />)}
          {btn("cancelar_reserva", "Cancelar", "outline")}
        </>
      )
    case "indisponivel":
      return btn("liberar", "Disponibilizar", "outline")
    default:
      return null
  }
}
