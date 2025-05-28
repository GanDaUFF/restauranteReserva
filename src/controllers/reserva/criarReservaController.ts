import { Request, Response } from 'express';
import { criarReservaService } from '../../service/reserva/criarReservaService';

export const criarReserva = async (req: Request, res: Response) => {
    const { dataHora, numeroMesa, quantidade, nomeResponsavel } = req.body;

    try {
        const reserva = await criarReservaService(dataHora, numeroMesa, quantidade, nomeResponsavel);
        
        return res.status(201).json(reserva);
    } catch (error: any) {
        const message = error.message || 'Erro interno ao criar reserva.';
        
        return res.status(400).json({ error: message });
    }
};
