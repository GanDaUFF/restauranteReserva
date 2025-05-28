import { criarNovaReserva, encontrarReservaExistente } from '../../repository/reservaRepository';

export const criarReservaService = async (
  dataHora: string,
  numeroMesa: number,
  quantidade: number,
  nomeResponsavel: string
) => {
  const data = new Date(dataHora);

  const reservaExistente = await encontrarReservaExistente(data, numeroMesa);

  if (reservaExistente) {
    throw new Error('Mesa já reservada neste horário.');
  }

  const novaReserva = await criarNovaReserva(data, numeroMesa, quantidade, nomeResponsavel);
  return novaReserva;
};
