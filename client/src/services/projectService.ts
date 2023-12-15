import {AxiosResponse} from 'axios'
import {apiInstance} from '../libs/axios/apiInstance.ts'
import {IProject} from '../types/interfaces/project.interface.ts'

class ProjectService {
	async getAllProjects(userId: number) {
		const response: AxiosResponse<IProject[]> = await apiInstance.get('/project', {
			params: {
				user: userId,
			},
		})
		return response.data
	}
}

export const projectService = new ProjectService()