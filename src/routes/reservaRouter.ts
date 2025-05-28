import { Router } from 'express';
import { criarReserva } from '../controllers/reserva/criarReservaController';
import { listarReservas } from '../controllers/reserva/listarReservaController';
import { deletarReserva } from '../controllers/reserva/deletarReservaController';
import { atualizarReserva } from '../controllers/reserva/atualizarReservaController';

const router = Router();

router.post('/criarReserva', criarReserva);
router.get('/listarReservas', listarReservas);
router.delete('/deletarReserva/:id', deletarReserva)
router.patch('/atualizarReserva/:id', atualizarReserva);

export default router;
