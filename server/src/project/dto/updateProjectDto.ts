import {IsNotEmpty, IsNumber, IsString} from 'class-validator'
import {User} from '../../user/entities/user.entity'

export class UpdateProjectDto {
	@IsNotEmpty()
	@IsNumber()
	readonly id: number

	@IsNotEmpty()
	@IsString()
	readonly name: string

	@IsNotEmpty()
	@IsNumber()
	readonly authorId: Pick<User, 'id'>
}