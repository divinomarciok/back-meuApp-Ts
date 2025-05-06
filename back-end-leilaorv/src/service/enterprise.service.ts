import { EnterpriseRepository } from '../repositories/enterprise.repository';
import { Enterprise } from '../models/enterprise';
import { User } from '../models/user';
import { AppDataSource } from '../config/db.datasource';

export class EnterpriseService {
    private enterpriseRepository: EnterpriseRepository;
    
    constructor() {
        this.enterpriseRepository = new EnterpriseRepository();
    }
    
    async createEnterprise(enterpriseData: Partial<Enterprise>, userId?: number): Promise<Enterprise> {
        let user: User | null = null;
        
        const enterprise = new Enterprise();
        enterprise.address = enterpriseData.address!;
        enterprise.cep = enterpriseData.cep!;
        enterprise.cnpj = enterpriseData.cnpj!;
        enterprise.name = enterpriseData.name!;

        if (userId) {
            
            const userRepository = AppDataSource.getRepository(User);

            user = await userRepository.findOne({ where: { id: userId } });
            
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            enterprise.user = user;
        }
        
        return this.enterpriseRepository.create(enterprise);
    }
    
    async updateEnterprise(id: number, enterpriseData: Partial<Enterprise>): Promise<Enterprise | null> {
        return this.enterpriseRepository.update(id, enterpriseData);
    }
    
    async deleteEnterprise(id: number): Promise<boolean> {
        return this.enterpriseRepository.delete(id);
    }
    
    async getEnterpriseById(id: number): Promise<Enterprise | null> {
        return this.enterpriseRepository.findByid(id);
    }
    
    async listEnterprises(): Promise<Enterprise[]> {
        return this.enterpriseRepository.list();
    }
    
    async findEnterprisesByName(name: string): Promise<Enterprise[]> {
        return this.enterpriseRepository.findByName(name);
    }
    
    async findEnterprisesByUser(userId: number): Promise<Enterprise[]> {
        return this.enterpriseRepository.findByUser(userId);
    }
    
    async searchEnterprises(query: string): Promise<Enterprise[]> {
        return this.enterpriseRepository.searchByText(query);
    }
}