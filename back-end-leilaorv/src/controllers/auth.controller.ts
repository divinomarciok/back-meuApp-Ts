import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

export class AuthController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    
    async login(req: Request, res: Response): Promise<void> {

    const { login, senha } = req.body;
    try {
             
        const user =  await this.userService.findUserByLogin(login);

        if (!user) {
            res.status(401).json({ message: 'Usuário ou senha inválidos' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            res.status(401).json({ message: 'Valid senha inválidos' });
            return;        
        }
        
        const token = jwt.sign({ id: user.id, login: user.login }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Autenticado com sucesso', token });
            
    }catch(error){
       
        res.status(500).json({message:"Erro interno do servidor teste: ", error});
    }
    }
   
}