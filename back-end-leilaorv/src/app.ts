import express from "express";
import cors from "cors";
import path from "path";
import { AppDataSource } from "./config/db.datasource";
import { authRoutes } from "./routes/login.route";
import { userRoutes } from './routes/user.routes';
import { productRoutes } from "./routes/product.routes";
import { categoryRoutes } from "./routes/category.routes";
import { enterpriseRoutes } from "./routes/enterprise.routes";
import { priceListRoutes } from "./routes/pricelist.routes";

const app = express();
app.use(cors());

//app.use("/uploads", express.static(path.join(__dirname,"uploads")));

app.use("/uploads", express.static("D:\\Divino\\Software\\Meu App\\Código\\back-end-leilao\\back-end-leilaorv\\uploads")); // Substitua com o caminho real

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', enterpriseRoutes);
app.use('/api', priceListRoutes);

app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} ${req.url}`);
  next();
});

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error);
  });

export default app;