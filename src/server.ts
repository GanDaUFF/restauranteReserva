import express from 'express';
import cors from 'cors';
import reservaRoutes from './routes/reservaRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(reservaRoutes); // pode adicionar mais rotas aqui no futuro

export default app;
