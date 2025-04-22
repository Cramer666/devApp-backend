import { Persona } from '../models/persona';
//import { breadService } from '../services/breadService';
import { generalRepository } from './generalRepository';

export class PersonaRepository extends generalRepository<Persona> {
    //Segun el enunciado este debe ser particular para cada entidad.
    browse() {
        return this.data.map(({ id, nombre, apellido }) => ({ id, nombre, apellido }));
    }
}
