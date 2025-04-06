import { Request, Response } from 'express';
import multer from 'multer';
import { AppDataSource } from '../config/db.datasource';
import { Product } from '../models/product';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload;
}


export const createProduct = async (req: CustomRequest, res: Response): Promise<void> => {
    const { name, category, img_url, unidade_measure, weigth, description } = req.body;

    try {
        const productRepository = AppDataSource.getRepository(Product);
        const userRepository = AppDataSource.getRepository(User);


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

        const existingProduct = await productRepository.findOne({ where: { name } });
        if (existingProduct) {
            res.status(400).json({ message: 'Produto já cadastrado' });
            return;
        }

        if (!req.file) {
            res.status(400).json({ message: 'Imagem não enviada' });
            return
        }
        // Cria o novo produto
        const newProduct = productRepository.create({
            name,
            category,
            img_url,
            unidade_measure,
            weigth,
            description,
            user,
        });


        await productRepository.save(newProduct);

        res.status(201).json({
            message: 'Produto criado com sucesso!',
            product: { id: newProduct.id, nomeProd: newProduct.name, categoriaProd: newProduct.category },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar produto' });
    }
};
