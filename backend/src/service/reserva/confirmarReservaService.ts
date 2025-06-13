import { confirmarReservaPorId } from "../../repository/reservaRepository"
import { limparMesa } from "../../repository/mesasRepository"

export const confirmarReservaService = async (reservaId: number, garcom: string) => {
  const reserva = await confirmarReservaPorId(reservaId, garcom)
  if(reserva.numeroMesa)
  await limparMesa(reserva.numeroMesa)
  return reserva
}
