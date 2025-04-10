import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import entityRoutes from './routes/entityRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use('/', entityRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
