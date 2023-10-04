import {User} from '../../user/entities/user.entity'

export class CreateProjectDto {
	name: string
	authorId: Pick<User, 'id'>
}