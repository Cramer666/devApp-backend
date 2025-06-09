import express from 'express';
import { conexionMongo } from './mongo/mongo';
import personaRoutes from './routes/personaRoutes';
import autoRoutes from './routes/autoRoutes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

conexionMongo();

app.use('/personas', personaRoutes);
app.use('/autos', autoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

