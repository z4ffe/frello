import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1703053347843 implements MigrationInterface {
    name = 'Migrations1703053347843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" ADD "testCol" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "testCol"`);
    }

}
