import { buscarReservasPorGarcom } from "../../repository/relatoriosRepository"

export const relatorioReservasGarcomService = async (dataInicio?: Date, dataFim?: Date) => {
  const reservas = await buscarReservasPorGarcom(dataInicio, dataFim)
console.log(reservas)
  // Agrupar por garçom
  const reservasPorGarcom = reservas.reduce(
    (acc, reserva) => {
      const garcom = reserva.confirmadoPor || "Não confirmado"
      if (!acc[garcom]) {
        acc[garcom] = []
      }
      acc[garcom].push(reserva)
      return acc
    },
    {} as Record<string, any[]>,
  )

  const relatorio = Object.entries(reservasPorGarcom).map(([garcom, reservasGarcom]) => ({
    garcom,
    totalConfirmadas: reservasGarcom.length,
    reservas: reservasGarcom.map((reserva) => ({
      id: reserva.id,
      dataHora: reserva.dataHora,
      numeroMesa: reserva.numeroMesa,
      nomeResponsavel: reserva.nomeResponsavel,
      telefone: reserva.telefone,
      quantidade: reserva.quantidade,
      status: reserva.status,
      criadoEm: reserva.criadoEm,
    })),
  }))

  return {
    periodo: dataInicio && dataFim ? { dataInicio, dataFim } : null,
    totalGarcons: relatorio.length,
    totalReservasConfirmadas: reservas.length,
    relatorio,
  }
}
