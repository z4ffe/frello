import {apiHealth} from '../libs/axios/apiHealth.ts'

export class HealthService {
	async healthCheck() {
		return await apiHealth.get('/health')
	}
}

export const healthService = new HealthService()