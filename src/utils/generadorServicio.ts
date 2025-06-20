export function crearServicioGenerico(
  Modelo: any,
  opciones?: {
    pasarADto?: (entidad: any) => any;
    pasarAModelo?: (dto: any) => any;
    browse?: (filtros: any) => Promise<any>;
  }
) {

  if (process.env.STORAGE === "memoria" && typeof Modelo !== 'function') {
    return crearServicioEnMemoria(opciones);
  }

  //para mongo
  return {
    getAll: async () => {
      const entidades = await Modelo.find();
      return opciones?.pasarADto
        ? entidades.map(opciones.pasarADto)
        : entidades;
    },

    browse: async (filtros: any) => {
      if (!opciones?.browse) {
        throw new Error("browse no implementado");
      }
      const resultado = await opciones.browse(filtros);
      return opciones?.pasarADto
        ? Array.isArray(resultado)
          ? resultado.map(opciones.pasarADto)
          : opciones.pasarADto(resultado)
        : resultado;
    },

    getById: async (id: string) => {
      const entidad = await Modelo.findById(id);
      return opciones?.pasarADto ? opciones.pasarADto(entidad) : entidad;
    },

    create: async (data: any) => {
      const modelo = opciones?.pasarAModelo
        ? opciones.pasarAModelo(data)
        : new Modelo(data);
      const guardado = await modelo.save();
      return opciones?.pasarADto ? opciones.pasarADto(guardado) : guardado;
    },

    remove: async (id: string) => {
      await Modelo.findByIdAndDelete(id);
    },

    update: async (id: string, data: any) => {
      const actualizado = await Modelo.findByIdAndUpdate(id, data, { new: true });
      return opciones?.pasarADto ? opciones.pasarADto(actualizado) : actualizado;
    }
  };
}

// para memoria
function crearServicioEnMemoria(opciones?: {
  pasarADto?: (entidad: any) => any;
  pasarAModelo?: (dto: any) => any;
}) {
  const items: any[] = [];
  let currentId = 1;

  return {
    getAll: async () => {
      return opciones?.pasarADto
        ? items.map(opciones.pasarADto)
        : items;
    },

    browse: async () => {
      throw new Error("browse no implementado para memoria");
    },

    getById: async (id: string) => {
      const item = items.find(i => i.id === id);
      return opciones?.pasarADto && item
        ? opciones.pasarADto(item)
        : item;
    },

    create: async (data: any) => {
      const newItem = {
        ...(opciones?.pasarAModelo ? opciones.pasarAModelo(data) : data),
        id: (currentId++).toString()
      };
      items.push(newItem);
      return opciones?.pasarADto
        ? opciones.pasarADto(newItem)
        : newItem;
    },

    remove: async (id: string) => {
      const index = items.findIndex(i => i.id === id);
      if (index !== -1) {
        items.splice(index, 1);
      }
    },

    update: async (id: string, data: any) => {
      const index = items.findIndex(i => i.id === id);
      if (index === -1) return null;

      const updatedItem = {
        ...items[index],
        ...(opciones?.pasarAModelo ? opciones.pasarAModelo(data) : data),
        id // Mantener el mismo ID
      };

      items[index] = updatedItem;
      return opciones?.pasarADto
        ? opciones.pasarADto(updatedItem)
        : updatedItem;
    }
  };
}