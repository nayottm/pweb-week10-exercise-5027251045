import express, { type ErrorRequestHandler } from "express";
import { requestLogger } from "./middleware/request-logger.js";
import alatSinematografiRouter from "./routes/alat-sinematografi.routes.js";

const app = express();

// Built-in middleware untuk membaca request body berformat JSON.
app.use(express.json());

// Custom middleware dijalankan sebelum request masuk ke route.
app.use(requestLogger);

// Menyajikan halaman HTML, CSS, dan JavaScript dari folder public.
app.use(express.static("public"));

app.use("/alat-sinematografi", alatSinematografiRouter);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error("Request gagal:", error);
  res.status(500).json({ message: "Terjadi kesalahan pada server. Periksa terminal untuk detail." });
};

app.use(errorHandler);

export default app;
