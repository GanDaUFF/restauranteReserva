import bcrypt from 'bcryptjs';
import { criarUsuario } from '../../repository/authRepository';

export const criarUsuarioService = async (
  nome: string,
  email: string,
  senha: string,
  tipo: 'GERENTE' | 'FUNCIONARIO' | 'CLIENTE'
) => {
  const senhaHash = await bcrypt.hash(senha, 10);
  return await criarUsuario({ nome, email, senha: senhaHash, tipo });
};
