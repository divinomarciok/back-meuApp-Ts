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
const db_datasource_1 = require("../config/db.datasource");
function insertCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_datasource_1.AppDataSource.initialize()
            .then(() => {
            console.log("Banco de dados conectado");
        })
            .catch((error) => {
            console.error("Erro ao conectar no banco de dados:", error);
        });
        const queryRunner = db_datasource_1.AppDataSource.createQueryRunner();
        yield queryRunner.connect();
        yield queryRunner.startTransaction();
        try {
            yield queryRunner.query(`
      INSERT INTO category (name, description) VALUES 
      ('Frutas e Vegetais', 'Produtos frescos incluindo frutas, legumes e verduras'),
      ('Carnes e Peixes', 'Carnes frescas, peixes, frutos do mar e aves'),
      ('Laticínios', 'Leite, queijos, iogurtes e outros derivados do leite'),
      ('Padaria', 'Pães, bolos, tortas e outros produtos de panificação'),
      ('Mercearia', 'Produtos básicos como arroz, feijão, massas e enlatados'),
      ('Bebidas', 'Refrigerantes, sucos, água, bebidas alcoólicas e cafés'),
      ('Congelados', 'Alimentos prontos e congelados, sorvetes e sobremesas'),
      ('Higiene e Limpeza', 'Produtos para limpeza doméstica e higiene pessoal'),
      ('Hortifruti', 'Produtos orgânicos e agroecológicos'),
      ('Utilidades Domésticas', 'Utensílios para cozinha, lavanderia e organização da casa')
    `);
            yield queryRunner.commitTransaction();
            console.log('Categorias inseridas com sucesso!');
        }
        catch (err) {
            yield queryRunner.rollbackTransaction();
            console.error('Erro ao inserir categorias:', err);
        }
        finally {
            yield queryRunner.release();
        }
    });
}
insertCategories();
