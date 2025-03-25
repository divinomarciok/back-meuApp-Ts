import { AppDataSource } from '../config/db.datasource';


async function insertCategories() {

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
    
    await queryRunner.commitTransaction();
    console.log('Categorias inseridas com sucesso!');
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error('Erro ao inserir categorias:', err);
  } finally {
    await queryRunner.release();
  }
}

insertCategories();