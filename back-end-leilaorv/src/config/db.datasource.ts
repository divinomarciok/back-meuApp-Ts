
import { DataSource } from 'typeorm';
import { User } from '../models/user';
import { Enterprise } from '../models/enterprise';
import { Product } from '../models/product';
import {PriceList} from '../models/pricelist'
import {Category} from '../models/category'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
  
  type: 'postgres',  
  host: process.env.DB_HOST || 'localhost', 
  port: parseInt(process.env.DB_PORT || '5432', 10), 
  username: process.env.DB_USERNAME || 'user',  
  password: process.env.DB_PASSWORD || 'password',  
  database: process.env.DB_DATABASE || 'leilao',  
  synchronize: true,
  //logging: ["query", "error"],
  logging:["error"],
  entities: [User,Product,Enterprise,PriceList,Category], // Caminho absoluto para entidades compiladas
  migrations: [path.join(__dirname, "../migrations/*.js"),
    path.join(__dirname, "../migrations/*.ts")
  ], // Caminho absoluto para migrations compiladas
  subscribers: [],  
});

