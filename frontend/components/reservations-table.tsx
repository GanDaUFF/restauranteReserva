// components/ReservationsTable.tsx
"use client"
import ReservaAcaoDialog from "@/components/acaoReserva"
import { useEffect, useState } from "react"
import { getAll } from "@/lib/api/getAll"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import ReservaDialog from "./reservaDialog"

const getStatusBadge = (status: string) => {
  switch (status.toUpperCase()) {
    case "CONFIRMADA":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmada</Badge>
    case "PENDENTE":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>
    case "CANCELADA":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function ReservationsTable() {
  const [reservaSelecionada, setReservaSelecionada] = useState<number | null>(null)
  const [acaoTipo, setAcaoTipo] = useState<"CONFIRMAR" | "CANCELAR" | null>(null)
  const [abrirAcao, setAbrirAcao] = useState(false)
  const [dialogAberto, setDialogAberto] = useState(false)
  const [reservaEditando, setReservaEditando] = useState<any | null>(null)

  const [reservas, setReservas] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    cliente: "",
    telefone: "",
    email: "",
    data: "",
    horario: "",
    mesa: "",
    pessoas: "",
    observacoes: "",
  })

  useEffect(() => {
    getAll("listarReservas")
      .then(setReservas)
      .catch((err) => alert("Erro ao carregar reservas: " + err.message))
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nova reserva:", formData)
    alert("Reserva criada com sucesso!")

    setFormData({
      cliente: "",
      telefone: "",
      email: "",
      data: "",
      horario: "",
      mesa: "",
      pessoas: "",
      observacoes: "",
    })
    setIsDialogOpen(false)
  }

  return (

    <div className="rounded-md border ">
      <div className="flex items-center p-4 justify-between">
      <div>
          <h2 className="text-2xl font-bold tracking-tight">Reservas</h2>
          <p className="text-muted-foreground">Gerencie todas as reservas do restaurante</p>
        </div>
      <ReservaDialog
        open={dialogAberto}
        onOpenChange={(val) => {
          setDialogAberto(val)
          if (!val) setReservaEditando(null)
        }}
        reservaParaEditar={reservaEditando}
        onSuccess={() => getAll("listarReservas").then(setReservas)}
      />

      {reservaSelecionada && acaoTipo && (
        <ReservaAcaoDialog
          open={abrirAcao}
          onOpenChange={setAbrirAcao}
          id={reservaSelecionada}
          tipo={acaoTipo}
          onSuccess={() => getAll("listarReservas").then(setReservas)}
        />
      )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Mesa</TableHead>
            <TableHead>Pessoas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservas.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.nomeResponsavel}</TableCell>
              <TableCell>{r.telefone}</TableCell>
              <TableCell>{new Date(r.dataHora).toLocaleDateString("pt-BR")}</TableCell>
              <TableCell>{new Date(r.dataHora).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</TableCell>
              <TableCell>{r.numeroMesa}</TableCell>
              <TableCell>{r.quantidade}</TableCell>
              <TableCell>{getStatusBadge(r.status)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setReservaEditando(r)
                      setDialogAberto(true)
                    }}>Editar reserva</DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                      setReservaSelecionada(r.id)
                      setAcaoTipo("CONFIRMAR")
                      setAbrirAcao(true)
                    }}>Confirmar</DropdownMenuItem>

                    <DropdownMenuItem className="text-red-600" onClick={() => {
                      setReservaSelecionada(r.id)
                      setAcaoTipo("CANCELAR")
                      setAbrirAcao(true)
                    }}>Cancelar</DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>



    </div>
  )
}
