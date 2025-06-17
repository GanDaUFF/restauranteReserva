import { Router } from 'express';
import { criarMesa } from '../controllers/mesas/criarMesaController';
import { listarMesas } from '../controllers/mesas/listarMesaController';
import { atualizarMesa } from '../controllers/mesas/atualizarMesaController';

const router = Router();

router.post('/criarMesa', criarMesa);
router.get('/listarMesas', listarMesas);
// router.delete('/deletarMesa/:id', deletarMesa)
router.patch('/atualizarMesa/:id', atualizarMesa);

export default router;
