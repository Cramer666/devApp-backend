import { IRepository } from "../repositories/interfaceRepo";
import { IService } from "./IService";


export class ServicioGenerico<T> implements IService {
  private readonly repo: IRepository<T>;

  constructor(repo: IRepository<T>) {
    this.repo = repo;
  }

  async getAll(): Promise<T[]> {
    return await this.repo.getAll();
  }

  async getById(id: string): Promise<T | null> {
    return await this.repo.getById(id);
  }

  async create(data: T): Promise<T> {
    return await this.repo.create(data);
  }

  async remove(id: string): Promise<void> {
    await this.repo.remove(id);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.repo.update(id, data);
  }

  async browse(query?: any): Promise<T[]> {
    if (!this.repo.browse) {
      throw new Error("No implementado en el repositorio");
    }
    return await this.repo.browse(query);
  }
}

