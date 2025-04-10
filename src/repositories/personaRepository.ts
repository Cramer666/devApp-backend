import { Persona } from '../models/persona';
import { breadService } from '../services/breadService';

export const personaReposiyory = breadService<Persona>();
