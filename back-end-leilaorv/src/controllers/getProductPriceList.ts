import { Router } from 'express';
import { AppDataSource } from '../config/db.datasource';
import { PriceList } from '../models/price_list';
import { Request, Response } from 'express';

const getProductPriceList = async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.params;

    try {
        const priceListReposity = AppDataSource.getRepository(PriceList);
        
        // Como 'product' é um relacionamento, precisamos passar um objeto para o campo 'where'
        const productInlist = await priceListReposity.find({
            where: {
                product: {
                    id: parseInt(productId, 10), // Certifique-se de converter para número
                },
            },
            relations: ['enterprise', 'product'],
        });

        if (!productInlist || productInlist.length === 0) {
            res.status(404).json({ message: 'Nenhuma associação encontrada para o produto' });
            return;
        }

        // Formatando o resultado para retornar somente as informações necessárias
        const formatedPriceList = productInlist.map(ep => ({           
            nameProd: ep.product.name,
            mark:ep.product.mark,
            price: ep.price,     
            isSale: ep.isSale,
            enterprise: ep.enterprise?.name,
            un:ep.product.unidade_measure,  
            weigth:ep.product.weigth,
            img_url:ep.product.img_url        
           
        }));

        res.status(200).json(formatedPriceList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar dados da associação enterprise_products' });
    }
};

// Exportando o método para ser usado nas rotas
export { getProductPriceList };
