import { createServer } from 'http';
import app from './server';
import { Server } from 'socket.io';
import { iniciarMonitoramentoReservas } from './jobs/verificarReservasJob';

const PORT = process.env.PORT || 3030;

const server = createServer(app)
const io = new Server(server, {
  cors: { origin: "*" }, // ajuste para seu frontend se necessário
})

iniciarMonitoramentoReservas()
// Em algum lugar acessível globalmente
export const ioServer = io
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
