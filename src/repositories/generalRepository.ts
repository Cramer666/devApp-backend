import { index } from '../models';

export abstract class generalRepository<T extends index> {
    protected data: T[] = [];

    getAll(): T[] {
        return [...this.data];
    }

    getById(id: string): T | undefined {
        return this.data.find((item) => item.id === id);
    }

    create(item: Omit<T, 'id'>): T {
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

        const updatedItem = {
            ...this.data[index],
            ...updates, // Aplica las actualizaciones
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
