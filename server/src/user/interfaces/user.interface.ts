import {Comment} from '../../comment/entities/comment.entitiy'
import {Project} from '../../project/entities/project.entity'
import {Task} from '../../task/entities/task.entitiy'

export interface IUser {
	id: number
	username: string
	firstName: string
	lastName: string
	avatar: string
	country: string
	password: string
	projects: Project[]
	projectsAssigned: []
	tasks: Task[]
	comments: Comment[]
	createdAt: Date
	updatedAt: Date

	validatePassword: (password: string) => Promise<boolean>
}