import {Router} from 'express';
import {validateUser} from '../middleware/validateUser';
import {createUser} from '../controllers/createUser';
import {authenticateUser} from '../controllers/authenticateUser';
import {authenticateToken} from '../middleware/authenticateToken'
import {createEnterprise} from '../controllers/createEnterprise';
import { createProduct } from '../controllers/createProduct';
import { validateProduct } from '../middleware/validateProduct';
import {validateEnterpriseProduct} from '../middleware/validateEnterpriseProduct'
import {addEnterpriseProduct} from '../controllers/addEnterpriseProdudct'
import { getAllProducts } from '../controllers/getAllProducts';
import { getAllEnterprises } from '../controllers/getAllEnterprises';
import {getProductById} from '../controllers/getProductById'
import { getEnterpriseProductsByProductId } from '../controllers/getEnterpriseProductsByProductId';
import { uploadImageProduct,storage,upload } from '../controllers/uploadImageProduct';
import { createproduct2 } from '../controllers/createProduct2';
import { createCategory } from '../controllers/createCategory';
const router = Router();

router.post('/createuser',validateUser, createUser);
router.post('/login', authenticateUser);
router.post('/createcategory',authenticateToken,createCategory);
router.post('/createenterprise', authenticateToken, createEnterprise);
router.post('/createproduct',authenticateToken,validateProduct,createProduct);
router.post('/createproduct2', upload.single('file'),authenticateToken,validateProduct,createproduct2);
router.post('/uploadImg', upload.single('file'),authenticateToken,uploadImageProduct);
router.post('/addenterpriseproduct', authenticateToken, validateEnterpriseProduct, addEnterpriseProduct);


router.get('/getAllProducts', authenticateToken, getAllProducts);
router.get('/getEnterprises', authenticateToken, getAllEnterprises);
router.get('/products/:productId', authenticateToken, getProductById)
router.get('/products/:productId/enterprises',authenticateToken, getEnterpriseProductsByProductId);

router.get("/debug", (req, res) => {
    res.status(200).json({ message: "Debug funcionando!" });
  });

export default router;
