import { listarTodasReservas } from '../repository/reservaRepository';


export const listarReservasService = async () => {
  return await listarTodasReservas();
};
