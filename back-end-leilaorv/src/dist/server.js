"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
console.log("[LOG] Servidor iniciado");
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
