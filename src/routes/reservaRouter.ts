import { Router } from 'express';
import { criarReserva } from '../controllers/criarReservaController';
import { listarReservas } from '../controllers/listarReservaController';

const router = Router();

router.post('/reserva', criarReserva);
router.get('/reservas', listarReservas);

export default router;
