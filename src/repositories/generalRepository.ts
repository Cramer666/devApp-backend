import { index } from '../models';

export abstract class generalRepository<T extends index> {
    protected data: T[] = [];

    protected abstract exists(item: Omit<T, 'id'>): boolean;

    getAll(): T[] {
        return [...this.data];
    }

    getById(id: string): T | undefined {
        return this.data.find((item) => item.id === id);
    }

    create(item: Omit<T, 'id'>): T | { error: string } {
        if (this.exists(item)) {
            return { error: 'Ya existe un registro con estos datos' };
        }

        const newItem = {
            ...item,
            id: this.generateId(),
        } as T;

        this.data.push(newItem);
        return newItem;
    }

    update(id: string, updates: Partial<T>): T | undefined {
        const index = this.data.findIndex((item) => item.id === id);
        if (index === -1) return undefined;

        const potentialDuplicate = { ...this.data[index], ...updates };
        if (this.exists(potentialDuplicate as Omit<T, 'id'>)) {
            throw new Error('No se puede actualizar: ya existe un registro con estos datos');
        }

        const updatedItem = {
            ...this.data[index],
            ...updates,
        };

        this.data[index] = updatedItem;
        return updatedItem;
    }

    delete(id: string): boolean {
        const initialLength = this.data.length;
        this.data = this.data.filter((item) => item.id !== id);
        return this.data.length !== initialLength;
    }

    // Generador de IDs by S.O
    private generateId(): string {
        return Math.random().toString(36).substring(2, 11);
    }
}
