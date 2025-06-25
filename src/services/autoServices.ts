import { Auto } from "../models/auto";
import { Persona } from "../models/persona";
import { IRepository } from "../repos/interfaceRepo";

export class AutoService {
  constructor(
    private autoRepository: IRepository<Auto>,
    private personaRepository: IRepository<Persona>
  ) {}

  getAll(): Promise<Auto[]> {
    return this.autoRepository.getAll();
  }

  getById(id: string): Promise<Auto | null> {
    return this.autoRepository.getById(id);
  }

  create(auto: Auto): Promise<Auto> {
    return this.autoRepository.create(auto);
  }

  update(id: string, data: Partial<Auto>): Promise<Auto | null> {
    return this.autoRepository.update(id, data);
  }

  remove(id: string): Promise<void> {
    return this.autoRepository.remove(id);
  }

  //Metodos propios
  async browse(): Promise<Partial<Auto>[]> {
    const autos = await this.autoRepository.getAll();
    return autos.map(({ marca, modelo, anio, patente }) => ({
      marca,
      modelo,
      anio,
      patente
    }));
  }


  async listarDuenios(idAuto: string): Promise<{ nombre: string; apellido: string } | null> {
    const auto = await this.autoRepository.getById(idAuto);
    if (!auto || !auto.duenioId) return null;

    const persona = await this.personaRepository.getById(auto.duenioId);
    return persona
      ? { nombre: persona.nombre, apellido: persona.apellido }
      : null;
  }
}
