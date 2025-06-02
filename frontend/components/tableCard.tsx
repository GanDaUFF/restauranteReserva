import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UtensilsCrossed, Users, Timer } from "lucide-react"
import { getStatusInfo, canOccupyTable, formatTime } from "@/lib/mesaUtils"
import TableActions from "./tableActions"
import type { ActionType, Table } from "@/types/mesas"


interface Props {
    table: Table
    canOccupy: boolean
    onAcao: (table: Table, actionType: ActionType) => void
  }

export default function TableCard({ table, onAcao }: Props) {
  const statusInfo = getStatusInfo(table.status)
  const StatusIcon = statusInfo.icon
  const canOccupy = canOccupyTable(table)

  return (
    <Card className={`${statusInfo.bgColor} border-2 transition-all duration-200`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5" />
            <CardTitle className="text-lg">Mesa {table.numero}</CardTitle>
          </div>
          <Badge className={`${statusInfo.color} border`}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>Capacidade: {table.capacidade} pessoas</span>
        </div>

        {table.status === "ocupada" && table.cliente && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Cliente: {table.cliente}</p>
            {table.horaOcupacao && (
              <p className="text-xs text-gray-500">Desde: {formatTime(table.horaOcupacao)}</p>
            )}
          </div>
        )}

        {(table.status === "reservada" || table.status === "confirmacao_pendente") && table.reserva && (
          <div className="space-y-1">
            <p className="text-sm font-medium">Reserva: {table.reserva.cliente}</p>
            <p className="text-xs text-gray-500">Horário: {formatTime(table.reserva.horario)}</p>
            <p className="text-xs text-gray-500">Pessoas: {table.reserva.pessoas}</p>
            <p className="text-xs text-gray-500">Tel: {table.reserva.telefone}</p>
          </div>
        )}

        {table.status === "confirmacao_pendente" && table.tempoRestante && (
          <div className="flex items-center gap-1 text-orange-600">
            <Timer className="h-4 w-4" />
            <span className="text-sm font-medium">{Math.max(table.tempoRestante, 0)} min restantes</span>
          </div>
        )}

        {!canOccupy && table.status === "reservada" && table.reserva && (
          <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
            ⚠️ Reservada para os próximos{" "}
            {Math.max(
              Math.ceil((table.reserva.horario.getTime() - Date.now()) / (1000 * 60)),
              0
            )}{" "}
            min
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          <TableActions table={table} onAcao={onAcao} />
        </div>
      </CardContent>
    </Card>
  )
}
