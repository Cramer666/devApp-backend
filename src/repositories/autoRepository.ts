import { Auto } from '../models/auto';
import { breadService } from '../services/breadService';

export const autoRepository = breadService<Auto>();
