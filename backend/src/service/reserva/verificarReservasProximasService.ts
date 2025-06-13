import { buscarReservasProximas } from "../../repository/reservaRepository"
import { atualizarStatusMesa } from "../../repository/mesasRepository"

export const verificarReservasProximasService = async () => {
  const agora = new Date()
  const reservas = await buscarReservasProximas(agora, 30)

  for (const reserva of reservas) {
    if (reserva.mesa?.status !== "reservada" && reserva.numeroMesa) {
      await atualizarStatusMesa(reserva.numeroMesa, "reservada")
    }
  }

  return reservas.length
}
