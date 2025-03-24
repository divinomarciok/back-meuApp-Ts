import { Request, Response } from 'express';
import { AppDataSource } from "../config/db.datasource";
import { Product } from '../models/product';

const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.params;
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOne({ where: { id: parseInt(productId, 10) } });

        if (!product) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }

        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar produto' });
    }
};

export {getProductById}
