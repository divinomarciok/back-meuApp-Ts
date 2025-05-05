import {Router} from 'express';
import {createUser} from '../controllers/createUser';
import {authenticateUser} from '../controllers/authenticateUser';
import {authenticateToken} from '../middleware/authenticateToken'
import {createEnterprise} from '../controllers/createEnterprise';
import { validateProduct } from '../middleware/validateProduct';
import {validateEnterpriseProduct} from '../middleware/validateEnterpriseProduct'
import {addPriceList} from '../controllers/addPriceList'
import { getAllProducts } from '../controllers/getAllProducts';
import { getAllEnterprises } from '../controllers/getAllEnterprises';
import {getProductById} from '../controllers/getProductById'
import { getProductPriceList } from '../controllers/getProductPriceList';
import { uploadImageProduct,upload } from '../controllers/uploadImageProduct';
import { createproduct } from '../controllers/createProduct';
import { createCategory } from '../controllers/createCategory';
import { validCategory } from '../middleware/validCategory';
const router = Router();

//router.post('/createuser',validateUser, createUser);
router.post('/login', authenticateUser);
router.post('/createcategory',authenticateToken,validCategory,createCategory);
router.post('/createenterprise', authenticateToken, createEnterprise);
//router.post('/createproduct',authenticateToken,validateProduct,createProduct);
router.post('/uploadImg', upload.single('file'),authenticateToken,uploadImageProduct);
router.post('/addPriceList', authenticateToken, validateEnterpriseProduct, addPriceList); 



router.get('/getEnterprises', authenticateToken, getAllEnterprises);

router.post('/createproduct',authenticateToken,upload.single('file'),validateProduct,createproduct);
router.get('/products/:productId', authenticateToken, getProductById)
router.get('/getAllProducts', authenticateToken, getAllProducts);
router.get('/priceList/:productId',authenticateToken, getProductPriceList);

router.get("/debug", (req, res) => {
    res.status(200).json({ message: "Debug funcionando!" });
  });

export default router;
