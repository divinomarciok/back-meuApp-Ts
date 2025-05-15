import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsSaleToProduct1747104684088 implements MigrationInterface {
    name = 'AddIsSaleToProduct1747104684088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "isSale" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "isSale"`);
    }

}
