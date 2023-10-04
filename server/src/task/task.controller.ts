import {Body, Controller} from '@nestjs/common'
import {CreateTaskDto} from './dto/CreateTaskDto'
import {TaskService} from './task.service'

@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {
	}

	async createTask(@Body() body: CreateTaskDto) {
		return this.taskService.addNewTask()
	}
}
