import { Request, Response } from 'express';
import { PriceListService } from '../service/pricelist.service';

export class PriceListController {
    private priceListService: PriceListService;

    constructor() {
        this.priceListService = new PriceListService();
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const priceListData = req.body;
            const userId = (req as any).user.id;
            const productId = Number(req.body.productId);
            const enterpriseId = Number(req.body.enterpriseId);

            if (!productId || !enterpriseId) {
                res.status(400).json({ message: 'productId e enterpriseId são obrigatórios' });
                return;
            }

            const priceList = await this.priceListService.createPriceList(priceListData, userId, productId, enterpriseId);
            res.status(201).json(priceList);
        } catch (error: any) {
            console.error('Erro ao criar lista de preço:', error);
            res.status(400).json({ message: error.message || 'Erro ao criar lista de preço' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const priceListData = req.body;
            const productId = req.body.productId ? Number(req.body.productId) : undefined;
            const enterpriseId = req.body.enterpriseId ? Number(req.body.enterpriseId) : undefined;

            const updatedPriceList = await this.priceListService.updatePriceList(id, priceListData, productId, enterpriseId);
            
            if (!updatedPriceList) {
                res.status(404).json({ message: 'Lista de preço não encontrada' });
                return;
            }
            
            res.json(updatedPriceList);
        } catch (error: any) {
            console.error('Erro ao atualizar lista de preço:', error);
            res.status(400).json({ message: error.message || 'Erro ao atualizar lista de preço' });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const deleted = await this.priceListService.deletePriceList(id);
            
            if (!deleted) {
                res.status(404).json({ message: 'Lista de preço não encontrada' });
                return;
            }
            
            res.status(204).send();
        } catch (error: any) {
            console.error('Erro ao deletar lista de preço:', error);
            res.status(500).json({ message: error.message || 'Erro ao deletar lista de preço' });
        }
    }

    async findById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const priceList = await this.priceListService.getPriceListById(id);
            
            if (!priceList) {
                res.status(404).json({ message: 'Lista de preço não encontrada' });
                return;
            }
            
            res.json(priceList);
        } catch (error) {
            console.error('Erro ao buscar lista de preço:', error);
            res.status(500).json({ message: 'Erro ao buscar lista de preço' });
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const priceLists = await this.priceListService.listPriceLists();
            res.json(priceLists);
        } catch (error) {
            console.error('Erro ao listar listas de preço:', error);
            res.status(500).json({ message: 'Erro ao listar listas de preço' });
        }
    }

    async listSale(req: Request, res: Response): Promise<void> {
        try {
            const salePriceLists = await this.priceListService.listPriceListsSale();
            res.json(salePriceLists);
        } catch (error) {
            console.error('Erro ao listar listas de preço em promoção', error);
            res.status(500).json({ message: 'Erro ao listar listas de preço em promoção' });
        }
    }

    async findByProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = Number(req.params.productId);
            
            const priceLists = await this.priceListService.findPriceListsByProduct(productId);
            
            if (priceLists.length === 0) {
                res.status(404).json({ message: 'Nenhuma lista de preço encontrada para este produto' });
                return;
            }
            
            res.json(priceLists);
        } catch (error) {
            console.error('Erro ao buscar listas de preço por produto:', error);
            res.status(500).json({ message: 'Erro ao buscar listas de preço por produto' });
        }
    }

    async findByEnterprise(req: Request, res: Response): Promise<void> {
        try {
            const enterpriseId = Number(req.params.enterpriseId);
            
            const priceLists = await this.priceListService.findPriceListsByEnterprise(enterpriseId);
            
            if (priceLists.length === 0) {
                res.status(404).json({ message: 'Nenhuma lista de preço encontrada para esta empresa' });
                return;
            }
            
            res.json(priceLists);
        } catch (error) {
            console.error('Erro ao buscar listas de preço por empresa:', error);
            res.status(500).json({ message: 'Erro ao buscar listas de preço por empresa' });
        }
    }
}