import express from 'express';
import cors from 'cors';
import reservaRoutes from './routes/reservaRouter';
import authRoutes from './routes/authRouter';
import mesasRoutes from './routes/mesasRouter';
import relatoriosRouter from './routes/relatoriosRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(reservaRoutes);
app.use(authRoutes);
app.use(mesasRoutes);
app.use("/api/relatorios", relatoriosRouter)

export default app;
