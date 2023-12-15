import {AxiosResponse} from 'axios'
import {apiInstance} from '../libs/axios/apiInstance.ts'
import {IUsers} from '../types/interfaces/user.interface.ts'

export class UserService {
	async fetchAllUsers(projectId?: number) {
		try {
			const response: AxiosResponse<IUsers[]> = await apiInstance.get('/user', {
				params: {
					project: projectId,
				},
			})
			return response.data
		} catch (error) {
			console.error(error)
		}
	}
}

export const userService = new UserService()