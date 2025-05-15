"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_datasource_1 = require("./config/db.datasource");
const login_route_1 = require("./routes/login.route");
const user_routes_1 = require("./routes/user.routes");
const product_routes_1 = require("./routes/product.routes");
const category_routes_1 = require("./routes/category.routes");
const enterprise_routes_1 = require("./routes/enterprise.routes");
const pricelist_routes_1 = require("./routes/pricelist.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//app.use("/uploads", express.static(path.join(__dirname,"uploads")));
app.use("/uploads", express_1.default.static("D:\\Divino\\Software\\Meu App\\Código\\back-end-leilao\\back-end-leilaorv\\uploads")); // Substitua com o caminho real
app.use(express_1.default.json());
app.use('/api', user_routes_1.userRoutes);
app.use('/api', login_route_1.authRoutes);
app.use('/api', product_routes_1.productRoutes);
app.use('/api', category_routes_1.categoryRoutes);
app.use('/api', enterprise_routes_1.enterpriseRoutes);
app.use('/api', pricelist_routes_1.priceListRoutes);
app.use((req, res, next) => {
    console.log(`[LOG] ${req.method} ${req.url}`);
    next();
});
db_datasource_1.AppDataSource.initialize()
    .then(() => {
    console.log("Banco de dados conectado");
})
    .catch((error) => {
    console.error("Erro ao conectar no banco de dados:", error);
});
exports.default = app;
