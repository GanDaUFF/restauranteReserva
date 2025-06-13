import prisma from '../prisma'

export const encontrarUsuarioPorEmail = async (email: string) => {
  return await prisma.usuario.findUnique({ where: { email } });
};

export const criarUsuario = async (dados: {
    nome: string;
    email: string;
    senha: string;
    tipo: 'GERENTE' | 'FUNCIONARIO' | 'CLIENTE';
  }) => {
    return await prisma.usuario.create({ data: dados });
  };