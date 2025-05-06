import { Request, Response } from 'express';
import { CategoryService } from '../service/category.service';

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

  
    async create(req: Request, res: Response): Promise<void> {
        try {

            const categoryData = req.body;            
           
            if (!categoryData.name || !categoryData.description) {
                res.status(400).json({ message: 'Os campos name e description são obrigatórios' });
                return;
            }

            const category = await this.categoryService.createCategory(categoryData);
            
            res.status(201).json(category);
        } catch (error: any) {
            console.error('Erro ao criar categoria:', error);
            res.status(400).json({ message: error.message || 'Erro ao criar categoria' });
        }
    }

    /**
     * Atualiza uma categoria existente
     */
    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const categoryData = req.body;
            
            // Validar se há dados para atualizar
            if (Object.keys(categoryData).length === 0) {
                res.status(400).json({ message: 'Nenhum dado fornecido para atualização' });
                return;
            }

            const updatedCategory = await this.categoryService.updateCategory(id, categoryData);
            
            if (!updatedCategory) {
                res.status(404).json({ message: 'Categoria não encontrada' });
                return;
            }
            
            res.json(updatedCategory);
        } catch (error: any) {
            console.error('Erro ao atualizar categoria:', error);
            res.status(400).json({ message: error.message || 'Erro ao atualizar categoria' });
        }
    }

    /**
     * Remove uma categoria
     */
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const deleted = await this.categoryService.deleteCategory(id);
            
            if (!deleted) {
                res.status(404).json({ message: 'Categoria não encontrada' });
                return;
            }
            
            res.status(204).send();
        } catch (error: any) {
            console.error('Erro ao deletar categoria:', error);
            res.status(400).json({ message: error.message || 'Erro ao deletar categoria' });
        }
    }

    /**
     * Busca uma categoria pelo ID
     */
    async findById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const category = await this.categoryService.getCategoryById(id);
            
            if (!category) {
                res.status(404).json({ message: 'Categoria não encontrada' });
                return;
            }
            
            res.json(category);
        } catch (error) {
            console.error('Erro ao buscar categoria:', error);
            res.status(500).json({ message: 'Erro ao buscar categoria' });
        }
    }

    /**
     * Lista todas as categorias
     */
    async list(req: Request, res: Response): Promise<void> {
        try {
            const categories = await this.categoryService.listCategories();
            res.json(categories);
        } catch (error) {
            console.error('Erro ao listar categorias:', error);
            res.status(500).json({ message: 'Erro ao listar categorias' });
        }
    }

    /**
     * Busca categorias por nome
     */
    async findByName(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.query;
            
            if (!name) {
                res.status(400).json({ message: 'O campo name é obrigatório no corpo da requisição' });
                return;
            }
            
            const categories = await this.categoryService.findCategoriesByName(name.toString());
            
            if (categories.length === 0) {
                res.status(404).json({ message: 'Nenhuma categoria encontrada com este nome' });
                return;
            }
            
            res.json(categories);
        } catch (error) {
            console.error('Erro ao buscar categorias por nome:', error);
            res.status(500).json({ message: 'Erro ao buscar categorias por nome' });
        }
    }

    /**
     * Busca categorias por texto no nome ou descrição
     */
    async search(req: Request, res: Response): Promise<void> {
        try {
            const { query } = req.query;
            
            if (!query || typeof query !== 'string') {
                res.status(400).json({ message: 'O parâmetro query é obrigatório na URL' });
                return;
            }
            
            const categories = await this.categoryService.searchCategories(query);
            
            if (categories.length === 0) {
                res.status(404).json({ message: 'Nenhuma categoria encontrada com os critérios de busca' });
                return;
            }
            
            res.json(categories);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            res.status(500).json({ message: 'Erro ao buscar categorias' });
        }
    }
}