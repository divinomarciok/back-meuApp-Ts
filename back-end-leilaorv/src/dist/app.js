"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./routes/user.routes");
const db_datasource_1 = require("./config/db.datasource");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
app.use(express_1.default.json());
app.use('/api', user_routes_1.userRoutes);
db_datasource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Banco de dados conectado");
})
    .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error);
});
exports.default = app;
