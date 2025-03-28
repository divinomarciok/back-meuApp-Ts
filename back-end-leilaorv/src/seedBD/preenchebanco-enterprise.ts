import { AppDataSource } from "../config/db.datasource";

async function insertEnterprises() {
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
      
      await queryRunner.commitTransaction();
      console.log('Empresas inseridas com sucesso!');
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error('Erro ao inserir empresas:', err);
    } finally {
      await queryRunner.release();
    }
  }
  
  insertEnterprises();