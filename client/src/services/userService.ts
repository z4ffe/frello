import {AxiosResponse} from 'axios'
import {apiInstance} from '../libs/axios/apiInstance.ts'
import {IUsers} from '../types/interfaces/user.interface.ts'

export class UserService {
	async fetchAllUsers(projectId?: number): Promise<IUsers[]> {
		try {
			const response: AxiosResponse<IUsers[]> = await apiInstance.get('/user', {
				params: {
					project: projectId,
				},
			})
			return response.data
		} catch (error) {
			console.error(error)
			throw new Error()
		}
	}
}

export const userService = new UserService()