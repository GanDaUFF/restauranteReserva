"use client"

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
import { MoreHorizontal, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { getAll } from "@/lib/api/getAll"

// Dados de exemplo das reservas
const reservations = [
  {
    id: "1",
    cliente: "João Silva",
    telefone: "(11) 99999-9999",
    data: "2024-01-15",
    horario: "19:30",
    mesa: "Mesa 5",
    pessoas: 4,
    status: "confirmada",
  },
  {
    id: "2",
    cliente: "Maria Santos",
    telefone: "(11) 88888-8888",
    data: "2024-01-15",
    horario: "20:00",
    mesa: "Mesa 2",
    pessoas: 2,
    status: "pendente",
  },
  {
    id: "3",
    cliente: "Pedro Oliveira",
    telefone: "(11) 77777-7777",
    data: "2024-01-16",
    horario: "18:00",
    mesa: "Mesa 8",
    pessoas: 6,
    status: "confirmada",
  },
  {
    id: "4",
    cliente: "Ana Costa",
    telefone: "(11) 66666-6666",
    data: "2024-01-16",
    horario: "19:00",
    mesa: "Mesa 3",
    pessoas: 3,
    status: "cancelada",
  },
  {
    id: "5",
    cliente: "Carlos Ferreira",
    telefone: "(11) 55555-5555",
    data: "2024-01-17",
    horario: "20:30",
    mesa: "Mesa 1",
    pessoas: 2,
    status: "confirmada",
  },
  {
    id: "6",
    cliente: "Lucia Mendes",
    telefone: "(11) 44444-4444",
    data: "2024-01-17",
    horario: "18:30",
    mesa: "Mesa 7",
    pessoas: 5,
    status: "pendente",
  },
]


const getStatusBadge = (status: string) => {
  switch (status) {
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

  const [reservas, setReservas] = useState([])

  useEffect(() => {
    getAll("listarReservas")
      .then(setReservas)
      .catch((err) => alert("Erro ao carregar reservas: " + err.message))
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reservas</h2>
          <p className="text-muted-foreground">Gerencie todas as reservas do restaurante</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          Nova Reserva
        </Button>
      </div>

      <div className="rounded-md border">
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
            {reservas.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">{reservation.nomeResponsavel}</TableCell>
                <TableCell>{reservation.telefone}</TableCell>
                <TableCell>
                  {new Date(reservation.dataHora).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  {new Date(reservation.dataHora).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </TableCell>
                <TableCell>{reservation.numeroMesa}</TableCell>
                <TableCell>{reservation.quantidade}</TableCell>
                <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Editar reserva</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Confirmar</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Cancelar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
