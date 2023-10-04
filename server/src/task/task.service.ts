import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {CreateTaskDto} from './dto/CreateTaskDto'
import {UpdateTaskDto} from './dto/UpdateTaskDto'
import {Task} from './entities/task.entitiy'

@Injectable()
export class TaskService {
	constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {
	}

	async findAll() {
		return await this.taskRepository.find({
			relations: ['authorId'],
			select: {
				authorId: {
					id: true,
					username: true,
				},
			},
		})
	}

	async update(id: string, body: UpdateTaskDto) {
		const task = await this.taskRepository.findOneBy({id: +id})
		const updatedTask = {...task, ...body}
		return await this.taskRepository.update({id: +id}, {...body})
	}

	async create(body: CreateTaskDto) {
		try {
			const newTask = this.taskRepository.create(body)
			return await this.taskRepository.save(newTask)
		} catch (error) {
			throw new NotFoundException(error.detail)
		}
	}

	async remove(id: string) {
		try {
			return await this.taskRepository.delete({id: +id})
		} catch (error) {
			throw new NotFoundException(error.detail)
		}
	}
}
