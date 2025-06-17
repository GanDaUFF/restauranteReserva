"use client"

import { useEffect, useState } from "react"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Phone, User, Plus } from "lucide-react"
import { postData } from "@/lib/api/post"
import { toast } from "sonner"
import { patchData } from "@/lib/api/patch"
import { getAll } from "@/lib/api/getAll"

const horarios = [
  "00:00", "00:30", "01:00", "01:30", "02:00", "02:30",
  "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
  "06:00", "06:30", "07:00", "07:30", "08:00", "08:30",
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
]


interface ReservaDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    reservaParaEditar?: any | null
    onSuccess?: () => void
  }
  
  export default function ReservaDialog({
    open,
    onOpenChange,
    reservaParaEditar,
    onSuccess
  }: ReservaDialogProps) {
const [mesasDisponiveis, setMesasDisponiveis] = useState<string[]>([])
  
    useEffect(() => {

      const fetchMesas = async () => {
        try {
          const todasMesas = await getAll("listarMesas")
          const disponiveis = todasMesas
            .map((m: any) => `Mesa ${m.numeroMesa}`)
    
          setMesasDisponiveis(disponiveis)
        } catch (error) {
          toast.error("Erro ao carregar mesas disponíveis")
        }
      }
    
      fetchMesas()
    
      if (reservaParaEditar) {
        const data = new Date(reservaParaEditar.dataHora)
        setFormData({
          cliente: reservaParaEditar.nomeResponsavel,
          telefone: reservaParaEditar.telefone,
          data: data.toISOString().split("T")[0],
          horario: data.toTimeString().slice(0, 5),
          mesa: `Mesa ${reservaParaEditar.numeroMesa}`,
          pessoas: reservaParaEditar.quantidade.toString(),
          observacoes: reservaParaEditar.observacoes || "",
        })
      } else {
        setFormData({
          cliente: "",
          telefone: "",
          data: "",
          horario: "",
          mesa: "",
          pessoas: "",
          observacoes: "",
        })
      }
    }, [reservaParaEditar])
    
  const [formData, setFormData] = useState({
    cliente: "",
    telefone: "",
    data: "",
    horario: "",
    mesa: "",
    pessoas: "",
    observacoes: "",
  })


useEffect(() => {
  if (reservaParaEditar) {
    const data = new Date(reservaParaEditar.dataHora)
    setFormData({
      cliente: reservaParaEditar.nomeResponsavel,
      telefone: reservaParaEditar.telefone,
      data: data.toISOString().split("T")[0],
      horario: data.toTimeString().slice(0, 5),
      mesa: `Mesa ${reservaParaEditar.numeroMesa}`,
      pessoas: reservaParaEditar.quantidade.toString(),
      observacoes: reservaParaEditar.observacoes || "",
    })
  } else {
    setFormData({
      cliente: "",
      telefone: "",
      data: "",
      horario: "",
      mesa: "",
      pessoas: "",
      observacoes: "",
    })
  }
}, [reservaParaEditar])


  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      const dataHora = new Date(`${formData.data}T${formData.horario}`)
      const body = {
        nomeResponsavel: formData.cliente,
        telefone: formData.telefone,
        dataHora: dataHora.toISOString(),
        numeroMesa: Number(formData.mesa.replace("Mesa ", "")) || null,
        quantidade: Number(formData.pessoas),
        observacoes: formData.observacoes,
      }
  
      if (reservaParaEditar) {
        await patchData(`atualizarReserva/${reservaParaEditar.id}`, body)
        toast.success("Reserva atualizada com sucesso!")
      } else {
        await postData("criarReserva", body)
        toast.success("Reserva criada com sucesso!")
      }
  
      onOpenChange(false)
      onSuccess?.()
    } catch (err: any) {
      toast.error("Erro ao salvar reserva: " + err.message)
    }
  }
  


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" /> Nova Reserva
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] sm:max-h-[550px] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-600" />
            Nova Reserva
          </DialogTitle>
          <DialogDescription>Preencha os dados abaixo para criar uma nova reserva.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><User className="h-4 w-4" /> Cliente *</Label>
              <Input required value={formData.cliente} onChange={(e) => handleInputChange("cliente", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Phone className="h-4 w-4" /> Telefone *</Label>
              <Input required value={formData.telefone} onChange={(e) => handleInputChange("telefone", e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Data *</Label>
              <Input type="date" required value={formData.data} onChange={(e) => handleInputChange("data", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Horário *</Label>
              <Select value={formData.horario} onValueChange={(value) => handleInputChange("horario", value)}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {horarios.map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Pessoas *</Label>
              <Select value={formData.pessoas} onValueChange={(value) => handleInputChange("pessoas", value)}>
                <SelectTrigger><SelectValue placeholder="Qtd" /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1} {i === 0 ? "pessoa" : "pessoas"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
  <Label>Mesa</Label>
  <Select value={formData.mesa} onValueChange={(value) => handleInputChange("mesa", value)}>
    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
    <SelectContent>
      {mesasDisponiveis.map((m) => (
        <SelectItem key={m} value={m}>{m}</SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea rows={3} value={formData.observacoes} onChange={(e) => handleInputChange("observacoes", e.target.value)} />
          </div>

          <DialogFooter className="gap-2">
          <Button type="button" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">Criar Reserva</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
