import "dotenv/config";
import express, { type Request, type Response } from "express";
import { connection } from "./src/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./routes.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(router);

const PORT = process.env.PORT || 3000;

connection().then(() => {
  app.listen(PORT, () => {
    console.log("Servidor rodando com sucesso na porta " + PORT);
  });
});
