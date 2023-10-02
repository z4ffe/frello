import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from '../user/entities/user.entity'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.getOrThrow('DB_URI'),
				port: configService.getOrThrow('DB_PORT'),
				username: configService.getOrThrow('DB_USER'),
				password: configService.getOrThrow('DB_PASSWORD'),
				database: configService.getOrThrow('DB_NAME'),
				entities: [User],
				synchronize: true,
				ssl: true,
			}),
		}),
	],
})

export class DatabaseModule {
}