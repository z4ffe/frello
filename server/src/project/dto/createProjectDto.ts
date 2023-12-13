import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean, IsNotEmpty, IsNumber, IsString} from 'class-validator'
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

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly description: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly deadline: string

	@ApiProperty()
	@IsBoolean()
	readonly flagged: boolean
}