import { Document, FilterQuery, Model } from "mongoose";

export class ServiceGenerico<D extends Document, Q extends FilterQuery<D>> {
  private modelo: Model<D>;

  constructor(modelo: Model<D>) {
    this.modelo = modelo;
  }

  getAll(query: Q): Promise<D[]> {
    return this.modelo.find(query).exec();
  }

  getById(id: string): Promise<D | null> {
    return this.modelo.findById(id).exec();
  }

  create(data: Partial<D>): Promise<D> {
    return this.modelo.create(data);
  }

  update(id: string, data: Partial<D>): Promise<D | null> {
    return this.modelo.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  delete(id: string): Promise<D | null> {
    return this.modelo.findByIdAndDelete(id).exec();
  }
}
