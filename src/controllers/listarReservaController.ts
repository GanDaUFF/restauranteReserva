import { Request, Response } from 'express';
import { listarReservasService } from '../service/listarReservaService';

export const listarReservas = async (_req: Request, res: Response) => {
  try {
    const reservas = await listarReservasService();
    return res.status(200).json(reservas);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar reservas.' });
  }
};
