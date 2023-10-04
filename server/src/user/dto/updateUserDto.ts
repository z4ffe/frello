import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty} from 'class-validator'

export class UpdateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	username: string

	@ApiProperty()
	@IsNotEmpty()
	password: string

	@ApiProperty()
	@IsNotEmpty()
	newPassword: string
}