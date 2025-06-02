"use client"

import { useState, useEffect } from "react"
import TableCard from "@/components/tableCard"
import TableStats from "@/components/tableStats"
import TableDialog from "@/components/tableActionDialog"
import { ActionType } from "@/types/mesas"
// Tipagens locais
type TableStatus = "disponivel" | "ocupada" | "reservada" | "confirmacao_pendente" | "indisponivel"

interface Table {
  id: string
  numero: number
  capacidade: number
  status: TableStatus
  cliente?: string
  horaOcupacao?: Date
  reserva?: {
    cliente: string
    horario: Date
    telefone: string
    pessoas: number
  }
  tempoRestante?: number
}


const initialTables: Table[] = [
  { id: "1", numero: 1, capacidade: 2, status: "disponivel" },
  {
    id: "2", numero: 2, capacidade: 4, status: "ocupada",
    cliente: "Maria Santos", horaOcupacao: new Date(Date.now() - 30 * 60000)
  },
  {
    id: "3", numero: 3, capacidade: 6, status: "reservada",
    reserva: {
      cliente: "João Silva",
      horario: new Date(Date.now() + 30 * 60000),
      telefone: "(11) 99999-9999",
      pessoas: 4
    }
  },
  {
    id: "4", numero: 4, capacidade: 4, status: "confirmacao_pendente",
    reserva: {
      cliente: "Pedro Oliveira",
      horario: new Date(Date.now() - 5 * 60000),
      telefone: "(11) 77777-7777",
      pessoas: 4
    },
    tempoRestante: 10
  },
  { id: "5", numero: 5, capacidade: 8, status: "disponivel" },
  { id: "6", numero: 6, capacidade: 2, status: "indisponivel" },
  {
    id: "7", numero: 7, capacidade: 4, status: "reservada",
    reserva: {
      cliente: "Ana Costa",
      horario: new Date(Date.now() + 45 * 60000),
      telefone: "(11) 66666-6666",
      pessoas: 3
    }
  },
  {
    id: "8", numero: 8, capacidade: 6, status: "ocupada",
    cliente: "Carlos Ferreira", horaOcupacao: new Date(Date.now() - 60 * 60000)
  }
]

export default function TablesManagement() {
  const [tables, setTables] = useState<Table[]>(initialTables)
  const [dialogData, setDialogData] = useState<{
    open: boolean
    table: Table | null
    actionType: ActionType | null
  }>({
    open: false,
    table: null,
    actionType: null
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTables(prev =>
        prev.map(table => {
          if (table.status === "confirmacao_pendente" && table.tempoRestante) {
            const nova = table.tempoRestante - 1
            if (nova <= 0) {
              return {
                ...table,
                status: "disponivel",
                reserva: undefined,
                tempoRestante: undefined
              }
            }
            return { ...table, tempoRestante: nova }
          }

          if (table.status === "reservada" && table.reserva) {
            const now = new Date()
            const diff = (table.reserva.horario.getTime() - now.getTime()) / 60000
            if (diff <= 0) {
              return {
                ...table,
                status: "confirmacao_pendente",
                tempoRestante: 15
              }
            }
          }

          return table
        })
      )
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const canOccupyTable = (table: Table): boolean => {
    if (table.status === "ocupada" || table.status === "indisponivel") return false
    if (table.status === "reservada" && table.reserva) {
      const now = new Date()
      const reservaTime = table.reserva.horario
      const diffMinutes = (reservaTime.getTime() - now.getTime()) / (1000 * 60)
      return diffMinutes > 50
    }
    return table.status === "disponivel"
  }

  const handleAction = (table: Table, actionType: ActionType) => {
    setDialogData({ open: true, table, actionType })
  }

  const handleConfirmAction = (tableId: string, actionType: ActionType, cliente?: string) => {
    setTables(prev =>
      prev.map(table => {
        if (table.id !== tableId) return table

        switch (actionType) {
          case "ocupar":
            return {
              ...table,
              status: "ocupada",
              cliente,
              horaOcupacao: new Date(),
              reserva: undefined,
              tempoRestante: undefined
            }
          case "liberar":
            return {
              ...table,
              status: "disponivel",
              cliente: undefined,
              horaOcupacao: undefined
            }
          case "confirmar_reserva":
            return {
              ...table,
              status: "ocupada",
              cliente: table.reserva?.cliente,
              horaOcupacao: new Date(),
              reserva: undefined,
              tempoRestante: undefined
            }
          case "cancelar_reserva":
            return {
              ...table,
              status: "disponivel",
              reserva: undefined,
              tempoRestante: undefined
            }
          case "indisponibilizar":
            return {
              ...table,
              status: "indisponivel",
              cliente: undefined,
              horaOcupacao: undefined,
              reserva: undefined,
              tempoRestante: undefined
            }
          default:
            return table
        }
      })
    )

    setDialogData({ open: false, table: null, actionType: null })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Controle de Mesas</h2>

      <TableStats tables={tables} />

      <div className="grid grid-cols-1  gap-4">
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            canOccupy={canOccupyTable(table)}
            onAcao={handleAction}
          />
        ))}
      </div>

      <TableDialog
        open={dialogData.open}
        table={dialogData.table}
        actionType={dialogData.actionType}
        onClose={() => setDialogData({ open: false, table: null, actionType: null })}
        onConfirm={handleConfirmAction}
      />
    </div>
  )
}
