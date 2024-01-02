import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthService} from '../auth/auth.service'
import {FirebaseService} from '../firebase/firebase.service'
import {User} from '../user/entities/user.entity'
import {UserService} from '../user/user.service'
import {Role} from './entities/role.entity'
import {RoleController} from './role.controller'
import {RoleService} from './role.service'

@Module({
	imports: [TypeOrmModule.forFeature([Role, User])],
	controllers: [RoleController],
	providers: [RoleService, AuthService, UserService, FirebaseService],
})
export class RoleModule {
}
