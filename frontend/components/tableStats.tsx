import { Table } from "@/types/mesas" // ou defina diretamente se ainda estiver local

interface TableStatsProps {
  tables: Table[]
}

export default function TableStats({ tables }: TableStatsProps) {
  const stats = {
    total: tables.length,
    disponivel: tables.filter(t => t.status === "disponivel").length,
    ocupada: tables.filter(t => t.status === "ocupada").length,
    reservada: tables.filter(t => t.status === "reservada").length,
    confirmacao: tables.filter(t => t.status === "confirmacao_pendente").length
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div className="rounded-xl bg-muted p-4 flex flex-col justify-center">
        <h3 className="text-sm text-gray-600">Total</h3>
        <p className="text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="rounded-xl bg-green-100 p-4 flex flex-col justify-center">
        <h3 className="text-sm text-green-800">Disponíveis</h3>
        <p className="text-2xl font-bold text-green-900">{stats.disponivel}</p>
      </div>
      <div className="rounded-xl bg-red-100 p-4 flex flex-col justify-center">
        <h3 className="text-sm text-red-800">Ocupadas</h3>
        <p className="text-2xl font-bold text-red-900">{stats.ocupada}</p>
      </div>
      <div className="rounded-xl bg-yellow-100 p-4 flex flex-col justify-center">
        <h3 className="text-sm text-yellow-800">Reservadas</h3>
        <p className="text-2xl font-bold text-yellow-900">{stats.reservada}</p>
      </div>
      <div className="rounded-xl bg-orange-100 p-4 flex flex-col justify-center">
        <h3 className="text-sm text-orange-800">Confirmação</h3>
        <p className="text-2xl font-bold text-orange-900">{stats.confirmacao}</p>
      </div>
    </div>
  )
}
