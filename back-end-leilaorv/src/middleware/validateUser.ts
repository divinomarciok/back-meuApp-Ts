import { Request, Response, NextFunction } from 'express';

const validateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { nome, email,login, senha } = req.body;

    if (!nome || !email|| !login || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios: nome, email login e senha.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Formato de email inválido.' });
    }

    if (senha.length < 6) {
        return res.status(400).json({ message: 'A senha deve ter no mínimo 6 caracteres.' });
    }

    next();
}

export {validateUser}