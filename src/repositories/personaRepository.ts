import { Persona } from '../models/persona';
import { breadService } from '../services/breadService';

export const personaRepository = breadService<Persona>();
