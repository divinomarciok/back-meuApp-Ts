import { AppDataSource } from '../config/db.datasource';
import { Enterprise } from '../models/enterprise';
import { Request, Response } from 'express';


const getAllEnterprises = async (req: Request, res: Response): Promise<void> => {
    try {
        const enterpriseRepository = AppDataSource.getRepository(Enterprise);
        const enterprises = await enterpriseRepository.find();

        res.status(200).json(enterprises);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar empresas' });
    }
};

export { getAllEnterprises };