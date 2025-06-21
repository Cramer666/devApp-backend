import express from 'express';
import 'express-async-errors';
import { conexionMongo } from './mongo/mongo';
import { routerPersona } from './routes/personaRoutes';
import { routerAuto } from './routes/autoRoutes';
import { manejarErrores } from './middlewares/validaciones';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const initializeServer = async () => {
  const storageType = process.env.STORAGE || 'memoria';
  console.log(`Backend corriendo con almacenamiento: ${storageType.toUpperCase()}`);

  if (storageType === "mongo") {
    try {
      await conexionMongo();
      console.log('Conexión a MongoDB establecida');
    } catch (error) {
      console.error('Error conectando a MongoDB:', error);
      process.exit(1);
    }
  }

  app.use('/personas', routerPersona);
  app.use('/autos', routerAuto);

  app.use(manejarErrores);

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
};

initializeServer().catch(error => {
  console.error(' Error al iniciar el servidor:', error);
  process.exit(1);
});
