import {MigrationInterface, QueryRunner} from 'typeorm'

export class Migrations1703053789424 implements MigrationInterface {
	name = 'Migrations1703053789424'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "testCol"`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "role" ADD "testCol" character varying NOT NULL`)
	}
}
