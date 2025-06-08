  "use client"

  import { useState, useEffect } from "react"
  import TableCard from "@/components/tableCard"
  import TableStats from "@/components/tableStats"
  import TableDialog from "@/components/tableActionDialog"
  import { ActionType, Table } from "@/types/mesas"
  import { getAll } from "@/lib/api/getAll"
  import { canOccupyTable } from "@/lib/mesaUtils"
  import { patchData } from "@/lib/api/patch"
  // Tipagens locais

  export default function TablesGrid() {
    const [tables, setTables] = useState<Table[]>([])
    const [dialogData, setDialogData] = useState<{
      open: boolean
      table: Table | null
      actionType: ActionType | null
    }>({ open: false, table: null, actionType: null })

    useEffect(() => {
      getAll("listarMesas")
        .then(setTables)
        .catch((err) => alert("Erro ao carregar mesas: " + err.message))
    }, [])

    const handleAction = (table: Table, actionType: ActionType) => {
      setDialogData({ open: true, table, actionType })
    }

    const handleConfirmAction = async (tableId: string, actionType: ActionType, cliente?: string) => {
      try {
        await patchData(`atualizarMesa/${tableId}`, {
          status: actionType,
          cliente: actionType === "ocupada" ? cliente : null,
          horaOcupacao: actionType === "ocupada" || actionType === "reservada"
            ? new Date().toISOString()
            : null
        })
    
        const novasMesas = await getAll("listarMesas")
        setTables(novasMesas)
        setDialogData({ open: false, table: null, actionType: null })
      } catch (error: any) {
        alert("Erro ao atualizar mesa: " + error.message)
      }
    }
    

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Controle de Mesas</h2>
        <p className="text-muted-foreground">Gerencie o status e ocupação das mesas em tempo real</p>

        <TableStats tables={tables} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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