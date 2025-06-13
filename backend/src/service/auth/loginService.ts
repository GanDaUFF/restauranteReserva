import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { encontrarUsuarioPorEmail } from '../../repository/authRepository';

const JWT_SECRET = process.env.JWT_SECRET || 'segredo-super-seguro';

export const loginService = async (email: string, senha: string) => {
  const usuario = await encontrarUsuarioPorEmail(email);
  if (!usuario) throw new Error('Usuário não encontrado');

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) throw new Error('Senha inválida');

  const token = jwt.sign(
    { id: usuario.id, tipo: usuario.tipo },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, usuario };
};
