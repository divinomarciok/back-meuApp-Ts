import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product";
import { CategoryRepository } from "../repositories/category.repository";
import { UserRepository } from "../repositories/user.respository";
import fs from 'fs';
import path from 'path';

export class ProductService {
    private productRepository: ProductRepository;
    private categoryRepository: CategoryRepository;
    private userRepository: UserRepository;

    constructor() {
        this.productRepository = new ProductRepository();
        this.categoryRepository = new CategoryRepository();
        this.userRepository = new UserRepository();
    }

    async createProduct(productData: Partial<Product>, userId: number, categoryId?: number, filePath?: string): Promise<Product> {
        
        const user = await this.userRepository.findByid(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        
        const product = new Product();
        product.name = productData.name!;
        product.mark = productData.mark!;
        product.category = productData.category;
        product.description = productData.description;
        product.unidade_measure = productData.unidade_measure;
        product.weigth = productData.weigth;
        product.isSale = productData.isSale!;
        product.user = user;
        if (filePath) {
        product.img_url = filePath;
        }
        
        if (categoryId) {
            const category = await this.categoryRepository.findByid(categoryId);
            if (!category) {
                throw new Error('Categoria não encontrada');
            }
            product.category = category;
        }

        return this.productRepository.create(product);
    }

    async updateProduct(id: number, productData: Partial<Product>, categoryId?: number, filePath?: string): Promise<Product | null> {

        const existingProduct = await this.productRepository.findByid(id);

        if (!existingProduct) {
            throw new Error('Produto não encontrado');
        }
        
        if (filePath && existingProduct.img_url) {
            try {
                const oldFilePath = path.resolve(existingProduct.img_url);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            } catch (error) {
                console.error('Erro ao remover arquivo antigo:', error);
            }
        }
        
        const updateData: Partial<Product> = { ...productData, };        
        
        if (filePath) {
            updateData.img_url = filePath;
        }

        if (categoryId) {
            const category = await this.categoryRepository.findByid(categoryId);
            if (!category) {
                throw new Error('Categoria não encontrada');
            }
            updateData.category = category;
        }

        const updateResult = await this.productRepository.update(id, updateData);

        if (updateResult) {
            return this.productRepository.findByIdWithRelations(id);
        }
        return null;
        
    }

    async deleteProduct(id: number): Promise<boolean> {

        const product = await this.productRepository.findByid(id);
        if (!product) {
            throw new Error('Produto não encontrado');
        }

        if (product.img_url) {
            try {
                const filePath = path.resolve(product.img_url);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            } catch (error) {
                console.error('Erro ao remover arquivo:', error);
            }
        }

        return this.productRepository.delete(id);
    }

    async getProductById(id: number): Promise<Product | null> {
        return this.productRepository.findByIdWithRelations(id);
    }

    async listProducts(): Promise<Product[]> {
        return this.productRepository.listWithRelations();
    }

    async listProductsSale(): Promise<Product[] | null>{
        return this.productRepository.findBySale();
    }

    async findProductsByName(name: string): Promise<Product[]> {
        return this.productRepository.findByName(name);
    }

    async findProductsByMark(mark: string): Promise<Product[]> {
        return this.productRepository.findByMark(mark);
    }

    async findProductsByCategory(categoryId: number): Promise<Product[]> {
        return this.productRepository.findByCategory(categoryId);
    }

    async findProductsByUser(userId: number): Promise<Product[]> {
        return this.productRepository.findByUser(userId);
    }

    async searchProducts(searchText: string): Promise<Product[]> {
        return this.productRepository.searchByText(searchText);
    }
}