import { buscarReservasPorPeriodo } from "../../repository/relatoriosRepository"

export const relatorioReservasPeriodoService = async (dataInicio: Date, dataFim: Date, status?: string) => {
  const reservas = await buscarReservasPorPeriodo(dataInicio, dataFim, status)

  const totalReservas = reservas.length
  const reservasAtendidas = reservas.filter((r) => r.status === "CONCLUIDA").length
  const reservasNaoAtendidas = reservas.filter((r) => r.status === "CANCELADA" ).length
  const reservasPendentes = reservas.filter((r) => r.status === "PENDENTE").length
  const reservasConfirmadas = reservas.filter((r) => r.status === "CONFIRMADA").length

  return {
    periodo: {
      dataInicio,
      dataFim,
    },
    resumo: {
      totalReservas,
      reservasAtendidas,
      reservasNaoAtendidas,
      reservasPendentes,
      reservasConfirmadas,
    },
    reservas: reservas.map((reserva) => ({
      id: reserva.id,
      dataHora: reserva.dataHora,
      numeroMesa: reserva.numeroMesa,
      nomeResponsavel: reserva.nomeResponsavel,
      telefone: reserva.telefone,
      quantidade: reserva.quantidade,
      status: reserva.status,
      confirmadoPor: reserva.confirmadoPor,
      criadoEm: reserva.criadoEm,
    })),
  }
}
