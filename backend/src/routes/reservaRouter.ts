import { Router } from 'express';
import { criarReserva } from '../controllers/reserva/criarReservaController';
import { listarReservas } from '../controllers/reserva/listarReservaController';
import { deletarReserva } from '../controllers/reserva/deletarReservaController';
import { atualizarReserva } from '../controllers/reserva/atualizarReservaController';
import { verificarReservasProximas } from '../controllers/reserva/verificarReservasProximas';
import { confirmarReserva } from '../controllers/reserva/confirmarReserva';

const router = Router();

router.post('/criarReserva', criarReserva);
router.get('/listarReservas', listarReservas);
router.delete('/deletarReserva/:id', deletarReserva)
router.patch('/atualizarReserva/:id', atualizarReserva);
router.post("/verificarReservas", verificarReservasProximas)
router.patch("/ConfirmarReserva/:id", confirmarReserva)

export default router;
