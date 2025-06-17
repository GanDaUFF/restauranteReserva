import { atualizarReservaPorId } from '../../repository/reservaRepository';

export const atualizarReservaService = async (id: number, dados: any) => {
  const atualizacao = {
    ...dados,
  };
  // Se for uma confirmação, marca como CONFIRMADA
  if (dados.confirmadoPor) {
    atualizacao.status = 'CONFIRMADA';
  }

  return await atualizarReservaPorId(id, atualizacao);
};
