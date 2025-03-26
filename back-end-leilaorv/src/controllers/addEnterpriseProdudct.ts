import { Request, Response } from 'express';
import { AppDataSource } from '../config/db.datasource';
import { PriceList } from '../models/price_list';
import { Enterprise } from '../models/enterprise';
import { Product } from '../models/product';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload;
  }

export const addEnterpriseProduct = async (req: CustomRequest, res: Response): Promise<void> => {
    const { isSale, enterprise_id, product_id, price,date_start } = req.body;

    if (typeof req.user !== 'object' || req.user === null || !('id' in req.user)) {
        res.status(401).json({ message: 'Usuário não autenticado' });
         return;
    }

    const userId = req.user.id;


    try {

        const enterpriseRepository = AppDataSource.getRepository(Enterprise);
        const productRepository = AppDataSource.getRepository(Product);
        const userRepository = AppDataSource.getRepository(User);
        const priceListReposity = AppDataSource.getRepository(PriceList);

        const enterprise = await enterpriseRepository.findOne({ where: { id: enterprise_id } });
        if (!enterprise) {
            res.status(404).json({ message: 'Empresa não encontrada' });
            return;
        }

        const product = await productRepository.findOne({ where: { id: product_id } });
        if (!product) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }

        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

        

        const newPriceList = priceListReposity.create({
            isSale:undefined,
            enterprise,
            product,          
            price,
            user,
        });

        await priceListReposity.save(newPriceList);

        res.status(201).json({
            message: 'Produto adicionado à empresa com sucesso!',
            enterpriseProduct: {
                id: newPriceList.id,
                enterprise_id: enterprise.id,
                product_id: product.id,
                user_id: user.id,
                price: newPriceList.price,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao adicionar produto à empresa' });
    }
};
