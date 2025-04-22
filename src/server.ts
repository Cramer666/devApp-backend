import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import router from './routes/indexRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
