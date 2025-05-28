import { Request, Response } from 'express';
import { deletarReservaService } from '../../service/reserva/deletarReservaService';

export const deletarReserva = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const reserva = await deletarReservaService(Number(id));
    return res.status(200).json({ message: 'Reserva cancelada com sucesso', reserva });
  } catch (error) {
    return res.status(404).json({ error: 'Reserva não encontrada ou já excluída' });
  }
};
