import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthService} from '../auth/auth.service'
import {FirebaseService} from '../firebase/firebase.service'
import {Role} from '../role/entities/role.entity'
import {RoleService} from '../role/role.service'
import {User} from './entities/user.entity'
import {UserController} from './user.controller'
import {UserService} from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([User, Role])],
	controllers: [UserController],
	providers: [UserService, AuthService, RoleService, FirebaseService],
})
export class UserModule {
}
