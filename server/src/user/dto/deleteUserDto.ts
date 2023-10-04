import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty} from 'class-validator'

export class DeleteUserDto {
	@ApiProperty()
	@IsNotEmpty()
	username: string

	@ApiProperty()
	@IsNotEmpty({})
	password: string
}