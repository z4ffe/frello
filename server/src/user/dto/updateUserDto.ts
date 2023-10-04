import {IsNotEmpty} from 'class-validator'

export class UpdateUserDto {
	@IsNotEmpty()
	readonly username: string

	@IsNotEmpty()
	readonly password: string

	@IsNotEmpty()
	readonly newPassword: string
}