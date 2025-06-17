import { StatusMesa } from "@prisma/client"
import { criarNovaMesa, encontrarMesaPorNumero } from "../../repository/mesasRepository"

export const criarMesaService = async (
  numeroMesa: number,
  capacidade: number,
  status: StatusMesa,
  cliente?: string,
  horaOcupacao?: Date,
  reservaId?: number
) => {
  const mesaExistente = await encontrarMesaPorNumero(numeroMesa)

  if (mesaExistente) {
    throw new Error("Já existe uma mesa com esse número.")
  }

  const novaMesa = await criarNovaMesa(numeroMesa, capacidade, status, cliente, horaOcupacao)

  return novaMesa
}
