import {IsNotEmpty} from 'class-validator'

export class UpdateUserDto {
	@IsNotEmpty()
	login: string

	@IsNotEmpty()
	password: string

	@IsNotEmpty()
	newPassword: string
}