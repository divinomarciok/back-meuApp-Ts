import { CrudInterface } from "../interfaces/CrudInterface";
import { AppDataSource } from "../config/db.datasource";
import { Product } from "../models/product";
import { User } from "../models/user";
import { Category } from "../models/category";


const productRepo = AppDataSource.getRepository(Product);
const userRepo = AppDataSource.getRepository(User);
const categoRepo = AppDataSource.getRepository(Category);

interface ProductPayload {
    name: string;
    mark: string;
    category: string;
    description?: string;
    weigth: number;
    img_url?: string;
    unidade_measure: string;
    userId: number;
}


export class ProductService implements CrudInterface<Product, ProductPayload> {

    async create(data: ProductPayload): Promise<Product> {
        const { name, mark, category: categoryIdentifier, description, weigth, img_url, unidade_measure, userId } = data;

        const existingProduct = await productRepo.findOne({ where: { name } });
        if (existingProduct) {
            throw new Error(existingProduct.name + " <<< Produto já existe no banco");
        }

        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("Usuário não existe para cadastrar produto")
        }

        const category = await categoRepo.findOne({ where: { name: categoryIdentifier } });
        if (!category) {
            throw new Error("Categoria não existe para cadastro");
        }

        const newProduct = productRepo.create({ name, mark, category, description, weigth, img_url, unidade_measure, user });
        return productRepo.save(newProduct);
    }
    

    async findAll(): Promise<Product[]> {
        return productRepo.find({ relations: ["category", "user"] });
    }

    async findById(id: number): Promise<Product | null> {
        return await productRepo.findOne({ where: { id }, relations: ["category", "user"] });
    }

    async update(id: number, data: Partial<Product>): Promise<Product | null> {
        const product = await productRepo.findOneBy({ id });
        if (!product) return null;

        Object.assign(product, data);
        return productRepo.save(product);
    }
    async delete(id: number): Promise<boolean> {
        const result = await productRepo.delete(id);
        return result.affected !== 0;
    }

}

/*export const createProduct = async (dados: ProductPayload): Promise<Product> => {

    const { name, mark, category: categoryIdentifier, description, weigth, img_url, unidade_measure, userId } = dados;

    const existingProduct = await productRepo.findOne({ where: { name } });
    if (existingProduct) {
        throw new Error("Produto já existe");
    }

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error('Usuário id não existe');
    }

    const category = await categoRepo.findOne({ where: { name: categoryIdentifier } }); // Adjust the 'where' clause based on how you identify categories
    if (!category) {
        throw new Error(`Categoria "${categoryIdentifier}" não encontrada`);
    }

    const product = productRepo.create({
        name,
        mark,
        category,
        description,
        weigth,
        img_url,
        unidade_measure,
        user
    });

    return productRepo.save(product);
}

export const listAllProduct = async (): Promise<Product[]> => {
    return await productRepo.find();
}*/