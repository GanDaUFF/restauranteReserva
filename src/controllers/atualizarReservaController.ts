import { Request, Response } from 'express';
import { atualizarReservaService } from '../service/atualizarReservaService';

export const atualizarReserva = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dados = req.body;

  try {
    const reservaAtualizada = await atualizarReservaService(Number(id), dados);
    return res.status(200).json(reservaAtualizada);
  } catch (error) {
    return res.status(404).json({ error: 'Reserva não encontrada para atualização.' });
  }
};
