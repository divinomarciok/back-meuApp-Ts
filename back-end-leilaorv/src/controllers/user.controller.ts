import { Request, Response } from 'express';
import { UserService } from '../service/user.service'; // Importe o UserService
import bcrypt from 'bcryptjs';

export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            let { nome, email, senha, ...outrosDados } = req.body;

            const senhaHash = await bcrypt.hash(senha, 10);

            senha = senhaHash

            const user = await this.userService.createUser({ nome, email, senha, ...outrosDados } as any); 

            const { senha: _, ...userSemSenha } = user;
            res.status(201).json(userSemSenha);
        } catch (error: any) {
            console.error('Erro ao criar usuário:', error);
            res.status(400).json({ message: error.message || 'Erro ao criar usuário' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const user = await this.userService.getUserById(id);

            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }

            const { senha: _, ...userSemSenha } = user;
            res.json(userSemSenha);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            res.status(500).json({ message: 'Erro ao buscar usuário' });
        }
    }

    async findByEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;

            if (!email) {
                res.status(400).json({ message: 'O campo email é obrigatório no corpo da requisição.' });
                return;
            }

            const user = await this.userService.findUserByEmail(email);

            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }

            const { senha: _, ...userSemSenha } = user;
            res.json(userSemSenha);
        } catch (error) {
            console.error('Erro ao buscar usuário por email:', error);
            res.status(500).json({ message: 'Erro ao buscar usuário' });
        }
    }

    async findByLogin(req: Request, res: Response): Promise<void> {
        try {
            const { login } = req.body;

            if (!login) {
                res.status(400).json({ message: 'O campo login é obrigatório no corpo da requisição.' });
                return;
            }

            const user = await this.userService.findUserByLogin(login);

            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }

            //const { senha: _, ...userSemSenha } = user;
            res.json(user);
        } catch (error) {
            console.error('Erro ao buscar usuário por login:', error);
            res.status(500).json({ message: 'Erro ao buscar usuário' });
        }
    }

    // UPDATE - Atualizar usuário
    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const { senha, email, ...dadosAtualizacao } = req.body;

            // Se estiver atualizando a senha, faz o hash aqui no controller (camada de apresentação)
            if (senha) {
                dadosAtualizacao.senha = await bcrypt.hash(senha, 10);
            }
            if (email) {
                dadosAtualizacao.email = email; // Deixa o UserService lidar com a verificação de email duplicado, se necessário
            }

            const updatedUser = await this.userService.updateUser(id, dadosAtualizacao);

            if (!updatedUser) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }

            const { senha: _, ...userSemSenha } = updatedUser;
            res.json(userSemSenha);
        } catch (error: any) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(400).json({ message: error.message || 'Erro ao atualizar usuário' });
        }
    }

    // DELETE - Remover usuário
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const deleted = await this.userService.deleteUser(id);

            if (!deleted) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }

            res.status(204).send();
        } catch (error: any) {
            console.error('Erro ao deletar usuário:', error);
            res.status(500).json({ message: error.message || 'Erro ao deletar usuário' });
        }
    }

    // LIST - Listar todos os usuários
    async list(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.listUsers();
            const usersSemSenha = users.map(user => {
                const { senha: _, ...userSemSenha } = user;
                return userSemSenha;
            });
            res.json(usersSemSenha);
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.status(500).json({ message: 'Erro ao listar usuários' });
        }
    }
}