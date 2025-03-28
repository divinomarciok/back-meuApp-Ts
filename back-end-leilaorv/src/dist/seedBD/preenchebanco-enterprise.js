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
function insertEnterprises() {
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
        INSERT INTO enterprise (name, address, cep, cnpj, user_id) VALUES 
        ('Mercado Central LTDA', 'Rua Principal, 123', '12345-678', '12.345.678/0001-90', 1),
        ('Supermercados União', 'Av. Comercial, 456', '87654-321', '98.765.432/0001-10', 1),
        ('Atacadão Express', 'Rua da Indústria, 789', '54321-876', '45.678.912/0001-23', 1),
        ('Rede Econômica', 'Av. Brasil, 1100', '65432-109', '67.890.123/0001-45', 1),
        ('Mercado Popular', 'Rua São João, 250', '23456-789', '89.012.345/0001-67', 1),
        ('Super Mais', 'Av. Paulista, 1500', '98765-432', '23.456.789/0001-12', 1),
        ('Mercadinho São José', 'Rua XV de Novembro, 75', '45678-901', '56.789.012/0001-34', 1),
        ('Compre Bem Supermercados', 'Av. Getúlio Vargas, 500', '78901-234', '78.901.234/0001-56', 1),
        ('Mercado Familiar', 'Rua das Flores, 300', '34567-890', '90.123.456/0001-78', 1),
        ('Supermercado Econômico', 'Av. Presidente Vargas, 800', '56789-012', '34.567.890/0001-90', 1)
      `);
            yield queryRunner.commitTransaction();
            console.log('Empresas inseridas com sucesso!');
        }
        catch (err) {
            yield queryRunner.rollbackTransaction();
            console.error('Erro ao inserir empresas:', err);
        }
        finally {
            yield queryRunner.release();
        }
    });
}
insertEnterprises();
