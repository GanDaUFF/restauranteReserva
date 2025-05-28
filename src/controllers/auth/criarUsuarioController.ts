import { Request, Response } from 'express';
import { criarUsuarioService } from '../../service/auth/criarUsuarioService';

export const criarUsuario = async (req: Request, res: Response) => {
  const { nome, email, senha, tipo } = req.body;

  try {
    if (!['GERENTE', 'FUNCIONARIO', 'CLIENTE'].includes(tipo)) {
      return res.status(400).json({ error: 'Tipo de usuário inválido' });
    }

    const usuario = await criarUsuarioService(nome, email, senha, tipo);
    return res.status(201).json({ message: 'Usuário criado com sucesso', usuario });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
