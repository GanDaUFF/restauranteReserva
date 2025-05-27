import { deletarReservaPorId } from '../repository/reservaRepository';

export const deletarReservaService = async (id: number) => {
  return await deletarReservaPorId(id);
};
