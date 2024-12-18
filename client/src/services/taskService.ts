import {AxiosResponse} from 'axios'
import {apiInstance} from '../libs/axios/apiInstance.ts'
import {ITask} from '../types/interfaces/task.interface.ts'
import {ETaskStatus} from '../types/taskType.ts'

class TaskService {
	async getAllTasks(id: number) {
		try {
			const response: AxiosResponse<ITask[]> = await apiInstance.get('/task', {
				params: {
					project: id,
				},
			})
			return response.data
		} catch (error) {
			console.error(error)
			throw new Error()
		}
	}

	async getTaskById(id: number) {
		try {
			const response: AxiosResponse<ITask> = await apiInstance.get('/task', {
				params: {
					id: id,
				},
			})
			return response.data
		} catch (error) {
			console.error(error)
			throw new Error()
		}
	}

	async createTask(task: any) {
		try {
			const response: AxiosResponse<void> = await apiInstance.post('/task', task, {})
			return response.data
		} catch (error) {
			console.error(error)
			throw new Error()
		}
	}

	async updateTaskDescription(id: number, text: string) {
		try {
			const response: AxiosResponse<void> = await apiInstance.patch('/task', {
				description: text,
			}, {
				params: {
					id,
				},
			})
			return response.data
		} catch (error) {
			console.error(error)
			throw new Error()
		}
	}


	async updateTaskStatus(id: number, status: ETaskStatus) {
		try {
			const response: AxiosResponse<void> = await apiInstance.patch('/task', {
				status: status,
			}, {
				params: {
					id,
				},
			})
			return response.data
		} catch (error) {
			console.error(error)
			throw new Error()
		}
	}
}

export const taskService = new TaskService()