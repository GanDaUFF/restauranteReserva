"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Mesa {
  id: number
  numeroMesa: number
  capacidade: number
  status: string
}

interface RelatorioMesaData {
  mesa: number
  periodo: {
    dataInicio: string
    dataFim: string
  } | null
  resumo: {
    totalReservas: number
    reservasAtendidas: number
    reservasCanceladas: number
    taxaAtendimento: string
  }
  reservas: Array<{
    id: number
    dataHora: string
    nomeResponsavel: string
    telefone: string
    quantidade: number
    status: string
    confirmadoPor?: string
    criadoEm: string
  }>
}

export function RelatorioReservasMesa() {
  const [mesas, setMesas] = useState<Mesa[]>([])
  const [mesaSelecionada, setMesaSelecionada] = useState("")
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")
  const [relatorio, setRelatorio] = useState<RelatorioMesaData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    buscarMesas()
  }, [])

  const buscarMesas = async () => {
    try {
      const response = await fetch("http://localhost:3030/listarMesas")
      const data = await response.json()
      if (response.ok) {
        setMesas(data)
      }
    } catch (error) {
      console.error("Erro ao buscar mesas:", error)
    }
  }

  const buscarRelatorio = async () => {
    if (!mesaSelecionada) {
      toast({
        title: "Erro",
        description: "Selecione uma mesa",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (dataInicio) params.append("dataInicio", dataInicio)
      if (dataFim) params.append("dataFim", dataFim)

      const response = await fetch(`http://localhost:3030/api/relatorios/reservas-mesa/${mesaSelecionada}?${params}`)
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
          <Label htmlFor="mesa">Mesa</Label>
          <Select value={mesaSelecionada} onValueChange={setMesaSelecionada}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma mesa" />
            </SelectTrigger>
            <SelectContent>
              {mesas.map((mesa) => (
                <SelectItem key={mesa.id} value={mesa.numeroMesa.toString()}>
                  Mesa {mesa.numeroMesa} ({mesa.capacidade} lugares)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dataInicio">Data Início (opcional)</Label>
          <Input id="dataInicio" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dataFim">Data Fim (opcional)</Label>
          <Input id="dataFim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
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
                <CardTitle className="text-sm font-medium">Total de Reservas</CardTitle>
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
                <CardTitle className="text-sm font-medium">Canceladas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{relatorio.resumo.reservasCanceladas}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Atendimento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{relatorio.resumo.taxaAtendimento}%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Reservas - Mesa {relatorio.mesa}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
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
