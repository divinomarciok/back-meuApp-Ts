import { UserRepository } from "../repositories/user.respository";
import { User } from "../models/user";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userData: User): Promise<User> {   
    
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

             if (!userData.email) {
            throw new Error('Email é obrigatório');
        }
    
        return this.userRepository.create(userData);
    }

    async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
        const user = await this.userRepository.findByid(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return this.userRepository.update(id, userData);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }

    async findUserByLogin(login: string): Promise<User | null> {
        return this.userRepository.findByLogin(login);
    }

    async deleteUser(id: number): Promise<boolean> {
        const user = await this.userRepository.findByid(id);
        if (!user) {
            throw new Error('Usuário não encontrado'); 
        }

        return this.userRepository.delete(id);
    }

    async getUserById(id: number): Promise<User | null> {
        return this.userRepository.findByid(id);
    }

    async listUsers(): Promise<User[]> {
        return this.userRepository.list();
    }
}
