import { AppDataSource } from "../config/db.datasource";
import { User } from '../models/user';
import { BaseRepository } from './base/base.repository';

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(AppDataSource.getRepository(User));
    }

    //Método específicos para User
    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ 
            where: { email : email } 
        });
    }

  
    /*async findById(id: number): Promise<User | null> {
        return this.findByid(id);
    }
    async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
        return this.update(id, userData);
    }
    async deleteUser(id: number): Promise<boolean> {
        return this.delete(id.toString());
    }*/
}