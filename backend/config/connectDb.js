import mongoose from "mongoose";

// MongoDB Fehler-handling
mongoose.connection.on("error", () => {
  console.log("Fehler über einer aktiven Datenbankverbindung");
});

// MongoDB Verbindung
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DATABASE,
    });
    console.log("MongoDb verbunden");
  } catch (error) {
    console.log("Datenbank Verbindungsfehler", error);
    process.exit(1);
  }
};
