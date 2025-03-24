import { Request, Response } from 'express';
import { AppDataSource } from "../config/db.datasource";
import { User } from '../models/user'; 
import bcrypt from 'bcryptjs';

const createUser = async (req: Request, res: Response): Promise<void> => {
    let { nome, email, login, senha } = req.body;

    try {
    
        const userRepository = AppDataSource.getRepository(User);      
        const existingUser = await userRepository.findOne({ where: { email } }); 
      
        console.log(existingUser);

        if (existingUser) {
            res.status(400).json({ message: 'Email já cadastrado' });
            return;
        }

        const senhaHash = await bcrypt.hash(senha,10);

        senha = senhaHash;

        const newUser = userRepository.create({
            nome,
            email,
            login,
            senha,
        });
       
        await userRepository.save(newUser);

        res.status(201).json({
            message: 'Usuário criado com sucesso!',
            user: { id: newUser.id, nome: newUser.nome, email: newUser.email },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
};

export { createUser };
