import { Repository, ObjectLiteral } from 'typeorm';
import { CRUDRepository } from '../../interfaces/crud.interface';

export abstract class BaseRepository<T extends ObjectLiteral> implements CRUDRepository<T> {

    protected repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    async create(item: T): Promise<T> {
        const entity = this.repository.create(item);
        return this.repository.save(entity);
    }

    async findByid(id: number): Promise<T | null> {
        return this.repository.findOne({
            where: { id: id } as any 
        });
    }

    async update(id: number, item: Partial<T>): Promise<T | null> {

        const updateResult = await this.repository.update(id, item);

        if (updateResult.affected && updateResult.affected > 0) {
            return this.findByid(id);
        }
        return null;
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(Number(id));
        return result.affected ? result.affected > 0 : false;
    }

    async list(): Promise<T[]> {
        return this.repository.find();
    }
}