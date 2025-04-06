import { Request, Response } from 'express';
import { AppDataSource } from '../config/db.datasource';
import { Enterprise } from '../models/enterprise';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload;
}

export const createEnterprise = async (req: CustomRequest, res: Response): Promise<void> => {
    const { name, address, cep, cnpj } = req.body;

    try {
        const enterpriseRepository = AppDataSource.getRepository(Enterprise);
        const userRepository = AppDataSource.getRepository(User);

        // Verifica se o req.user é um objeto JwtPayload
        if (typeof req.user !== 'object' || req.user === null || !('id' in req.user)) {
            res.status(401).json({ message: 'Usuário não autenticado' });
            return;
        }

        const userId = req.user.id;

        // Verifica se o usuário existe
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        // Verifica se já existe uma empresa com o mesmo CNPJ
        const existingEnterprise = await enterpriseRepository.findOne({ where: { cnpj } });
        if (existingEnterprise) {
            res.status(400).json({ message: 'CNPJ já cadastrado' });
            return;
        }

        // Cria a nova empresa
        const newEnterprise = enterpriseRepository.create({
            name,
            address,
            cep,
            cnpj,
            user,
        });

        await enterpriseRepository.save(newEnterprise);

        res.status(201).json({
            message: 'Empresa cadastrada com sucesso!',
            enterprise: { id: newEnterprise.id, nomeEmp: newEnterprise.name, cnpj: newEnterprise.cnpj },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao cadastrar empresa' });
    }
};