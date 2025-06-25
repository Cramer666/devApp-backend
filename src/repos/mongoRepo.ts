import { IRepository } from "./interfaceRepo";
import { Model } from "mongoose";

export class MongoRepository<T> implements IRepository<T> {
  constructor(private model: Model<T>) {}

  async getAll(): Promise<T[]> {
    return this.model.find();
  }

  async getById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async create(item: T): Promise<T> {
    return this.model.create(item);
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, item, { new: true });
  }

  async remove(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
