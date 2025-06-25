import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function conexionMongo() {
  if (process.env.STORAGE !== "mongo") {
    console.log("Mongo desactivado (modo memoria)");
    return;
  }

  try {
    await mongoose.connect("mongodb://localhost:27017/devApp");
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("MongoDB no se pudo conectar. Error:", err);
  }
}
