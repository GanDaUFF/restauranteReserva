import { buscarReservasPorMesa } from "../../repository/relatoriosRepository"

export const relatorioReservasMesaService = async (numeroMesa: number, dataInicio?: Date, dataFim?: Date) => {
  const reservas = await buscarReservasPorMesa(numeroMesa, dataInicio, dataFim)

  const totalReservas = reservas.length
  const reservasAtendidas = reservas.filter((r) => r.status === "CONCLUIDA").length
  const reservasCanceladas = reservas.filter((r) => r.status === "CANCELADA").length

  return {
    mesa: numeroMesa,
    periodo: dataInicio && dataFim ? { dataInicio, dataFim } : null,
    resumo: {
      totalReservas,
      reservasAtendidas,
      reservasCanceladas,
      taxaAtendimento: totalReservas > 0 ? ((reservasAtendidas / totalReservas) * 100).toFixed(2) : "0",
    },
    reservas: reservas.map((reserva) => ({
      id: reserva.id,
      dataHora: reserva.dataHora,
      nomeResponsavel: reserva.nomeResponsavel,
      telefone: reserva.telefone,
      quantidade: reserva.quantidade,
      status: reserva.status,
      confirmadoPor: reserva.confirmadoPor,
      criadoEm: reserva.criadoEm,
    })),
  }
}
