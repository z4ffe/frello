import {Role} from '../../role/entities/role.entity'

export interface CommentChild {
	id: number
	text: string
	parent: number
	username: string
	role: Role
	createdAt: Date
	deleted: boolean
	child: CommentChild[]
}

export interface IFilteredComments {
	id: number
	text: string
	parent: number | null
	username: string
	role: Role
	createdAt: Date
	deleted: boolean
	child: CommentChild[]
}