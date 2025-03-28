// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import personas from './interfaces/lista';

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Mis endpoints van acá
// ...
app.get('/', (req, res) => {
    console.log(req);
    res.json('Hello word');
});

app.get('/personas', (req, res) => {
    console.log(req);
    res.json(personas);
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.json('Login Ok');
});

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
