/*Idea by Eze, me ayudo a hacer todo mas generico...*/

export interface ServicioGenerico {
  getAll(): Promise<any[]>;
  getById(id: string): Promise<any>;
  create(data: any): Promise<any>;
  remove(id: string): Promise<void>;
  update(id: string, data: any): Promise<any>;
  browse(query?: any): Promise<any[]>;
}

