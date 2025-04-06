import { Request, Response } from 'express';
import { AppDataSource } from "../config/db.datasource";
import { Product } from '../models/product';


const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const products = await productRepository.find(
            { relations: ['category'] }
        );

        const formattedProducts = products.map(product => ({
            id: product.id.toString(),
            nome: product.name,
            tamanho: product.weigth,
            marca: product.mark,            // Placeholder, pois a marca não está no modelo
            categoria: product.category ? product.category.id : null,
            img_url: product.img_url
        }));

        res.status(201).json(formattedProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
};

export { getAllProducts };


