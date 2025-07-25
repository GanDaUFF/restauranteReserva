import { Request, Response } from 'express';
import { atualizarMesaService } from '../../service/mesas/atualizarMesaService';

export const atualizarMesa = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dados = req.body;
  const confirmadoPor = req.query.confirmadoPor as string;

  try {
    const mesaAtualizada = await atualizarMesaService(Number(id), dados, confirmadoPor);
    return res.status(200).json(mesaAtualizada);
  } catch (error) {
    return res.status(404).json({ error: 'Mesa não encontrada para atualização.' });
  }
};
