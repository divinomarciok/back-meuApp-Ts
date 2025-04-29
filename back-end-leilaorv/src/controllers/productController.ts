import { Request, Response } from "express";
import { ProductService } from "../service/product.services"; // ou caminho correto

const serviceProduct = new ProductService;

export const productController = {
  create: async (req: Request, res: Response) => {
    try {
      const newProduct = await serviceProduct.create(req.body);
      //return 
      res.status(201).json(newProduct);
    } catch (error: any) {
      //return 
      res.status(400).json({ error: error.message });
    }
  },

  listAll: async (req: Request, res: Response) => {
    try {
      const products = await serviceProduct.findAll();
       res.status(200).json(products);
    } catch (error: any) {
       res.status(500).json({ error: error.message });
    }
  }
};
