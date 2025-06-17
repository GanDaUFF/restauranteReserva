"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface RelatorioData {
  periodo: {
    dataInicio: string
    dataFim: string
  }
  resumo: {
    totalReservas: number
    reservasAtendidas: number
    reservasNaoAtendidas: number
    reservasPendentes: number
    reservasConfirmadas: number
  }
  reservas: Array<{
    id: number
    dataHora: string
    numeroMesa: number
    nomeResponsavel: string
    telefone: string
    quantidade: number
    status: string
    confirmadoPor?: string
    criadoEm: string
  }>
}

export function RelatorioReservasPeriodo() {
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")
  const [status, setStatus] = useState("TODOS")
  const [relatorio, setRelatorio] = useState<RelatorioData | null>(null)
  const [loading, setLoading] = useState(false)

  const buscarRelatorio = async () => {
    if (!dataInicio || !dataFim) {
      toast({
        title: "Erro",
        description: "Selecione as datas de início e fim",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const params = new URLSearchParams({
        dataInicio,
        dataFim,
        status,
      })

      const response = await fetch(`http://localhost:3030/api/relatorios/reservas-periodo?${params}`)
      const data = await response.json()

      if (response.ok) {
        setRelatorio(data)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao buscar relatório",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      PENDENTE: { label: "Pendente", variant: "secondary" as const },
      CONFIRMADA: { label: "Confirmada", variant: "default" as const },
      ATIVA: { label: "Ativa", variant: "default" as const },
      CONCLUIDA: { label: "Concluída", variant: "default" as const },
      CANCELADA: { label: "Cancelada", variant: "destructive" as const },
      NAO_COMPARECEU: { label: "Não Compareceu", variant: "destructive" as const },
    }

    const statusInfo = statusMap[status as keyof typeof statusMap] || { label: status, variant: "secondary" as const }
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dataInicio">Data Início</Label>
          <Input id="dataInicio" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dataFim">Data Fim</Label>
          <Input id="dataFim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos</SelectItem>
              <SelectItem value="PENDENTE">Pendente</SelectItem>
              <SelectItem value="CONFIRMADA">Confirmada</SelectItem>
              <SelectItem value="CONCLUIDA">Concluída</SelectItem>
              <SelectItem value="CANCELADA">Cancelada</SelectItem>
              <SelectItem value="NAO_COMPARECEU">Não Compareceu</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button onClick={buscarRelatorio} disabled={loading} className="w-full">
            <Search className="h-4 w-4 mr-2" />
            {loading ? "Buscando..." : "Buscar"}
          </Button>
        </div>
      </div>

      {relatorio && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{relatorio.resumo.totalReservas}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Atendidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{relatorio.resumo.reservasAtendidas}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Não Atendidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{relatorio.resumo.reservasNaoAtendidas}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{relatorio.resumo.reservasPendentes}</div>
              </CardContent>
            </Card>
           
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detalhes das Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Mesa</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Pessoas</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Confirmado por</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {relatorio.reservas.map((reserva) => (
                    <TableRow key={reserva.id}>
                      <TableCell>{new Date(reserva.dataHora).toLocaleString("pt-BR")}</TableCell>
                      <TableCell>{reserva.numeroMesa}</TableCell>
                      <TableCell>{reserva.nomeResponsavel}</TableCell>
                      <TableCell>{reserva.telefone}</TableCell>
                      <TableCell>{reserva.quantidade}</TableCell>
                      <TableCell>{getStatusBadge(reserva.status)}</TableCell>
                      <TableCell>{reserva.confirmadoPor || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
