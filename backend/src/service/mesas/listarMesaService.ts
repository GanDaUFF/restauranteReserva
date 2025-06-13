import { listarTodasMesas } from '../../repository/mesasRepository'

export const listarMesasService = async () => {
  return await listarTodasMesas()
}
