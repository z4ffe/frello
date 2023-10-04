import {IsNotEmpty, IsNumber, IsString} from 'class-validator'
import {User} from '../../user/entities/user.entity'

export class CreateProjectDto {
	@IsNotEmpty()
	@IsString()
	readonly name: string

	@IsNotEmpty()
	@IsNumber()
	readonly authorId: Pick<User, 'id'>
}