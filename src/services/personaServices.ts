import { PersonaModel } from '../models/persona';
import { PersonaDto } from '../dtos/personaDto';
import { Persona } from '../models/persona';

export class PersonaService {
  async getAll(): Promise<Persona[]> {
    return await PersonaModel.find().populate("vehiculo");
  }

  async getById(id: string): Promise<Persona | null> {
    return await PersonaModel.findById(id).populate("vehiculo");
  }

  async delete(id: string): Promise<Persona | null> {
    return await PersonaModel.findByIdAndDelete(id);
  }

  async create(data: Partial<Persona>) {
    const personaModelo = new PersonaModel(data);
    return await personaModelo.save();
  }

  async update(id: string, datos: Partial<PersonaDto>): Promise<Persona | null> {
    return await PersonaModel.findByIdAndUpdate(id, datos, { new: true }).populate("vehiculo");
  }

  async findByDni(dni: string): Promise<Persona | null> {
    return await PersonaModel.findOne({ DNI: dni });
  }
}
