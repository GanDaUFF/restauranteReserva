"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Table, ActionType } from "@/types/mesas"

// --- Tipagens locais ---
type TableStatus = "disponivel" | "ocupada" | "reservada" | "confirmacao_pendente" | "indisponivel"


export interface TableAction {
  type: "ocupada" | "liberar" | "confirmar_reserva" | "cancelar_reserva" | "indisponibilizar"
  tableId: string
  cliente?: string
}

// --- Props do componente ---
import { Dispatch, SetStateAction } from "react"

export interface TableDialogProps {
  open: boolean
  table: Table | null
  actionType: ActionType | null
  clienteName?: string
  setClienteName?: Dispatch<SetStateAction<string>>
  onConfirm: (tableId: string, actionType: ActionType, cliente?: string) => void
  onClose: () => void
}


// --- Função auxiliar para formatação de horário ---
const formatTime = (date?: Date) => {
  if (!date) return "—"
  return new Date(date).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// --- Componente principal ---
export default function TableDialog({ open, table, actionType, onClose, onConfirm }: TableDialogProps) {
  const [cliente, setCliente] = useState("")
  const reservaAtiva = Array.isArray(table?.reservas)
  ? table.reservas.find(r => r.status === "ATIVA")
  : null

  useEffect(() => {
    if (
      actionType === "ocupada" &&
      table?.status === "reservada" &&
      Array.isArray(table.reservas)
    ) {
      const reservaAtiva = table.reservas.find(r => r.status === "ATIVA")
      setCliente(reservaAtiva?.nomeResponsavel ?? "")
    } else {
      setCliente("")
    }
  }, [actionType, table])
  
  
  if (!table || !actionType) return null

 
  const isOcupar = actionType === "ocupada"
  const isLiberar = actionType === "disponivel" && (table.status === "ocupada" || table.status === "reservada")
  const isConfirmarReserva = actionType === "ocupada" && table.status === "confirmacao_pendente"
  const isCancelarReserva = actionType === "disponivel" && table.status === "reservada"
  const isIndisponibilizar = actionType === "indisponivel"

  const handleConfirm = () => {
    onConfirm(table.id, actionType, cliente)
    setCliente("")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
        <DialogTitle>
  {isOcupar && table.status === "reservada" && "Confirmar reservas"}
  {isOcupar && table.status !== "reservada" && "Ocupar Mesa"}
  {isLiberar && table.status === "reservada" && "Cancelar reservas"}
  {isLiberar && table.status === "ocupada" && "Liberar Mesa"}
  {isIndisponibilizar && "Indisponibilizar Mesa"}
</DialogTitle>

          <DialogDescription>
            Mesa {table.numeroMesa} — Capacidade: {table.capacidade} pessoas
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
        {isOcupar && (
  <div className="space-y-2">
    <Label htmlFor="cliente">Nome do Cliente</Label>
    <Input
      id="cliente"
      placeholder="Digite o nome do cliente"
      value={cliente}
      onChange={(e) => setCliente(e.target.value)}
    />
  </div>
)}





          {isLiberar && table.cliente && (
            <p>Confirma a liberação da mesa ocupada por <strong>{table.cliente}</strong>?</p>
          )}

          {isConfirmarReserva && table.reservas && (
            <div className="space-y-2 text-sm">
              <p>Confirmar chegada do cliente <strong>{table.reservas.cliente}</strong>?</p>
              <p className="text-muted-foreground">Horário: {formatTime(table.reservas.dataHora)}</p>
              <p className="text-muted-foreground">Pessoas: {table.reservas.pessoas}</p>
            </div>
          )}
{isOcupar && table.status === "reservada" && reservaAtiva && (
  <div className="space-y-2 text-sm">
    <p>Confirmar chegada do cliente <strong>{reservaAtiva.nomeResponsavel}</strong>?</p>
    <p className="text-muted-foreground">Horário: {formatTime(reservaAtiva.dataHora)}</p>
    <p className="text-muted-foreground">Pessoas: {reservaAtiva.quantidade}</p>
  </div>
)}


{isLiberar && table.status === "reservada" && table.reservas && (
  <p>Tem certeza que deseja cancelar a reservas de <strong>{table.reservas.cliente}</strong>?</p>
)}

          {isCancelarReserva && table.reservas && (
            <p>Tem certeza que deseja cancelar a reservas de <strong>{table.reservas.cliente}</strong>?</p>
          )}

          {isIndisponibilizar && (
            <p>A mesa ficará indisponível para ocupação. Confirma?</p>
          )}
        </div>

        <DialogFooter className="gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button
            onClick={handleConfirm}
            disabled={isOcupar && cliente.trim() === ""}
            className={cn(
              isConfirmarReserva && "bg-green-600 hover:bg-green-700",
              isCancelarReserva && "bg-red-600 hover:bg-red-700",
              !isConfirmarReserva && !isCancelarReserva && "bg-blue-600 hover:bg-blue-700"
            )}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
