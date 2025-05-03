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

    async findByLogin(login: string): Promise<User | null> {
        return this.repository.findOne({ 
            where: { login : login } 
        });
    } 

}