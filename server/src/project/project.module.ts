import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthService} from '../auth/auth.service'
import {User} from '../user/entities/user.entity'
import {UserService} from '../user/user.service'
import {Project} from './entities/project.entity'
import {ProjectController} from './project.controller'
import {ProjectService} from './project.service'

@Module({
	imports: [TypeOrmModule.forFeature([Project, User])],
	controllers: [ProjectController],
	providers: [ProjectService, AuthService, UserService],
})
export class ProjectModule {
}
