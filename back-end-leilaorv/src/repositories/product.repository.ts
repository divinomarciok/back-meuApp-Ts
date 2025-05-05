import { AppDataSource } from "../config/db.datasource";
import { Product } from '../models/product';
import { BaseRepository } from './base/base.repository';

export class ProductRepository extends BaseRepository<Product> {

    constructor() {
        super(AppDataSource.getRepository(Product));
    }
   
    async findByName(name: string): Promise<Product[]> {        
        return this.repository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')            
            .where('LOWER(product.name) LIKE LOWER(:name)', { name: `%${name}%` })
            .getMany();
    }
    
 
    async findByMark(mark: string): Promise<Product[]> {
        return this.repository.find({
            where: { mark: mark },
            relations: ['category']
        });
    }
  
    async findByCategory(categoryId: number): Promise<Product[]> {
        return this.repository.find({
            where: { category: { id: categoryId } },
            relations: ['category']
        });
    }

    async findByUser(userId: number): Promise<Product[]> {
        return this.repository.find({
            where: { user: { id: userId } },
            relations: ['category', 'user']
        });
    }

      async findByIdWithRelations(id: number): Promise<Product | null> {
        return this.repository.findOne({
            where: { id: id },
            relations: ['category']
        });
    }

       async listWithRelations(): Promise<Product[]> {
        return this.repository.find({
            relations: ['category']
        });
    }
 
    async searchByText(searchText: string): Promise<Product[]> {
        // Usando o operador LIKE para buscar texto parcial
        return this.repository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.user', 'user')
            .where('LOWER(product.name) LIKE LOWER(:searchText)', { searchText: `%${searchText}%` })
           // .orWhere('LOWER(product.description) LIKE LOWER(:searchText)', { searchText: `%${searchText}%` })
            .getMany();
    }
}