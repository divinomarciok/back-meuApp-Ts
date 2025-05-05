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
exports.InitialStructure1742759879076 = void 0;
class InitialStructure1742759879076 {
    constructor() {
        this.name = 'InitialStructure1742759879076';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "login" character varying(255) NOT NULL, "senha" character varying(255) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "enterprise" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "address" character varying(100) NOT NULL, "cep" character varying(10) NOT NULL, "cnpj" character varying(20) NOT NULL, "user_id" integer, CONSTRAINT "UQ_86043f34205352313021ef2bc1d" UNIQUE ("cnpj"), CONSTRAINT "PK_09687cd306dc5d486c0e227c471" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(100) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(100), "unidade_measure" character varying(20), "weigth" numeric(10,2), "category_id" integer, "user_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "price_list" ("id" SERIAL NOT NULL, "isSale" boolean NOT NULL, "price" numeric(10,2) NOT NULL, "date_start" date NOT NULL, "product_id" integer, "enterprise_id" integer, "user_id" integer, CONSTRAINT "PK_52ea7826468b1c889cb2c28df03" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "enterprise" ADD CONSTRAINT "FK_3bd39b4d525d5a48491e726082f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "price_list" ADD CONSTRAINT "FK_b3a3fb4da26314b9f9c5a1135b2" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "price_list" ADD CONSTRAINT "FK_14eebe3cf0633330a1568bd71f8" FOREIGN KEY ("enterprise_id") REFERENCES "enterprise"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "price_list" ADD CONSTRAINT "FK_a79287eb5be7f4909ee2e60ddcf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "price_list" DROP CONSTRAINT "FK_a79287eb5be7f4909ee2e60ddcf"`);
            yield queryRunner.query(`ALTER TABLE "price_list" DROP CONSTRAINT "FK_14eebe3cf0633330a1568bd71f8"`);
            yield queryRunner.query(`ALTER TABLE "price_list" DROP CONSTRAINT "FK_b3a3fb4da26314b9f9c5a1135b2"`);
            yield queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"`);
            yield queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
            yield queryRunner.query(`ALTER TABLE "enterprise" DROP CONSTRAINT "FK_3bd39b4d525d5a48491e726082f"`);
            yield queryRunner.query(`DROP TABLE "price_list"`);
            yield queryRunner.query(`DROP TABLE "products"`);
            yield queryRunner.query(`DROP TABLE "category"`);
            yield queryRunner.query(`DROP TABLE "enterprise"`);
            yield queryRunner.query(`DROP TABLE "users"`);
        });
    }
}
exports.InitialStructure1742759879076 = InitialStructure1742759879076;
