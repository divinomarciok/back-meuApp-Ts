import { Request, Response, NextFunction } from 'express';

export const validateEnterpriseProduct = (req: Request, res: Response, next: NextFunction): void => {
    const { enterprise_id, product_id, price } = req.body;

    if (!enterprise_id || typeof enterprise_id !== 'number') {
        res.status(400).json({ message: 'ID da empresa é obrigatório e deve ser um número' });
        return;
    }

    if (!product_id || typeof product_id !== 'number') {
        res.status(400).json({ message: 'ID do produto é obrigatório e deve ser um número' });
        return;
    }

    if (price === undefined || typeof price !== 'number' || price < 0) {
        res.status(400).json({ message: 'Preço é obrigatório e deve ser um número maior ou igual a zero' });
        return;
    }

    next();
};