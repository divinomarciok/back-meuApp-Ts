import express from "express";
import { AppDataSource } from "./config/db.datasource";
import cors from "cors";
import { authRoutes } from "./routes/login.route";
import { userRoutes } from './routes/user.routes';
import { productRoutes } from "./routes/product.routes";
import { categoryRoutes } from "./routes/category.routes";
import { enterpriseRoutes } from "./routes/enterprise.routes";



const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
});


/*
app.use("/api",routesProduct);

app.use("/", router);
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

app.get("/", (req, res) => {
  res.send("API funcionando!");
});
*/

// src/app.ts ou index.ts


app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', enterpriseRoutes)


export { app };

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error);
  });

export default app;
