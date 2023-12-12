import {User} from '../../user/entities/user.entity'

export interface IProject {
	id: number
	name: string
	description: string
	flagged: boolean
	authorId: User
	deadline: string
	createdAt: Date
	updatedAt: Date
}