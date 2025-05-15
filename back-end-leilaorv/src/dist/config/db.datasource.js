"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const enterprise_1 = require("../models/enterprise");
const product_1 = require("../models/product");
const pricelist_1 = require("../models/pricelist");
const category_1 = require("../models/category");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'leilao',
    synchronize: true,
    //logging: ["query", "error"],
    logging: ["error"],
    entities: [user_1.User, product_1.Product, enterprise_1.Enterprise, pricelist_1.PriceList, category_1.Category], // Caminho absoluto para entidades compiladas
    migrations: [path_1.default.join(__dirname, "../migrations/*.js"),
        path_1.default.join(__dirname, "../migrations/*.ts")
    ], // Caminho absoluto para migrations compiladas
    subscribers: [],
});
