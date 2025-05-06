import { Request, Response, NextFunction } from 'express';

const validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const {login, senha } = req.body;

    if ( !login || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios: login e senha.' });
    }

    if (senha.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres.' });
    }

    next();
}  

export {validateLogin}