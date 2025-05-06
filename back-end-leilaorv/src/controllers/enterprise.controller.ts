import { Request, Response } from 'express';
import { EnterpriseService } from '../service/enterprise.service';

export class EnterpriseController {
    private enterpriseService: EnterpriseService;

    constructor() {
        this.enterpriseService = new EnterpriseService();
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const enterpriseData = req.body;
            const userId = (req as any).user.id; 
                        
            if (!enterpriseData.name) {
                res.status(400).json({ message: 'Os campos name é obrigatórios' });
                return;
            }

            const enterprise = await this.enterpriseService.createEnterprise(enterpriseData, userId);
            

            
            const { user: _, ...enterpriseNoUser } = enterprise;
            res.status(201).json(enterpriseNoUser);
        } catch (error: any) {
            console.error('Erro ao criar empresa:', error);
            res.status(400).json({ message: error.message || 'Erro ao criar empresa' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const enterpriseData = req.body;
            
            if (Object.keys(enterpriseData).length === 0) {
                res.status(400).json({ message: 'Nenhum dado fornecido para atualização' });
                return;
            }

            const updatedEnterprise = await this.enterpriseService.updateEnterprise(id, enterpriseData);
            
            if (!updatedEnterprise) {
                res.status(404).json({ message: 'Empresa não encontrada' });
                return;
            }
            
            const { user: _, ...enterpriseNoUser } = updatedEnterprise;
            res.status(201).json(enterpriseNoUser);
        } catch (error: any) {
            console.error('Erro ao atualizar empresa:', error);
            res.status(400).json({ message: error.message || 'Erro ao atualizar empresa' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const deleted = await this.enterpriseService.deleteEnterprise(id);
            
            if (!deleted) {
                res.status(404).json({ message: 'Empresa não encontrada' });
                return;
            }
            
            res.status(204).send();
        } catch (error: any) {
            console.error('Erro ao deletar empresa:', error);
            res.status(400).json({ message: error.message || 'Erro ao deletar empresa' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const enterprise = await this.enterpriseService.getEnterpriseById(id);
            
            if (!enterprise) {
                res.status(404).json({ message: 'Empresa não encontrada' });
                return;
            }
            
            res.json(enterprise);
        } catch (error) {
            console.error('Erro ao buscar empresa:', error);
            res.status(500).json({ message: 'Erro ao buscar empresa' });
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const enterprises = await this.enterpriseService.listEnterprises();
            res.json(enterprises);
        } catch (error) {
            console.error('Erro ao listar empresas:', error);
            res.status(500).json({ message: 'Erro ao listar empresas' });
        }
    }

    async findByName(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.query;
            
            if (!name) {
                res.status(400).json({ message: 'O campo name é obrigatório na query' });
                return;
            }
            
            const enterprises = await this.enterpriseService.findEnterprisesByName(name.toString());
            
            if (enterprises.length === 0) {
                res.status(404).json({ message: 'Nenhuma empresa encontrada com este nome' });
                return;
            }
            
            res.json(enterprises);
        } catch (error) {
            console.error('Erro ao buscar empresas por nome:', error);
            res.status(500).json({ message: 'Erro ao buscar empresas por nome' });
        }
    }

    async findByUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.userId);
            
            const enterprises = await this.enterpriseService.findEnterprisesByUser(userId);
            
            if (enterprises.length === 0) {
                res.status(404).json({ message: 'Nenhuma empresa encontrada para este usuário' });
                return;
            }
            
            res.json(enterprises);
        } catch (error) {
            console.error('Erro ao buscar empresas por usuário:', error);
            res.status(500).json({ message: 'Erro ao buscar empresas por usuário' });
        }
    }

    async search(req: Request, res: Response): Promise<void> {
        try {
            const { query } = req.query;
            
            if (!query || typeof query !== 'string') {
                res.status(400).json({ message: 'O parâmetro query é obrigatório na URL' });
                return;
            }
            
            const enterprises = await this.enterpriseService.searchEnterprises(query.toString());
            
            if (enterprises.length === 0) {
                res.status(404).json({ message: 'Nenhuma empresa encontrada com os critérios de busca' });
                return;
            }
            
            res.json(enterprises);
        } catch (error) {
            console.error('Erro ao buscar empresas:', error);
            res.status(500).json({ message: 'Erro ao buscar empresas' });
        }
    }
}