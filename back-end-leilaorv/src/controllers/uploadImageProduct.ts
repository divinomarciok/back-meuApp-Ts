import {Request,Response } from 'express';
import multer from 'multer';
import { User } from '../models/user';
import jwt  from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload;
}

export const storage = multer.diskStorage({
    destination: (req,file,cb)  => {
        cb(null, 'uploads/');
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
  })
  
 export const upload = multer({storage: storage});

export const uploadImageProduct  = async (req: CustomRequest, res: Response): Promise<void> =>{
    const file = req.file;

    try {

        if(!file){
            res.status(400).json({message: 'Nenhuma imagem selecionada'});  
        }

       

       if(file){
            await res.status(200).json({message: 'Imagem enviada com sucesso', imagePath: req.file?.path});

            
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao fazer upload da imagem'});
    }
}
