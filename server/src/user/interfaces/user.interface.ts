import {Project} from '../../project/entities/project.entity'
import {Task} from '../../task/entities/task.entitiy'

export interface IUser {
	id: number
	username: string
	password: string
	projects: Project[]
	tasks: Task[]
	createdAt: Date
	updatedAt: Date

	validatePassword: (password: string) => Promise<boolean>
}