import express from "express";
//import dotenv from "dotenv";
import router from "./routes/routes";
import { AppDataSource } from "./config/db.datasource";
import cors from "cors";
import path from "path";

//dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
});

app.use("/", router);
app.use("/images", express.static(path.join(__dirname,"images")));

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error);
  });

export default app;
