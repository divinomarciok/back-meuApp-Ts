import { AppDataSource } from "../config/db.datasource";
import { PriceList } from '../models/pricelist';
import { BaseRepository } from './base/base.repository';

export class PriceListRepository extends BaseRepository<PriceList> {

    constructor() {
        super(AppDataSource.getRepository(PriceList));
    }
   
    async findByProductId(productId: number): Promise<PriceList[]> {        
        return this.repository
            .createQueryBuilder('price_list')
            .leftJoinAndSelect('price_list.product', 'product')
            .leftJoinAndSelect('price_list.enterprise', 'enterprise')
           //.leftJoinAndSelect('price_list.user', 'user')
            .where('product.id = :productId', { productId })
            .getMany();
    }
    
    async findByEnterpriseId(enterpriseId: number): Promise<PriceList[]> {
        return this.repository
            .createQueryBuilder('price_list')
            .leftJoinAndSelect('price_list.product', 'product')
            .leftJoinAndSelect('price_list.enterprise', 'enterprise')
        //    .leftJoinAndSelect('price_list.user', 'user')
            .where('enterprise.id = :enterpriseId', { enterpriseId })
            .getMany();
    }

    async findByIdWithRelations(id: number): Promise<PriceList | null> {
        return this.repository.findOne({
            where: { id: id },
            relations: ['product', 'enterprise',]
        });
    }

    async findBySale(): Promise<PriceList[] | null> {
        return this.repository.find({
            where: { isSale: true },
            relations: ['product', 'enterprise']
        });
    }

    async listWithRelations(): Promise<PriceList[]> {
        return this.repository.find({
            relations: ['product', 'enterprise']
        });
    }
}