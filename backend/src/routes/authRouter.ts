import { Router } from 'express';
import { login } from '../controllers/auth/loginController';
import { criarUsuario } from '../controllers/auth/criarUsuarioController';

const router = Router();

router.post('/auth/login', login);
router.post('/auth/registro', criarUsuario); // ✅ nova rota única

export default router;
