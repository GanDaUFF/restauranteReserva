import { atualizarMesaPorId } from "../../repository/mesasRepository"
import { concluirReservaAtivaPorMesa } from "../../repository/reservaRepository" // novo arquivo ou onde for colocar

export const atualizarMesaService = async (id: number, dados: any) => {
  const dadosAtualizados = {
    ...dados,
  }

  const mesaAtualizada = await atualizarMesaPorId(id, dadosAtualizados)

  if (dados.status === "disponivel") {
    await concluirReservaAtivaPorMesa(id)
  }

  return mesaAtualizada
}
