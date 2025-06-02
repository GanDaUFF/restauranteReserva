"use client"

import { useEffect, useState } from "react"
import { initialTables } from "@/lib/mock/initialTables"
import { canOccupyTable, getStatusInfo, formatTime } from "@/lib/mesaUtils"
import TableStats from "@/components/tableStats"
import TableCard from "@/components/tableCard"
import TableDialog from "@/components/tableActionDialog"
import { Table, TableAction, ActionType } from "@/types/mesas"
import { AppSidebar } from "@/components/app-sidebar"
import { navMain } from "@/lib/sideBarMenu"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import HeaderTopBar from "@/components/headerTopBar"

export default function TablesManagement() {
    const [tables, setTables] = useState<Table[]>(initialTables)
    const [dialogData, setDialogData] = useState<{
        open: boolean
        table: Table | null
        actionType: ActionType | null
    }>({ open: false, table: null, actionType: null })

    const [clienteName, setClienteName] = useState("")

    // Atualiza a contagem regressiva de confirmação
    useEffect(() => {
        const interval = setInterval(() => {
            setTables((prev) =>
                prev.map((table) => {
                    if (table.status === "confirmacao_pendente" && table.tempoRestante) {
                        const newTempo = table.tempoRestante - 1
                        if (newTempo <= 0) {
                            return { ...table, status: "disponivel", reserva: undefined, tempoRestante: undefined }
                        }
                        return { ...table, tempoRestante: newTempo }
                    }

                    if (table.status === "reservada" && table.reserva) {
                        const now = new Date()
                        const diff = (table.reserva.horario.getTime() - now.getTime()) / 1000 / 60
                        if (diff <= 0) {
                            return { ...table, status: "confirmacao_pendente", tempoRestante: 15 }
                        }
                    }

                    return table
                }),
            )
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    const handleAction = (table: Table, actionType: ActionType) => {
        setDialogData({ open: true, table, actionType })
    }

    const handleConfirmAction = (tableId: string, actionType: ActionType, cliente?: string) => {
        setTables((prev) =>
            prev.map((table) => {
                if (table.id !== tableId) return table

                switch (actionType) {
                    case "ocupar":
                        return {
                            ...table,
                            status: "ocupada",
                            cliente,
                            horaOcupacao: new Date(),
                            reserva: undefined,
                            tempoRestante: undefined,
                        }
                    case "liberar":
                        return {
                            ...table,
                            status: "disponivel",
                            cliente: undefined,
                            horaOcupacao: undefined,
                        }
                    case "confirmar_reserva":
                        return {
                            ...table,
                            status: "ocupada",
                            cliente: table.reserva?.cliente,
                            horaOcupacao: new Date(),
                            reserva: undefined,
                            tempoRestante: undefined,
                        }
                    case "cancelar_reserva":
                        return {
                            ...table,
                            status: "disponivel",
                            reserva: undefined,
                            tempoRestante: undefined,
                        }
                    case "indisponibilizar":
                        return {
                            ...table,
                            status: "indisponivel",
                            cliente: undefined,
                            horaOcupacao: undefined,
                            reserva: undefined,
                            tempoRestante: undefined,
                        }
                }
            }),
        )

        setDialogData({ open: false, table: null, actionType: null })
        setClienteName("")
    }

    return (
        <SidebarProvider>
            <AppSidebar navMain={navMain} />
            <SidebarInset>
                <HeaderTopBar />
                <div className="space-y-6">

                    <h2 className="text-2xl font-bold tracking-tight">Controle de Mesas</h2>
                    <p className="text-muted-foreground">Gerencie o status e ocupação das mesas em tempo real</p>

                    <TableStats tables={tables} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                        clienteName={clienteName}
                        setClienteName={setClienteName}
                        onConfirm={handleConfirmAction}
                        onClose={() => setDialogData({ open: false, table: null, actionType: null })}
                    />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
