import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthService} from '../auth/auth.service'
import {User} from './entities/user.entity'
import {UserController} from './user.controller'
import {UserService} from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService, AuthService],
})
export class UserModule {
}
