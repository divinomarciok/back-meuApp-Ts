import { Request, Response } from 'express';
import { AppDataSource } from '../config/db.datasource';
import { Category } from '../models/category';

const categoryRepository = AppDataSource.getRepository(Category);

export const createCategory = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    try {
        const category = categoryRepository.create({
            name,
            description
        });

        await categoryRepository.save(category);

        res.status(201).json({ message: "Categoria criada", category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar categoria" });
    }

};



