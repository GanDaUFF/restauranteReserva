"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { patchData } from "@/lib/api/patch"
import { deleteData } from "@/lib/api/delete"

type TipoAcao = "CONFIRMAR" | "CANCELAR"

interface ReservaAcaoDialogProps {
  open: boolean
  onOpenChange: (val: boolean) => void
  id: number
  tipo: TipoAcao
  onSuccess?: () => void
}

export default function ReservaAcaoDialog({ open, onOpenChange, id, tipo, onSuccess }: ReservaAcaoDialogProps) {
  const isConfirmar = tipo === "CONFIRMAR"

  const executarAcao = async () => {
    try {
      if (isConfirmar) {
        await patchData(`reserva/${id}`, { confirmadoPor: "Garçom" })
        toast.success("Reserva confirmada com sucesso!")
      } else {
        await deleteData(`reserva/${id}`)
        toast.success("Reserva cancelada com sucesso!")
      }

      onOpenChange(false)
      onSuccess?.()
    } catch (err: any) {
      toast.error(`Erro ao ${isConfirmar ? "confirmar" : "cancelar"}: ${err.message}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isConfirmar ? "Confirmar Reserva" : "Cancelar Reserva"}</DialogTitle>
        </DialogHeader>
        <p>
          Tem certeza que deseja {isConfirmar ? "confirmar" : "cancelar"} esta reserva?
        </p>
        <DialogFooter className="gap-2 mt-4">
          
          <Button
            onClick={executarAcao}
            className={isConfirmar ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
          >
            {isConfirmar ? "Confirmar" : "Cancelar"}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Voltar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
