import { PriceListRepository } from "../repositories/pricelist.repository";
import { PriceList } from "../models/pricelist";
import { ProductRepository } from "../repositories/product.repository";
import { EnterpriseRepository } from "../repositories/enterprise.repository";
import { UserRepository } from "../repositories/user.respository";

export class PriceListService {
    private priceListRepository: PriceListRepository;
    private productRepository: ProductRepository;
    private enterpriseRepository: EnterpriseRepository;
    private userRepository: UserRepository;

    constructor() {
        this.priceListRepository = new PriceListRepository();
        this.productRepository = new ProductRepository();
        this.enterpriseRepository = new EnterpriseRepository();
        this.userRepository = new UserRepository();
    }

    async createPriceList(priceListData: Partial<PriceList>, userId: number, productId: number, enterpriseId: number): Promise<PriceList> {
        const user = await this.userRepository.findByid(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const product = await this.productRepository.findByid(productId);
        if (!product) {
            throw new Error('Produto não encontrado');
        }

        const enterprise = await this.enterpriseRepository.findByid(enterpriseId);
        if (!enterprise) {
            throw new Error('Empresa não encontrada');
        }

        const priceList = new PriceList();
        priceList.price = priceListData.price!;
        priceList.date_start = priceListData.date_start || new Date();
        priceList.isSale = priceListData.isSale || false;
        priceList.user = user;
        priceList.product = product;
        priceList.enterprise = enterprise;

        return this.priceListRepository.create(priceList);
    }

    async updatePriceList(id: number, priceListData: Partial<PriceList>, productId?: number, enterpriseId?: number): Promise<PriceList | null> {
        const existingPriceList = await this.priceListRepository.findByid(id);

        if (!existingPriceList) {
            throw new Error('Lista de preço não encontrada');
        }

        const updateData: Partial<PriceList> = { ...priceListData };

        if (productId) {
            const product = await this.productRepository.findByid(productId);
            if (!product) {
                throw new Error('Produto não encontrado');
            }
            updateData.product = product;
        }

        if (enterpriseId) {
            const enterprise = await this.enterpriseRepository.findByid(enterpriseId);
            if (!enterprise) {
                throw new Error('Empresa não encontrada');
            }
            updateData.enterprise = enterprise;
        }

        const updateResult = await this.priceListRepository.update(id, updateData);

        if (updateResult) {
            return this.priceListRepository.findByIdWithRelations(id);
        }
        return null;
    }

    async deletePriceList(id: number): Promise<boolean> {
        const priceList = await this.priceListRepository.findByid(id);
        if (!priceList) {
            throw new Error('Lista de preço não encontrada');
        }

        return this.priceListRepository.delete(id);
    }

    async getPriceListById(id: number): Promise<PriceList | null> {
        return this.priceListRepository.findByIdWithRelations(id);
    }

    async listPriceLists(): Promise<PriceList[]> {
        return this.priceListRepository.listWithRelations();
    }

    async listPriceListsSale(): Promise<PriceList[] | null> {
        return this.priceListRepository.findBySale();
    }

    async findPriceListsByProduct(productId: number): Promise<PriceList[]> {
        return this.priceListRepository.findByProductId(productId);
    }

    async findPriceListsByEnterprise(enterpriseId: number): Promise<PriceList[]> {
        return this.priceListRepository.findByEnterpriseId(enterpriseId);
    }
}