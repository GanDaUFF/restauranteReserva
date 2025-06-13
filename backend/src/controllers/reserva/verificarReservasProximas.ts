import { Request, Response } from "express"
import { verificarReservasProximasService } from "../../service/reserva/verificarReservasProximasService"

export const verificarReservasProximas = async (_req: Request, res: Response) => {
  try {
    const totalAtualizadas = await verificarReservasProximasService()
    return res.status(200).json({ message: `Reservas verificadas. ${totalAtualizadas} mesas atualizadas.` })
  } catch (error: any) {
    return res.status(500).json({ error: "Erro ao verificar reservas próximas." })
  }
}
