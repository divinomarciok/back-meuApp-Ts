import app from "./app";

console.log("[LOG] Servidor iniciado");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
