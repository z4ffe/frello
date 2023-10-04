import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty} from 'class-validator'

export class UpdateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly username: string

	@ApiProperty()
	@IsNotEmpty()
	readonly password: string

	@ApiProperty()
	@IsNotEmpty()
	readonly newPassword: string
}