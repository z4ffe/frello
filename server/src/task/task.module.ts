import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Project} from '../project/entities/project.entity'
import {User} from '../user/entities/user.entity'
import {TaskController} from './task.controller'
import {TaskService} from './task.service'

@Module({
	imports: [TypeOrmModule.forFeature([User, Project])],
	controllers: [TaskController],
	providers: [TaskService],
})
export class TaskModule {
}
