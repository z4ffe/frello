import {User} from '../../user/entities/user.entity'

export interface IProject {
	id: number
	name: string
	authorId: User
	createdAt: Date
	updatedAt: Date
}