import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from '../user/entities/user.entity'
import {UserService} from '../user/user.service'
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'

@Module({
	imports: [
		ConfigModule,
		TypeOrmModule.forFeature([User]),
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
		JwtModule.register({
			secret: new ConfigService().getOrThrow<string>('SECRET_PHRASE'),
			global: true,
			signOptions: {
				expiresIn: '30m',
			},
		})],
	providers: [AuthService, UserService],
	controllers: [AuthController],
})
export class AuthModule {
}
