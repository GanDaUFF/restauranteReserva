import { Request, Response } from "express"
import { criarMesaService } from "../../service/mesas/criarMesaService"

export const criarMesa = async (req: Request, res: Response) => {
  const { numeroMesa, capacidade, status, cliente, horaOcupacao, reservaId } = req.body

  try {
    const mesa = await criarMesaService(
      numeroMesa,
      capacidade,
      status,
      cliente,
      horaOcupacao,
      reservaId,
    )

    return res.status(201).json(mesa)
  } catch (error: any) {
    const message = error.message || "Erro ao criar mesa."
    return res.status(400).json({ error: message })
  }
}
