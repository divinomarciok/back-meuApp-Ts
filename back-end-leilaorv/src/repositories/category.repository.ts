import { AppDataSource } from "../config/db.datasource";
import { Category } from '../models/category';
import { BaseRepository } from './base/base.repository';

export class CategoryRepository extends BaseRepository<Category> {
    constructor() {
        super(AppDataSource.getRepository(Category));
    }
  
    async findByName(name: string): Promise<Category[]> {
        return this.repository.find({
            where: { name: name }
        });
    }
  
    async searchByText(searchText: string): Promise<Category[]> {
        return this.repository
            .createQueryBuilder('category')
            .where('LOWER(category.name) LIKE LOWER(:searchText)', { searchText: `%${searchText}%` })
            .orWhere('LOWER(category.description) LIKE LOWER(:searchText)', { searchText: `%${searchText}%` })
            .getMany();
    }
 
    async existsByName(name: string): Promise<boolean> {
        const count = await this.repository.count({
            where: { name: name }
        });
        return count > 0;
    }
}