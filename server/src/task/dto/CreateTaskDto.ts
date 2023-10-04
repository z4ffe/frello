import {Project} from '../../project/entities/project.entity'
import {User} from '../../user/entities/user.entity'
import {EPriority, ETaskStatus} from '../interfaces/task.interface'

export class CreateTaskDto {
	title: string
	status: ETaskStatus
	taskNumber: number
	description: string
	deadline: Date
	priority: EPriority
	subtaskAllowed: boolean
	projectId: Project
	authorId: User
}