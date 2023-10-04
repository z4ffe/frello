import {Project} from '../../project/entities/project.entity'
import {User} from '../../user/entities/user.entity'

export enum ETaskStatus {
	Queue = 'queue',
	Development = 'dev',
	Done = 'done'
}

export enum EPriority {
	Low = 'low',
	Medium = 'med',
	High = 'high'
}

export interface ITask {
	id: number
	title: string
	status: ETaskStatus
	taskNumber: number
	description: string
	deadline: Date
	priority: EPriority
	subtaskAllowed: boolean
	projectId: Project
	authorId: User
	createdAt: Date
	updatedAt: Date
}