import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {AuthService} from '../auth/auth.service'
import {Task} from '../task/entities/task.entitiy'
import {User} from '../user/entities/user.entity'
import {UserService} from '../user/user.service'
import {CommentController} from './comment.controller'
import {CommentService} from './comment.service'
import {Comment} from './entities/comment.entitiy'

@Module({
	imports: [TypeOrmModule.forFeature([Comment, Task, User])],
	controllers: [CommentController],
	providers: [CommentService, AuthService, UserService],
})
export class CommentModule {
}
