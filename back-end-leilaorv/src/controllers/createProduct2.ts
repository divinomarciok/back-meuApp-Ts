import {Request, Response} from 'express';  
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/db.datasource';
import { Product } from '../models/product';
import { User } from '../models/user';


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'uploads/');
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const upload = multer({storage: storage});

interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload;
  }
  
    
export const createproduct2 = async (req: CustomRequest, res: Response): Promise<void> => {
      const { name, category, img_url, unidade_measure ,weigth, description } = req.body;
  
      try {
          const productRepository = AppDataSource.getRepository(Product);
          const userRepository = AppDataSource.getRepository(User);
  
  
          if (typeof req.user !== 'object' || req.user === null || !('id' in req.user)) {
              res.status(401).json({ message: 'Usuário não autenticado' });
              return;
          }
          const userId = req.user.id;
  
          // Verifica se o usuário existe
          const user = await userRepository.findOne({ where: { id: userId } });
          if (!user) {
              res.status(404).json({ message: 'Usuário não encontrado' });
              return;
          }
      
          const existingProduct = await productRepository.findOne({ where: { name } });
          if (existingProduct) {
              res.status(400).json({ message: 'Produto já cadastrado' });
              return;
          }
       

          const productData = productRepository.create ({

            name: req.body.name,
            mark: req.body.mark,
            category: req.body.category,
            description: req.body?.description,
            weigth: req.body.weigth,
            img_url: req.file?.path,
            unidade_measure: req.body?.unidade_measure,             
            user: user         
      
   
          })
  
  
         const saveProduct = await productRepository.save(productData);

          res.status(201).json({
              message: 'Produto criado com sucesso!',
              product: { id: saveProduct.id, nomeProd: saveProduct.name, categoriaProd: saveProduct.category },
          });
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Erro ao criar produto' });
      }
  };


