import prisma from '../prisma'

export const encontrarReservaExistente = async (dataHora: Date, numeroMesa: number) => {
  return await prisma.reserva.findFirst({
    where: {
      dataHora,
      numeroMesa,
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
    const teste = await prisma.reserva.update({
      where: { id },
      data: dadosAtualizados,
    });

    return teste

  };

  
export const criarNovaReserva = async (
  dataHora: Date,
  numeroMesa: number,
  quantidade: number,
  nomeResponsavel: string,
  telefone: string
) => {
  return await prisma.reserva.create({
    data: {
      dataHora,
      numeroMesa,
      quantidade,
      nomeResponsavel,
      status: 'PENDENTE',
      telefone
    },
  });
};


export const buscarReservasProximas = async (agora: Date, intervaloMinutos: number) => {
  const ate = new Date(agora.getTime() + intervaloMinutos * 60 * 1000)

  return await prisma.reserva.findMany({
    where: {
      status: "PENDENTE",
      dataHora: {
        gte: agora,
        lte: ate,
      },
    },
    include: { mesa: true },
  })
}
export const concluirReservaAtivaPorMesa = async (numeroMesa: number,confirmadoPor: string) => {
  return await prisma.reserva.updateMany({
    where: {
      numeroMesa,
      status: "ATIVA",
    },
    data: {
      status: "CONCLUIDA",
      confirmadoPor : confirmadoPor
    },
  })
}

export const confirmarReservaPorId = async (id: number, garcom: string) => {
  return await prisma.reserva.update({
    where: { id },
    data: {
      status: "CONFIRMADA",
      confirmadoPor: garcom,
    },
  })
}

