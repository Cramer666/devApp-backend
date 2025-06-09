import mongoose, { Schema, Document } from 'mongoose';

export interface Auto extends Document {
    _id:string;
    marca: string;
    modelo: string;
    anio: number;
    patente: string;
    color: string;
    nroDeChasis: string;
    motor: string;
    duenioId: string | null;

}



const AutoSchema = new Schema<Auto>({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    anio: { type: Number, required: true },
    patente: { type: String, required: true },
    nroDeChasis: { type: String, required: true },
    motor: { type: String, required: true },
    duenioId: { type: Schema.Types.ObjectId, ref: 'Usuario', default: null },

});



export const AutoModel = mongoose.model<Auto>('Auto', AutoSchema);

