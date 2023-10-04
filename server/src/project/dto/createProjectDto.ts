import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsString} from 'class-validator'
import {User} from '../../user/entities/user.entity'

export class CreateProjectDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	readonly authorId: Pick<User, 'id'>
}