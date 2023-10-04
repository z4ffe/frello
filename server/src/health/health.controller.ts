import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common'
import {ApiTags} from '@nestjs/swagger'

@ApiTags('Health')
@Controller('health')
export class HealthController {
	constructor() {
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async healthCheck() {
		return 'OK'
	}
}
