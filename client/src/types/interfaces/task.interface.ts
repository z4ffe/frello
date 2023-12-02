import {ETaskPriority, ETaskStatus} from '../taskType.ts'

export interface ITask {
	id: number
	title: string
	description: string
	taskNumber: number
	deadline: string
	subtaskAllowed: boolean
	priority: ETaskPriority
	status: ETaskStatus
	createdAt: string
	updatedAt: string
	authorId: {
		id: number
		username: string
	}
}