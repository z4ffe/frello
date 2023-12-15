import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthService} from '../auth/auth.service'
import {Task} from '../task/entities/task.entitiy'
import {User} from '../user/entities/user.entity'
import {UserService} from '../user/user.service'
import {Project} from './entities/project.entity'
import {ProjectAssignedEntity} from './entities/projectAssigned.entity'
import {ProjectController} from './project.controller'
import {ProjectService} from './project.service'

@Module({
	imports: [TypeOrmModule.forFeature([Project, User, ProjectAssignedEntity, Task])],
	controllers: [ProjectController],
	providers: [ProjectService, AuthService, UserService],
})
export class ProjectModule {
}
