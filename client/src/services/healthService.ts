import {apiInstance} from '../lib/axios/apiInstance.ts'

export class HealthService {
	async healthCheck() {
		const response = await apiInstance.get('/health')
		return {
			data: response.data,
			status: response.status,
		}
	}
}

export const healthService = new HealthService()