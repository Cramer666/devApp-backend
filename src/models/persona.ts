import mongoose, { InferSchemaType, Schema } from 'mongoose';
import { Genero } from './generoEnum';

export interface Persona {
  _id: string;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: Date;
  donante?: boolean;
  genero?: Genero;
  vehiculo?: {
    marca: string;
    modelo: string;
    patente: string;
  }[];
}

/*hago modelos para el mongo*/
const VehiculoSchema = new Schema({
  marca: String,
  modelo: String,
  patente: String
});

const PersonaSchema = new Schema<Persona>({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: false, unique: false},
  donante: { type: Boolean, default: false },
  genero: { type: String, enum: ["Masculino", "Femenino", "No-Binario"] },
  vehiculo: [VehiculoSchema]
});
export type persona = InferSchemaType<typeof PersonaSchema>;
export const PersonaModel = mongoose.model<Persona>('persona', PersonaSchema);
