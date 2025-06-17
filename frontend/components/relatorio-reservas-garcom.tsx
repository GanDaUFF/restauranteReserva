"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, ChevronDown, ChevronRight } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface RelatorioGarcomData {
  periodo: {
    dataInicio: string
    dataFim: string
  } | null
  totalGarcons: number
  totalReservasConfirmadas: number
  relatorio: Array<{
    garcom: string
    totalConfirmadas: number
    reservas: Array<{
      id: number
      dataHora: string
      numeroMesa: number
      nomeResponsavel: string
      telefone: string
      quantidade: number
      status: string
      criadoEm: string
    }>
  }>
}

export function RelatorioReservasGarcom() {
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")
  const [relatorio, setRelatorio] = useState<RelatorioGarcomData | null>(null)
  const [loading, setLoading] = useState(false)
  const [expandedGarcom, setExpandedGarcom] = useState<string | null>(null)

  const buscarRelatorio = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (dataInicio) params.append("dataInicio", dataInicio)
      if (dataFim) params.append("dataFim", dataFim)

      const response = await fetch(`http://localhost:3030/api/relatorios/reservas-garcom?${params}`)
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Garçons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{relatorio.totalGarcons}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Confirmações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{relatorio.totalReservasConfirmadas}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Média por Garçom</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {relatorio.totalGarcons > 0
                    ? Math.round(relatorio.totalReservasConfirmadas / relatorio.totalGarcons)
                    : 0}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Confirmações por Garçom</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatorio.relatorio
                  .sort((a, b) => b.totalConfirmadas - a.totalConfirmadas)
                  .map((garcomData) => (
                    <Collapsible
                      key={garcomData.garcom}
                      open={expandedGarcom === garcomData.garcom}
                      onOpenChange={(open) => setExpandedGarcom(open ? garcomData.garcom : null)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                          <div className="flex items-center gap-4">
                            <div className="text-left">
                              <div className="font-semibold">{garcomData.garcom}</div>
                              <div className="text-sm text-muted-foreground">
                                {garcomData.totalConfirmadas} confirmações
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{garcomData.totalConfirmadas}</Badge>
                            {expandedGarcom === garcomData.garcom ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Data/Hora</TableHead>
                              <TableHead>Mesa</TableHead>
                              <TableHead>Responsável</TableHead>
                              <TableHead>Telefone</TableHead>
                              <TableHead>Pessoas</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {garcomData.reservas.map((reserva) => (
                              <TableRow key={reserva.id}>
                                <TableCell>{new Date(reserva.dataHora).toLocaleString("pt-BR")}</TableCell>
                                <TableCell>{reserva.numeroMesa}</TableCell>
                                <TableCell>{reserva.nomeResponsavel}</TableCell>
                                <TableCell>{reserva.telefone}</TableCell>
                                <TableCell>{reserva.quantidade}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
