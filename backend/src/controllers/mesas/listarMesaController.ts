import { Request, Response } from 'express'
import { listarMesasService } from '../../service/mesas/listarMesaService'

export const listarMesas = async (_req: Request, res: Response) => {
  try {
    const mesas = await listarMesasService()
    return res.status(200).json(mesas)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar mesas.' })
  }
}
