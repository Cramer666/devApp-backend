import mongoose, { Schema, Document, InferSchemaType } from 'mongoose';

export interface Auto extends Document {
    id:string;
    marca: string;
    modelo: string;
    anio: number;
    patente: string;
    color: string;
    nroDeChasis: string;
    motor: string;
    duenioId: string | null;

}

/*hago modelos para el mongo*/
const AutoSchema = new Schema<Auto>({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    anio: { type: Number, required: true },
    patente: { type: String, required: true },
    color: { type: String, required: true},
    nroDeChasis: { type: String, required: true },
    motor: { type: String, required: true },
    duenioId: { type: Schema.Types.ObjectId, ref: 'persona', default: null },

});


export type auto = InferSchemaType<typeof AutoSchema>;
export const AutoModel = mongoose.model<Auto>('auto', AutoSchema);

