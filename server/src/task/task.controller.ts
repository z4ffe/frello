import {Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Patch, Post, Query, UnauthorizedException, UseGuards} from '@nestjs/common'
import {ApiBearerAuth, ApiQuery, ApiTags} from '@nestjs/swagger'
import {DeleteResult} from 'typeorm'
import {AuthGuard} from '../auth/auth.guard'
import {CreateTaskDto} from './dto/CreateTaskDto'
import {UpdateTaskDto} from './dto/UpdateTaskDto'
import {Task} from './entities/task.entitiy'
import {TaskService} from './task.service'

@ApiTags('Task')
@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiQuery({name: 'project', description: 'Project ID', type: Number})
	async getAllTasks(@Query() query: {project: string}): Promise<Task[]> {
		const {project} = query
		if (!project) {
			throw new UnauthorizedException('Project id was not provided')
		}
		return await this.taskService.findAll()
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async createTask(@Body() body: CreateTaskDto): Promise<Task> {
		return await this.taskService.create(body)
	}

	@Patch()
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async updateTask(@Query() query: {id: string}, @Body() body: UpdateTaskDto) {
		const {id} = query
		return await this.taskService.update(id, body)
	}

	@Delete()
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async deleteTask(@Query() query: {id: string}): Promise<DeleteResult> {
		const {id} = query
		if (!id) {
			throw new NotFoundException('Task id was not provided')
		}
		return await this.taskService.remove(id)
	}
}
