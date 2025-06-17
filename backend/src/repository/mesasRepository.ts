import { StatusMesa } from "@prisma/client"
import prisma from "../prisma"

export const encontrarMesaPorNumero = async (numeroMesa: number) => {
  return await prisma.mesa.findUnique({
    where: {
      numeroMesa,
    },
  })
}


export const atualizarStatusMesa = async (id: number, status: StatusMesa) => {
  return await prisma.mesa.update({
    where: { id },
    data: {
      status,
    },
  })
}

export const limparMesa = async (id: number) => {
  return await prisma.mesa.update({
    where: { id },
    data: {
      status: "disponivel",
      cliente: null,
      horaOcupacao: null,
    },
  })
}


export const listarTodasMesas = async () => {
  const mesas = await prisma.mesa.findMany({
    orderBy: { numeroMesa: "asc" },
  })

  const mesasComReservas = await Promise.all(
    mesas.map(async (mesa) => {
      const reservas = await prisma.reserva.findMany({
        where: { numeroMesa: mesa.numeroMesa },
        orderBy: { dataHora: "asc" },
      })
      return {
        ...mesa,
        reservas,
      }
    })
  )

  return mesasComReservas
}

export const deletarMesaPorId = async (id: number) => {
  return await prisma.mesa.delete({
    where: { id },
  })
}

export const atualizarMesaPorId = async (id: number, dadosAtualizados: any) => {
  return await prisma.mesa.update({
    where: { id },
    data: dadosAtualizados,
  })
}

export const criarNovaMesa = async (
  numeroMesa: number,
  capacidade: number,
  status: StatusMesa,
  cliente?: string,
  horaOcupacao?: Date
) => {
  return await prisma.mesa.create({
    data: {
      numeroMesa,
      capacidade,
      status,
      cliente,
      horaOcupacao,
    },
  })
}
