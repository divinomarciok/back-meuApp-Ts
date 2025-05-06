import { Request, Response } from 'express';
import { ProductService } from '../service/product.service';



export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const productData = req.body;
            //const userId = Number(req.body.userId); 
            const userId = (req as any).user.id; 
            console.log('user ID : ',userId)
            const categoryId = req.body.categoryId ? Number(req.body.categoryId) : undefined;
            
            let filePath: string | undefined;
            if (req.file) {
                filePath = `/uploads/products/${req.file.filename}`;            }

            const product = await this.productService.createProduct(productData, userId, categoryId, filePath);
            
            res.status(201).json(product);
        } catch (error: any) {
            console.error('Erro ao criar produto:', error);
            res.status(400).json({ message: error.message || 'Erro ao criar produto' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const productData = req.body;
            const categoryId = req.body.categoryId ? Number(req.body.categoryId) : undefined;
            
            
            let filePath: string | undefined;
            if (req.file) {    
                filePath = `/uploads/products/${req.file.filename}`;
            }

            const updatedProduct = await this.productService.updateProduct(id, productData, categoryId, filePath);
            
            if (!updatedProduct) {
                res.status(404).json({ message: 'Produto não encontrado' });
                return;
            }
            
            res.json(updatedProduct);
        } catch (error: any) {
            console.error('Erro ao atualizar produto:', error);
            res.status(400).json({ message: error.message || 'Erro ao atualizar produto' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const deleted = await this.productService.deleteProduct(id);
            
            if (!deleted) {
                res.status(404).json({ message: 'Produto não encontrado' });
                return;
            }
            
            res.status(204).send();
        } catch (error: any) {
            console.error('Erro ao deletar produto:', error);
            res.status(500).json({ message: error.message || 'Erro ao deletar produto' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const product = await this.productService.getProductById(id);
            
            if (!product) {
                res.status(404).json({ message: 'Produto não encontrado' });
                return;
            }
            
            res.json(product);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            res.status(500).json({ message: 'Erro ao buscar produto' });
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productService.listProducts();
            res.json(products);
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({ message: 'Erro ao listar produtos' });
        }
    }

    async findByName(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.query;
            
            if (!name) {
                res.status(400).json({ message: 'O campo name é obrigatório no corpo da requisição.' });
                return;
            }
            
            const products = await this.productService.findProductsByName(name.toString());
            
            if (products.length === 0) {
                res.status(404).json({ message: 'Nenhum produto encontrado com este nome' });
                return;
            }
            
            res.json(products);
        } catch (error) {
            console.error('Erro ao buscar produtos por nome:', error);
            res.status(500).json({ message: 'Erro ao buscar produtos por nome' });
        }
    }

    async findByMark(req: Request, res: Response): Promise<void> {
        try {
            const { mark } = req.query;
            
            if (!mark) {
                res.status(400).json({ message: 'O campo mark é obrigatório no corpo da requisição.' });
                return;
            }
            
            const products = await this.productService.findProductsByMark(mark.toString());
            
            if (products.length === 0) {
                res.status(404).json({ message: 'Nenhum produto encontrado com esta marca' });
                return;
            }
            
            res.json(products);
        } catch (error) {
            console.error('Erro ao buscar produtos por marca:', error);
            res.status(500).json({ message: 'Erro ao buscar produtos por marca' });
        }
    }

    async findByCategory(req: Request, res: Response): Promise<void> {
        try {
            const categoryId = Number(req.query.categoryId);
            
            const products = await this.productService.findProductsByCategory(categoryId);
            
            if (products.length === 0) {
                res.status(404).json({ message: 'Nenhum produto encontrado nesta categoria' });
                return;
            }
            
            res.json(products);
        } catch (error) {
            console.error('Erro ao buscar produtos por categoria:', error);
            res.status(500).json({ message: 'Erro ao buscar produtos por categoria' });
        }
    }

    async findByUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.userId);
            
            const products = await this.productService.findProductsByUser(userId);
            
            if (products.length === 0) {
                res.status(404).json({ message: 'Nenhum produto encontrado para este usuário' });
                return;
            }
            
            res.json(products);
        } catch (error) {
            console.error('Erro ao buscar produtos por usuário:', error);
            res.status(500).json({ message: 'Erro ao buscar produtos por usuário' });
        }
    }

    async search(req: Request, res: Response): Promise<void> {
        try {
            const { query } = req.query;
            
            if (!query || typeof query !== 'string') {
                res.status(400).json({ message: 'O parâmetro query é obrigatório na URL.' });
                return;
            }
            
            const products = await this.productService.searchProducts(query);
            
            if (products.length === 0) {
                res.status(404).json({ message: 'Nenhum produto encontrado com os critérios de busca' });
                return;
            }
            
            res.json(products);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).json({ message: 'Erro ao buscar produtos' });
        }
    }
}