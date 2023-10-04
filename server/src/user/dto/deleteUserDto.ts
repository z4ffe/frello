import {IsNotEmpty} from 'class-validator'

export class DeleteUserDto {
	@IsNotEmpty()
	readonly username: string

	@IsNotEmpty()
	readonly password: string
}