import prisma from "../prisma"

export const buscarReservasPorPeriodo = async (dataInicio: Date, dataFim: Date, status?: string) => {
  const where: any = {
    dataHora: {
      gte: dataInicio,
      lte: dataFim,
    },
  }

  if (status && status !== "TODOS") {
    where.status = status
  }

  return await prisma.reserva.findMany({
    where,
    orderBy: {
      dataHora: "desc",
    },
  })
}

export const buscarReservasPorMesa = async (numeroMesa: number, dataInicio?: Date, dataFim?: Date) => {
  const where: any = {
    numeroMesa,
  }

  if (dataInicio && dataFim) {
    where.dataHora = {
      gte: dataInicio,
      lte: dataFim,
    }
  }

  return await prisma.reserva.findMany({
    where,
    orderBy: {
      dataHora: "desc",
    },
  })
}

export const buscarReservasPorGarcom = async (dataInicio?: Date, dataFim?: Date) => {
  const where: any = {
    status: "CONFIRMADA",
    confirmadoPor: {
      not: null,
    },
  }

  if (dataInicio && dataFim) {
    where.dataHora = {
      gte: dataInicio,
      lte: dataFim,
    }
  }

  return await prisma.reserva.findMany({
    where,
    orderBy: {
      dataHora: "desc",
    },
  })
}
