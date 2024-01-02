import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, MinLength} from 'class-validator'

export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	@MinLength(3)
	readonly username: string

	@ApiProperty()
	@IsNotEmpty()
	@MinLength(4)
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
}