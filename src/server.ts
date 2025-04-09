// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import { personas } from './repositories/lista';
import { findPersonaById, dataBasic, editById, addEntity, deleteByID } from './services/const';
import { error } from 'console';

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Mis endpoints van acá ponele...
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
    const resultado = dataBasic();
    console.log(req);
    res.json(resultado);
});

app.get('/read/:id', (req, res) => {
    const { id } = req.params;
    const personasById = findPersonaById(Number(id));
    if (!personasById) {
        res.status(404).json({ error: 'La persona que buscas no existe, 404 bro!' });
    } else {
        res.json(personasById);
    }
});

app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const infoPersona = req.body;
    const personaActualizada = editById(Number(id), infoPersona);
    if (personaActualizada === false) {
        res.status(400).json({ error: 'Argumentos incorrectos' });
    } else if (personaActualizada === null) {
        res.status(404).json({ error: 'El ID es incorrecto o no se encuentra' });
    } else {
        res.status(201).json(personaActualizada);
    }
});

app.post('/add', (req, res) => {
    const infoEntidad = req.body;
    if (addEntity === error){
     res.status(400).json({ error: 'Los datos enviados son incorrectos o incompletos' });
    }

    const nuevoId = addEntity(infoEntidad);
    res.status(200).json({ id: nuevoId });


});

app.delete('/delete/:id',(req, res) => {
    const { id } = req.params;
    const fueEliminada = deleteByID(Number(id));

    if(fueEliminada === false){
        res.status(404).json({error: 'ID incorrecto'})
    }else{
        res.status(201).json('Persona eliminada correctamente');
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


