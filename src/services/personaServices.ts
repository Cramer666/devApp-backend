import { Persona } from "../models/persona";
import { Auto } from "../models/auto";
import { IRepository } from "../repos/interfaceRepo";

export class PersonaService {
  constructor(
    private personaRepository: IRepository<Persona>,
    private autoRepository: IRepository<Auto>
  ) {}

  getAll(): Promise<Persona[]> {
    return this.personaRepository.getAll();
  }

  getById(id: string): Promise<Persona | null> {
    return this.personaRepository.getById(id);
  }

  create(persona: Persona): Promise<Persona> {
    return this.personaRepository.create(persona);
  }

  update(id: string, data: Partial<Persona>): Promise<Persona | null> {
    return this.personaRepository.update(id, data);
  }

async remove(id: string): Promise<void> {
  const autos = await this.autoRepository.getAll();
  const autosDeLaPersona = autos.filter(auto => auto.duenioId === id);

  for (const auto of autosDeLaPersona) {
    if (auto.id) {
      await this.autoRepository.remove(auto.id);
    }
  }
  await this.personaRepository.remove(id);
}


  //Metodos propios
  async browse(): Promise<Partial<Persona>[]> {
    const personas = await this.personaRepository.getAll();
    return personas.map(({ dni, nombre, apellido }) => ({
      dni,
      nombre,
      apellido
    }));
  }

  async listarAutosPorPersona(personaId: string): Promise<Partial<Auto>[]> {
    const autos = await this.autoRepository.getAll();
    return autos
      .filter(auto => auto.duenioId === personaId)
      .map(({ marca, modelo, anio, patente }) => ({
        marca,
        modelo,
        anio,
        patente
      }));
  }
}
