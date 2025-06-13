import { Request, Response } from 'express';
import { loginService } from '../../service/auth/loginService';

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const { token, usuario } = await loginService(email, senha);
    return res.status(200).json({ token, usuario });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};
