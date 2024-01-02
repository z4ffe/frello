import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthService} from '../auth/auth.service'
import {FirebaseService} from '../firebase/firebase.service'
import {Role} from '../role/entities/role.entity'
import {RoleService} from '../role/role.service'
import {Task} from '../task/entities/task.entitiy'
import {User} from '../user/entities/user.entity'
import {UserService} from '../user/user.service'
import {Project} from './entities/project.entity'
import {ProjectAssign} from './entities/projectAssign.entity'
import {ProjectController} from './project.controller'
import {ProjectService} from './project.service'

@Module({
	imports: [TypeOrmModule.forFeature([Project, User, ProjectAssign, Task, Role])],
	controllers: [ProjectController],
	providers: [ProjectService, AuthService, UserService, RoleService, FirebaseService],
})
export class ProjectModule {
}
