import {Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Patch, Post, Query, UseGuards} from '@nestjs/common'
import {ApiBearerAuth, ApiOperation, ApiQuery, ApiTags} from '@nestjs/swagger'
import {DeleteResult} from 'typeorm'
import {AuthGuard} from '../auth/auth.guard'
import {CreateTaskDto} from './dto/CreateTaskDto'
import {UpdateTaskDto} from './dto/UpdateTaskDto'
import {Task} from './entities/task.entitiy'
import {ITask} from './interfaces/task.interface'
import {TaskService} from './task.service'

@ApiTags('Task')
@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiQuery({name: 'project', description: 'Project ID', type: Number, required: false})
	@ApiQuery({name: 'task', description: 'Task ID', type: Number, required: false})
	@ApiOperation({description: 'Method accept only request with TaskID or with ProjectID. Request with Task ID return task by ID and request with Project ID returns all tasks in this project'})
	async getAllTasks(@Query() query: {project: string, id: string}): Promise<Task[] | ITask> {
		const {project, id} = query
		if (!project && !id) {
			throw new NotFoundException('Project ID or Task ID not found')
		}
		if (id) {
			return await this.taskService.findOne(id)
		}
		return await this.taskService.findAll(project)
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
			throw new NotFoundException('Task ID is wrong')
		}
		return await this.taskService.remove(id)
	}
}
