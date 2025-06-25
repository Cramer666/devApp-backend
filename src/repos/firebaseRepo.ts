import admin from '../config/firebase';
import { IRepository } from "./interfaceRepo";

const db = admin.firestore();

export class FirebaseRepository<T extends { id?: string }> implements IRepository<T> {
  private coleccion;

  constructor(nombreColeccion: string) {
    this.coleccion = db.collection(nombreColeccion);
  }

  async getAll(): Promise<T[]> {
    const snapshot = await this.coleccion.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  }

  async getById(id: string): Promise<T | null> {
    const doc = await this.coleccion.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as T;
  }

  async create(data: T): Promise<T> {
    const { id, ...rest } = data;
    const docRef = await this.coleccion.add(rest);
    return { id: docRef.id, ...rest } as T;
  }

  async update(id: string, data: T): Promise<T> {
    const { id: _, ...rest } = data;
    await this.coleccion.doc(id).update(rest);
    return { id, ...rest } as T;
  }

  async remove(id: string): Promise<void> {
    await this.coleccion.doc(id).delete();
  }
}
