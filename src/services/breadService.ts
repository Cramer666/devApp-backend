export function breadService<Entidad extends { id: number }>() {
    const data: Entidad[] = [];
    let darId = 1;
    return {
        getAll: () => data,
        getById: (id: number): Entidad | undefined => data.find((e) => e.id === id),

        add: (newItem: Omit<Entidad, 'id'>): number => {
            const entidad = { id: darId++, ...newItem } as Entidad;
            data.push(entidad);
            return entidad.id;
        },

        updateById: (id: number, newData: Partial<Omit<Entidad, 'id'>>): Entidad | null | false => {
            const posicion = data.findIndex((e) => e.id === id);
            if (posicion === -1) return null;
            const entidadActualizada = { ...data[posicion], ...newData };
            data[posicion] = entidadActualizada;
            return entidadActualizada;
        },
        deleteById: (id: number): boolean => {
            const posicion = data.findIndex((e) => e.id === id);
            if (posicion === -1) return false;
            data.splice(posicion, 1);
            return true;
        },
    };
}
