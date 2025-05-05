import { Router } from "express";
import { AuthController} from "../controllers/auth.controller";
import { validateLogin } from "../middleware/validate.login";

const router = Router();
const authController =  new AuthController();

router.post('/login',validateLogin,(req,res)=>authController.login(req,res));

export {router as authRoutes};

