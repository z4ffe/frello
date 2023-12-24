import {ConfigService} from '@nestjs/config'
import {config} from 'dotenv'
import {DataSource} from 'typeorm'

config({
	path: '.env.development',
})

const configService = new ConfigService()

const dataSource = new DataSource({
	type: 'postgres',
	host: configService.getOrThrow('DB_URI'),
	port: configService.getOrThrow('DB_PORT'),
	username: configService.getOrThrow('DB_USER'),
	password: configService.getOrThrow('DB_PASSWORD'),
	database: configService.getOrThrow('DB_NAME'),
	entities: ['./src/**/*{.entity.ts}'],
	migrations: ['./src/migrations/**/*{.ts,.js}'],
	synchronize: false,
	ssl: true,
})

export default dataSource
