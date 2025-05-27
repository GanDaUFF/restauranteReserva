import prisma from '../prisma'

export const encontrarReservaExistente = async (dataHora: Date, numeroMesa: number) => {
  return await prisma.reserva.findFirst({
    where: {
      dataHora,
      numeroMesa,
      status: 'PENDENTE',
    },
  });
};
export const listarTodasReservas = async () => {
    return await prisma.reserva.findMany({
      orderBy: {
        dataHora: 'asc',
      },
    });
  };

  export const deletarReservaPorId = async (id: number) => {
    return await prisma.reserva.delete({
      where: { id },
    });
  };

  export const atualizarReservaPorId = async (id: number, dadosAtualizados: any) => {
    return await prisma.reserva.update({
      where: { id },
      data: dadosAtualizados,
    });
  };

  
export const criarNovaReserva = async (
  dataHora: Date,
  numeroMesa: number,
  quantidade: number,
  nomeResponsavel: string
) => {
  return await prisma.reserva.create({
    data: {
      dataHora,
      numeroMesa,
      quantidade,
      nomeResponsavel,
      status: 'PENDENTE',
    },
  });
};
