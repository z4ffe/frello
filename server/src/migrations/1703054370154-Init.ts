import {MigrationInterface, QueryRunner} from 'typeorm'

export class Init1703054370154 implements MigrationInterface {
	name = 'Init1703053789424'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`INSERT INTO role (id, name) VALUES (1, 'admin'), (2, 'user');`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}
}
