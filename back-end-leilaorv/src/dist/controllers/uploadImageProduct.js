"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageProduct = exports.upload = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
exports.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
exports.upload = (0, multer_1.default)({ storage: exports.storage });
const uploadImageProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    try {
        if (!file) {
            res.status(400).json({ message: 'Nenhuma imagem selecionada' });
        }
        if (file) {
            res.status(200).json({ message: 'Imagem enviada com sucesso', imagePath: file.path });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer upload da imagem' });
    }
});
exports.uploadImageProduct = uploadImageProduct;
