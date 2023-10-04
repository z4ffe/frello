import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsString} from 'class-validator'
import {User} from '../../user/entities/user.entity'

export class CreateProjectDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	authorId: Pick<User, 'id'>
}