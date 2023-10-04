import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'
import {Task} from '../../task/entities/task.entitiy'
import {User} from '../../user/entities/user.entity'
import {Comment} from '../entities/comment.entitiy'

export class CreateCommentDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	text: string

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	taskId: Pick<Task, 'id'>

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	authorId: Pick<User, 'id'>

	@ApiProperty()
	@IsNumber()
	@IsOptional()
	parentId: Pick<Comment, 'id'>
}