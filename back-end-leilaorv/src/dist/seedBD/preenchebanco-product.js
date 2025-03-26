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
function insertProducts() {
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
        INSERT INTO products 
        (name, mark, category_id, description, img_url, unidade_measure, weigth, user_id) 
        VALUES 
        ('Maçã Fuji', 'Qualidade', 1, 'Maçã fresca e saborosa', NULL, 'KG', 0.15, 1),
        ('Banana Prata', 'Natural', 1, 'Banana madura e doce', NULL, 'KG', 0.12, 1),
        ('Tomate Cereja', 'Fresh', 1, 'Tomates pequenos e suculentos', NULL, 'KG', 0.20, 1),
        
        ('Frango Inteiro', 'Seara', 2, 'Frango fresco congelado', NULL, 'KG', 2.5, 2),
        ('Filé de Tilápia', 'Porto Pescados', 2, 'Peixe fresco sem espinhas', NULL, 'KG', 0.8, 2),
        ('Costela Bovina', 'Friboi', 2, 'Corte nobre de carne bovina', NULL, 'KG', 1.5, 2),
        
        ('Queijo Minas', 'Itambé', 3, 'Queijo fresco tradicional', NULL, 'KG', 0.5, 3),
        ('Leite Integral', 'Nestlé', 3, 'Leite pasteurizado', NULL, 'L', 1.0, 3),
        ('Iogurte Natural', 'Danone', 3, 'Iogurte sem adição de açúcar', NULL, 'UN', 0.2, 3),
        
        ('Pão Francês', 'Padaria Local', 4, 'Pão fresco do dia', NULL, 'UN', 0.1, 4),
        ('Bolo de Chocolate', 'Confeitaria Doce', 4, 'Bolo caseiro', NULL, 'UN', 0.5, 4),
        ('Croissant', 'Padaria Francesa', 4, 'Massa folhada tradicional', NULL, 'UN', 0.15, 4),
        
        ('Arroz Branco', 'Tio João', 5, 'Arroz tipo 1', NULL, 'KG', 1.0, 5),
        ('Feijão Carioca', 'Camil', 5, 'Feijão selecionado', NULL, 'KG', 1.0, 5),
        ('Macarrão Espaguete', 'Barilla', 5, 'Massa italiana', NULL, 'KG', 0.5, 5),
        
        ('Coca-Cola', 'Coca-Cola', 6, 'Refrigerante tradicional', NULL, 'L', 2.0, 1),
        ('Suco de Laranja', 'Del Valle', 6, 'Suco natural', NULL, 'L', 1.0, 1),
        ('Água Mineral', 'Crystal', 6, 'Água sem gás', NULL, 'L', 1.5, 1),
        
        ('Pizza Congelada', 'Sadia', 7, 'Pizza margherita', NULL, 'UN', 0.4, 2),
        ('Sorvete de Chocolate', 'Kibon', 7, 'Sorvete cremoso', NULL, 'L', 1.0, 2),
        ('Lasanha Congelada', 'Seara', 7, 'Lasanha de carne', NULL, 'UN', 0.6, 2),
        
        ('Detergente', 'Ype', 8, 'Detergente líquido', NULL, 'UN', 0.5, 3),
        ('Sabão em Pó', 'Omo', 8, 'Sabão para lavar roupas', NULL, 'KG', 1.0, 3),
        ('Papel Higiênico', 'Neve', 8, 'Papel higiênico folha dupla', NULL, 'UN', 0.2, 3),
        
        ('Alface Orgânica', 'Fazenda Orgânica', 9, 'Alface fresca', NULL, 'UN', 0.2, 4),
        ('Cenoura Orgânica', 'Produtor Local', 9, 'Cenoura sem agrotóxicos', NULL, 'KG', 0.3, 4),
        ('Tomate Orgânico', 'Vale Orgânico', 9, 'Tomate natural', NULL, 'KG', 0.4, 4),
        
        ('Pano de Prato', 'Karsten', 10, 'Pano de prato algodão', NULL, 'UN', 0.1, 5),
        ('Panela de Alumínio', 'Clock', 10, 'Panela antiaderente', NULL, 'UN', 2.0, 5)
      `);
            yield queryRunner.commitTransaction();
            console.log('Produtos inseridos com sucesso!');
        }
        catch (err) {
            yield queryRunner.rollbackTransaction();
            console.error('Erro ao inserir produtos:', err);
        }
        finally {
            yield queryRunner.release();
        }
    });
}
insertProducts();
