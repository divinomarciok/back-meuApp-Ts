import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';

export const validateProduct = (req: Request, res: Response, next: NextFunction): void => {
    
    const productData = {

          name: req.body.name,
          mark: req.body.mark,
          category: req.body.category,
          weigth: req.body.weigth,
          unidade_measure: req.body?.unidade_measure,
          description: req.body?.description,
          img_url: req.file?.path,
          user: req.body.user         
    
 
         // product.user = userId;
    }
    console.log(productData.name);
    if (!productData.name || typeof productData.name !== 'string' || productData.name.length === 0) {
        res.status(400).json({ message: 'Nome do produto é obrigatório e deve ser uma string válida' });
        return;
    }

    if (productData.category && typeof productData.category !== 'string') {
        res.status(400).json({ message: 'Categoria do produto deve ser uma string' });
        return;
    }

    if (productData.weigth && typeof productData.weigth !== 'string') {
        res.status(400).json({ message: 'Tamanho do produto deve ser uma string' });
        return;
    }

    console.log(productData.unidade_measure);
    /*if (unidade_measure && (typeof unidade_measure !== 'number' || unidade_measure < 0)) {
        res.status(400).json({ message: 'Quantidade do produto deve ser um número maior ou igual a zero' });
        return;
    }*/

    next();
};
