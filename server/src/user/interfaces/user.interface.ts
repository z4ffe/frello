import {Project} from '../../project/entities/project.entity'

export interface IUser {
	id: number
	username: string
	password: string
	projects: Project[]
	createdAt: Date
	updatedAt: Date
}