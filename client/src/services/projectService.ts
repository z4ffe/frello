import {apiInstance} from '../lib/axios/apiInstance.ts'

class ProjectService {
	async getAllProjects() {
		const response = await apiInstance.get('/project')
		return response.data
	}
}

export const projectService = new ProjectService()