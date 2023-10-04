import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthService} from '../auth/auth.service'
import {Project} from '../project/entities/project.entity'
import {User} from '../user/entities/user.entity'
import {UserService} from '../user/user.service'
import {Task} from './entities/task.entitiy'
import {TaskController} from './task.controller'
import {TaskService} from './task.service'

@Module({
	imports: [TypeOrmModule.forFeature([User, Project, Task])],
	controllers: [TaskController],
	providers: [TaskService, AuthService, UserService],
})
export class TaskModule {
}
