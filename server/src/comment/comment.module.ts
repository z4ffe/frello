import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthService} from '../auth/auth.service'
import {Role} from '../role/entities/role.entity'
import {RoleService} from '../role/role.service'
import {Task} from '../task/entities/task.entitiy'
import {User} from '../user/entities/user.entity'
import {UserService} from '../user/user.service'
import {CommentController} from './comment.controller'
import {CommentService} from './comment.service'
import {Comment} from './entities/comment.entitiy'

@Module({
	imports: [TypeOrmModule.forFeature([Comment, Task, User, Role])],
	controllers: [CommentController],
	providers: [CommentService, AuthService, UserService, RoleService],
})
export class CommentModule {
}
