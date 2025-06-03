import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/entidadesApp';

export async function conexionMongo() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('MongoDB no se pudo conectar. Error:', error);
        process.exit(1);
    }
}

export async function disconnectDB() {
    await mongoose.disconnect();
}
