"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import dotenv from "dotenv";
const routes_1 = __importDefault(require("./routes/routes"));
const db_datasource_1 = require("./config/db.datasource");
const cors_1 = __importDefault(require("cors"));
//dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(`[LOG] ${req.method} ${req.url}`);
    next();
});
app.use("/", routes_1.default);
app.get("/", (req, res) => {
    res.send("API funcionando!");
});
db_datasource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Banco de dados conectado");
})
    .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error);
});
exports.default = app;
