import { AppDataSource } from "../config/db.datasource";
import { Enterprise } from '../models/enterprise';
import { BaseRepository } from './base/base.repository';

export class EnterpriseRepository extends BaseRepository<Enterprise> {
    constructor() {
        super(AppDataSource.getRepository(Enterprise));
    }
  
    async findByName(name: string): Promise<Enterprise[]> {
        return this.repository.find({
            where: { name: name },
        });
    }
  
    async searchByText(searchText: string): Promise<Enterprise[]> {
        return this.repository
            .createQueryBuilder('enterprise')            
            .where('LOWER(enterprise.name) LIKE LOWER(:searchText)', { searchText: `%${searchText}%` })
            .orWhere('LOWER(enterprise.address) LIKE LOWER(:searchText)', { searchText: `%${searchText}%` })                    
            .getMany();
    }
 
    async existsByName(name: string): Promise<boolean> {
        const count = await this.repository.count({
            where: { name: name }
        });
        return count > 0;
    }

    async findByUser(userId: number): Promise<Enterprise[]> {
        return this.repository.find({
            where: { user: { id: userId } },
            relations: ['user']
        });
    }  
 
}
