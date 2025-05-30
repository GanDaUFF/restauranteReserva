"use client"

import { useEffect, useState } from "react"
import { getAll } from "@/lib/api/getAll"

type StatusContagem = {
  total: number
  confirmadas: number
  pendentes: number
  canceladas: number
}

export default function CardsHome() {
  const [contagem, setContagem] = useState<StatusContagem>({
    total: 0,
    confirmadas: 0,
    pendentes: 0,
    canceladas: 0,
  })

  useEffect(() => {
    getAll<any[]>("listarReservas")
      .then((res) => {
        const contagemAtualizada: StatusContagem = {
          total: res.length,
          confirmadas: res.filter((r) => r.status === "CONFIRMADA").length,
          pendentes: res.filter((r) => r.status === "PENDENTE").length,
          canceladas: res.filter((r) => r.status === "CANCELADA").length,
        }
        setContagem(contagemAtualizada)
      })
      .catch(() => alert("Erro ao carregar os cards"))
  }, [])

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
      <div className="aspect-video rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 p-4 flex flex-col justify-center">
        <h3 className="font-semibold text-orange-800">Total de Reservas</h3>
        <p className="text-2xl font-bold text-orange-900">{contagem.total}</p>
      </div>
      <div className="aspect-video rounded-xl bg-gradient-to-br from-green-100 to-green-200 p-4 flex flex-col justify-center">
        <h3 className="font-semibold text-green-800">Confirmadas</h3>
        <p className="text-2xl font-bold text-green-900">{contagem.confirmadas}</p>
      </div>
      <div className="aspect-video rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 flex flex-col justify-center">
        <h3 className="font-semibold text-yellow-800">Pendentes</h3>
        <p className="text-2xl font-bold text-yellow-900">{contagem.pendentes}</p>
      </div>
      <div className="aspect-video rounded-xl bg-gradient-to-br from-red-100 to-red-200 p-4 flex flex-col justify-center">
        <h3 className="font-semibold text-red-800">Canceladas</h3>
        <p className="text-2xl font-bold text-red-900">{contagem.canceladas}</p>
      </div>
    </div>
  )
}
