import express from 'express';
import { conexionMongo } from './mongo/mongo';
import {routerPersona} from './routes/personaRoutes';
import {routerAuto} from './routes/autoRoutes';
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

app.use('/personas', routerPersona);
app.use('/autos', routerAuto);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

