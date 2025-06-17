import { ioServer } from ".."
import prisma from "../prisma"

export const iniciarMonitoramentoReservas = () => {
  setInterval(async () => {
    const agora = new Date()
    const reservasAtivas = await prisma.reserva.findMany({
      where: {
        status: "ATIVA",
      },
    })
    
    // 1. Buscar reservas PENDENTES próximas (30min antes)
    const reservasProximas = await prisma.reserva.findMany({
      where: {
        status: "PENDENTE",
        dataHora: {
          gte: new Date(agora.getTime() + 1000 * 60 * -1), // tolerância de 1 minuto
          lte: new Date(agora.getTime() + 30 * 60 * 1000), // até 30min
        },
      },
    })
    
    for (const reserva of reservasAtivas) {
      try {
        await prisma.mesa.update({
          where: { id: reserva.numeroMesa }, // ou outro campo correto
          data: { status: "reservada" },
        })
       
      } catch (err) {
        console.warn(`⚠️ Erro ao atualizar mesa da reserva ${reserva.id}:`, err)
      }
    }
    
   for (const reserva of reservasProximas) {
  const mesa = await prisma.mesa.findUnique({
    where: { id: reserva.numeroMesa },
  })

  if (mesa?.status !== "disponivel") {
    console.log(`❌ Reserva ${reserva.id} não ativada — mesa ${reserva.numeroMesa} está ocupada.`)
    continue
  }

  const [reservaAtualizada, mesaAtualizada] = await prisma.$transaction([
    prisma.reserva.update({
      where: { id: reserva.id },
      data: { status: "ATIVA" },
    }),
    prisma.mesa.update({
      where: { id: reserva.numeroMesa },
      data: { status: "reservada" },
    }),
  ])

  console.log(`🚀 Reserva ${reserva.id} ativada e mesa ${reserva.numeroMesa} marcada como reservada.`)
  ioServer.emit("reservaAtivada", { numeroMesa: reserva.numeroMesa })
}

    const reservasExpiradas = await prisma.reserva.findMany({
      where: {
        status: "ATIVA",
        dataHora: {
          lte: new Date(Date.now() - 60 * 60 * 1000), // há mais de 1h
        },
      },
      include: {
        mesa: true,
      },
    })
    
    for (const reserva of reservasExpiradas) {
      if (reserva.mesa?.status === "reservada") {
        await prisma.$transaction([
          prisma.reserva.update({
            where: { id: reserva.id },
            data: { status: "CANCELADA" },
          }),
          prisma.mesa.update({
            where: { id: reserva.mesa.id },
            data: {
              status: "disponivel",
              cliente: null,
              horaOcupacao: null,
            },
          }),
        ])
    
        console.log(`🕒 Reserva ${reserva.id} cancelada por expiração e mesa ${reserva.mesa.numeroMesa} liberada.`)
        ioServer.emit("reservaCanceladaPorTempo", { numeroMesa: reserva.mesa.numeroMesa })
      } else {
        console.log(`⏭️ Reserva ${reserva.id} expirada, mas mesa ${reserva.mesa?.id} já não estava reservada.`)
      }
    }
    

    // 2. Cancelar reservas atrasadas (sem ação por 1h após dataHora)
    const reservasAtrasadas = await prisma.reserva.findMany({
      where: {
        status: "PENDENTE",
        dataHora: {
          lte: new Date(agora.getTime() - 60 * 60 * 1000), // passou 1h do horário
        },
      },
    })

    for (const reserva of reservasAtrasadas) {
      await prisma.reserva.update({
        where: { id: reserva.id },
        data: { status: "CANCELADA" },
      })
      console.log(`❌ Reserva ${reserva.id} cancelada por inatividade.`)

      ioServer.emit("reservaCancelada", { numeroMesa: reserva.numeroMesa })
    }
  }, 10 * 1000) // a cada minuto
}
