"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RelatorioReservasPeriodo } from "./relatorio-reservas-periodo"
import { RelatorioReservasMesa } from "./relatorio-reservas-mesa"
import { RelatorioReservasGarcom } from "./relatorio-reservas-garcom"
import { BarChart3, Calendar, Users, UtensilsCrossed } from "lucide-react"

export function RelatoriosContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Visualize e analise dados sobre reservas, mesas e atendimentos</p>
      </div>

      <Tabs defaultValue="periodo" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="periodo" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Reservas por Período
          </TabsTrigger>
          <TabsTrigger value="mesa" className="flex items-center gap-2">
            <UtensilsCrossed className="h-4 w-4" />
            Reservas por Mesa
          </TabsTrigger>
          <TabsTrigger value="garcom" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Confirmações por Garçom
          </TabsTrigger>
        </TabsList>

        <TabsContent value="periodo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Relatório de Reservas por Período
              </CardTitle>
              <CardDescription>Visualize reservas atendidas ou não em um período específico</CardDescription>
            </CardHeader>
            <CardContent>
              <RelatorioReservasPeriodo />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mesa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5" />
                Relatório de Reservas por Mesa
              </CardTitle>
              <CardDescription>Consulte o histórico de reservas de uma mesa específica</CardDescription>
            </CardHeader>
            <CardContent>
              <RelatorioReservasMesa />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="garcom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Relatório de Confirmações por Garçom
              </CardTitle>
              <CardDescription>Veja quantas reservas cada garçom confirmou</CardDescription>
            </CardHeader>
            <CardContent>
              <RelatorioReservasGarcom />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
