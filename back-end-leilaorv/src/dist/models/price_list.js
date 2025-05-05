"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceList = void 0;
const typeorm_1 = require("typeorm");
const enterprise_1 = require("./enterprise");
const product_1 = require("./product");
const user_1 = require("./user");
let PriceList = class PriceList {
};
exports.PriceList = PriceList;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PriceList.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_1.Product, (product) => product.id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_1.Product)
], PriceList.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => enterprise_1.Enterprise, (enterprise) => enterprise.id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'enterprise_id' }),
    __metadata("design:type", enterprise_1.Enterprise)
], PriceList.prototype, "enterprise", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], PriceList.prototype, "isSale", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PriceList.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], PriceList.prototype, "date_start", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.id, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_1.User)
], PriceList.prototype, "user", void 0);
exports.PriceList = PriceList = __decorate([
    (0, typeorm_1.Entity)('price_list')
], PriceList);
