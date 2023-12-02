import {AxiosResponse} from 'axios'
import {apiInstance} from '../lib/axios/apiInstance.ts'
import {ITask} from '../types/interfaces/task.interface.ts'

class TaskService {
	async getAllTasks(id: number) {
		const response: AxiosResponse<ITask[]> = await apiInstance.get('/task', {
			params: {
				project: id,
			},
		})
		return response.data
	}
}

export const taskService = new TaskService()