import { Request, Response } from "express"
import { confirmarReservaService } from "../../service/reserva/confirmarReservaService"

export const confirmarReserva = async (req: Request, res: Response) => {
  const { id } = req.params
  const { garcom } = req.body

  try {
    const reservaConfirmada = await confirmarReservaService(Number(id), garcom)
    return res.status(200).json(reservaConfirmada)
  } catch (error: any) {
    return res.status(500).json({ error: "Erro ao confirmar reserva." })
  }
}
