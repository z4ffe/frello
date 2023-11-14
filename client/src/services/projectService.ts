import {AxiosResponse} from 'axios'
import {apiInstance} from '../lib/axios/apiInstance.ts'
import {IProject} from '../types/interfaces/project.interface.ts'

class ProjectService {
	async getAllProjects() {
		const response: AxiosResponse<IProject[]> = await apiInstance.get('/project')
		return response.data
	}
}

export const projectService = new ProjectService()