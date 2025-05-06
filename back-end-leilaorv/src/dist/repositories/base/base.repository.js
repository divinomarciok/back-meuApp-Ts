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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(repository) {
        this.repository = repository;
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = this.repository.create(item);
            return this.repository.save(entity);
        });
    }
    findByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { id: id }
            });
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateResult = yield this.repository.update(id, item);
            if (updateResult.affected && updateResult.affected > 0) {
                return this.findByid(id);
            }
            return null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.delete(Number(id));
            return result.affected ? result.affected > 0 : false;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
}
exports.BaseRepository = BaseRepository;
