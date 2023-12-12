import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty} from 'class-validator'

export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly username: string

	@ApiProperty()
	@IsNotEmpty()
	readonly password: string

	@ApiProperty()
	@IsNotEmpty()
	readonly firstName: string

	@ApiProperty()
	@IsNotEmpty()
	readonly lastName: string

	@ApiProperty()
	@IsNotEmpty()
	readonly country: string

	@ApiProperty()
	readonly avatar: string
}