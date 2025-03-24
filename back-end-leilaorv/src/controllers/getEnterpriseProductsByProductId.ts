import { Router } from 'express';
import { AppDataSource } from '../config/db.datasource';
import { Product } from '../models/product';
import { Enterprise } from '../models/enterprise';
import { PriceList } from '../models/price_list';
import { Request, Response } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';

const getEnterpriseProductsByProductId = async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.params;

    try {
        const enterpriseProductsRepository = AppDataSource.getRepository(PriceList);
        
        // Como 'product' é um relacionamento, precisamos passar um objeto para o campo 'where'
        const enterpriseProducts = await enterpriseProductsRepository.find({
            where: {
                product: {
                    id: parseInt(productId, 10), // Certifique-se de converter para número
                },
            },
            relations: ['enterprise', 'product'],
        });

        if (!enterpriseProducts || enterpriseProducts.length === 0) {
            res.status(404).json({ message: 'Nenhuma associação encontrada para o produto' });
            return;
        }

        // Formatando o resultado para retornar somente as informações necessárias
        const formattedEnterpriseProducts = enterpriseProducts.map(ep => ({
            //nome: ep.product?.nomeProd,
          //  tamanho: ep.product?.tamanhoProd,
            //marca: 'Marca Genérica', // Placeholder, caso precise de uma informação que não existe no modelo
            user: ep.user?.nome,
            empresa: ep.enterprise?.name,
            preco: ep.price,
        }));

        res.status(200).json(formattedEnterpriseProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar dados da associação enterprise_products' });
    }
};

// Exportando o método para ser usado nas rotas
export { getEnterpriseProductsByProductId };
