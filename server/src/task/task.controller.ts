import {Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UnauthorizedException, UseGuards} from '@nestjs/common'
import {ApiBearerAuth, ApiBody, ApiQuery, ApiTags} from '@nestjs/swagger'
import {AuthGuard} from '../auth/auth.guard'
import {CreateTaskDto} from './dto/CreateTaskDto'
import {TaskService} from './task.service'

@ApiTags('Task')
@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiQuery({name: 'project', description: 'Project ID', type: Number})
	async getAllTasks(@Query() query: {project: string}) {
		const {project} = query
		if (!project) {
			throw new UnauthorizedException('Project id was not provided')
		}
		return await this.taskService.findAll()
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(AuthGuard)
	@ApiBody({type: CreateTaskDto})
	@ApiBearerAuth('access-token')
	async createTask(@Body() body: CreateTaskDto) {
		return this.taskService.create(body)
	}
}
