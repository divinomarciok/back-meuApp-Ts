import { CategoryRepository } from "../repositories/category.repository";
import { Category } from "../models/category";
import { ProductRepository } from "../repositories/product.repository";

export class CategoryService {
    private categoryRepository: CategoryRepository;
    private productRepository: ProductRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
        this.productRepository = new ProductRepository();
    }



    async createCategory(categoryData: Partial<Category>): Promise<Category> {
        
        const exists = await this.categoryRepository.existsByName(categoryData.name!);
        if (exists) {
            throw new Error('Já existe uma categoria com este nome');
        }

        const category = new Category();
        category.name = categoryData.name!;
        category.description = categoryData.description!;

        return this.categoryRepository.create(category);
    }

   
    async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category | null> {
       
        const existingCategory = await this.categoryRepository.findByid(id);
        if (!existingCategory) {
            throw new Error('Categoria não encontrada');
        }

        if (categoryData.name && categoryData.name !== existingCategory.name) {
            const exists = await this.categoryRepository.existsByName(categoryData.name);
            if (exists) {
                throw new Error('Já existe uma categoria com este nome');
            }
        }
     
        return this.categoryRepository.update(id, categoryData);
    }


    async deleteCategory(id: number): Promise<boolean> {
       
        const category = await this.categoryRepository.findByid(id);
        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        const products = await this.productRepository.findByCategory(id);
        if (products.length > 0) {
            throw new Error('Não é possível excluir a categoria pois existem produtos associados a ela');
        }

        return this.categoryRepository.delete(id);
    }

 
    async getCategoryById(id: number): Promise<Category | null> {
        return this.categoryRepository.findByid(id);
    }


    async listCategories(): Promise<Category[]> {
        return this.categoryRepository.list();
    }

    async findCategoriesByName(name: string): Promise<Category[]> {
        return this.categoryRepository.findByName(name);
    }

    async searchCategories(searchText: string): Promise<Category[]> {
        return this.categoryRepository.searchByText(searchText);
    }
}