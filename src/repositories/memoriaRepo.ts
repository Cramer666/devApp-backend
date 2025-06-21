import { IRepository } from "./interfaceRepo";
import { v4 as uuidv4 } from "uuid";

export class InMemoryRepository<T extends { id?: string }> implements IRepository<T> {
  private items: T[] = [];

  async getAll(): Promise<T[]> {
    return this.items;
  }

  async getById(id: string): Promise<T | null> {
    return this.items.find(item => item.id === id) || null;
  }

  async create(item: T): Promise<T> {
    item.id = uuidv4();
    this.items.push(item);
    return item;
  }

 /* async browse?(filtros: any):Promise<T[]>{
    return Promise.resolve(this.items.filter(item => {
      return Object.entries(filtros).every(([Key,value]) => item[Key]== value);
  }))
  }*///ACOMODAR!!

  async update(id: string, item: Partial<T>): Promise<T | null> {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return null;
    this.items[index] = { ...this.items[index], ...item };
    return this.items[index];
  }

  async remove(id: string): Promise<void> {
    this.items = this.items.filter(i => i.id !== id);
  }
}
