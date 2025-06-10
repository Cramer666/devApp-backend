export function crearServicioGenerico(Modelo: any, opciones?: {
  pasarADto?: (entidad: any) => any,
  pasarAModelo?: (dto: any) => any
}) {
  return {
    getAll: async () => {
      const entidades = await Modelo.find();
      return opciones?.pasarADto
        ? entidades.map(opciones.pasarADto)
        : entidades;
    },
    getById: async (id: string) => {
      const entidad = await Modelo.findById(id);
      return opciones?.pasarADto ? opciones.pasarADto(entidad) : entidad;
    },
    add: async (data: any) => {
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
      // findByIdAndUpdate devuelve el documento antes onele de la actualizacion...
      const actualizado = await Modelo.findByIdAndUpdate(id, data, { new: true });
      return opciones?.pasarADto ? opciones.pasarADto(actualizado) : actualizado;
    }
  };
}

