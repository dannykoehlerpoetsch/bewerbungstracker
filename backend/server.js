import express from "express";
import cors from "cors";
import { connectDB } from "./config/connectDb.js";
import applicationRouter from "./routes/applicationRouter.js";
import userRouter from "./routes/userRouter.js";
import pdfRouter from "./routes/pdf.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT;
connectDB();

// Middleware
const allowedOrigins = [
  "https://bewerbungstracker.onrender.com",
  "http://localhost:5173",
];
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Origin is allowed
    } else {
      callback(new Error("Not allowed by CORS")); // Origin is not allowed
    }
  },
  credentials: true, // Notwendig, wenn Cookies mitgesendet werden sollen
};
app.use(cors(corsOptions));
app.use(cookieParser({ credentials: true }));
app.use(express.json());

// API Routes
app.use("/api/bewerbungen", applicationRouter);
app.use("/api/user", userRouter);
app.use("/api/pdf", pdfRouter);

// Server starten
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
