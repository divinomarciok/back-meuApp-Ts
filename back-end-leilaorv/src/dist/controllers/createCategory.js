"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = void 0;
const db_datasource_1 = require("../config/db.datasource");
const category_1 = require("../models/category");
const categoryRepository = db_datasource_1.AppDataSource.getRepository(category_1.Category);
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const category = categoryRepository.create({
            name,
            description
        });
        yield categoryRepository.save(category);
        res.status(201).json({ message: "Categoria criada", category });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar categoria" });
    }
});
exports.createCategory = createCategory;
