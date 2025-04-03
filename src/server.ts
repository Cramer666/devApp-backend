// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import { personas } from './interfaces/lista';

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

app.get('/browse', (req, res) => {
    const resultado = personas.map((persona) => ({
        DNI: persona.DNI,
        nombre: persona.nombre,
        apellido: persona.apellido,
    }));
    console.log(req);
    res.json(resultado);
});

app.get('/read/:id', (req, res) => {
    const { id } = req.params;
    const personaList = personas.find((p) => p.id == Number(id));
    if (!personaList) {
        res.status(404).json({ error: 'La persona que buscas no existe, 404 bro!' });
    } else {
        res.json(personaList);
    }
});

app.post('/login', (req, res) => {
    console.log(req.body);
    res.json('Login Ok');
});

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
