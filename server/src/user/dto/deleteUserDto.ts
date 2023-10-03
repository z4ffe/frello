import {IsNotEmpty} from 'class-validator'

export class DeleteUserDto {
	@IsNotEmpty()
	login: string

	@IsNotEmpty({})
	password: string
}