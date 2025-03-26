import { AppDataSource } from "../config/db.datasource";

async function insertProducts() {
    await AppDataSource.initialize()
      .then(() => {
        console.log("Banco de dados conectado");
      })
      .catch((error) => {
        console.error("Erro ao conectar no banco de dados:", error);
      });
    
    const queryRunner = AppDataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      await queryRunner.query(`
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
      
      await queryRunner.commitTransaction();
      console.log('Produtos inseridos com sucesso!');
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error('Erro ao inserir produtos:', err);
    } finally {
      await queryRunner.release();
    }
  }
  
  insertProducts();