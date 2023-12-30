import {AxiosResponse} from 'axios'
import {apiInstance} from '../libs/axios/apiInstance.ts'
import {IProject} from '../types/interfaces/project.interface.ts'
import {projectSchemaType} from '../validations/projectSchema.ts'

class ProjectService {
	async getAllProjects(userId: number) {
		const response: AxiosResponse<IProject[]> = await apiInstance.get('/project', {
			params: {
				user: userId,
			},
		})
		return response.data
	}

	async addProject(data: projectSchemaType) {
		const response = await apiInstance.post('/project', data)
		return response.data
	}

	async updateProject(id: number, data: projectSchemaType) {
		const response = await apiInstance.patch('/project', {
			id,
			...data,
		})
		return response.data
	}

	async assignProjectToUser(userId: number, projectId: number) {
		try {
			const response: AxiosResponse<string> = await apiInstance.patch('/project/assign', {userId, projectId})
			return response.data
		} catch (error) {
			console.error(error)
			throw new Error()
		}
	}
}

export const projectService = new ProjectService()