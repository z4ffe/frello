import {User} from '../../user/entities/user.entity'
import {Project} from '../entities/project.entity'

export class IProjectAssigned {
	projectId: number
	userId: number
	project: Project
	user: User
}