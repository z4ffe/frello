import {ERoles} from '../../user/entities/user.entity'

export interface CommentChild {
	id: number
	text: string
	parent: number
	username: string
	role: ERoles
	createdAt: Date
	deleted: boolean
	child: CommentChild[]
}

export interface IFilteredComments {
	id: number
	text: string
	parent: number | null
	username: string
	role: ERoles
	createdAt: Date
	deleted: boolean
	child: CommentChild[]
}