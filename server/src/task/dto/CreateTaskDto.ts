import {IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString} from 'class-validator'
import {Project} from '../../project/entities/project.entity'
import {User} from '../../user/entities/user.entity'
import {EPriority, ETaskStatus} from '../interfaces/task.interface'

export class CreateTaskDto {
	@IsNotEmpty()
	@IsString()
	readonly title: string

	@IsNotEmpty()
	@IsEnum(ETaskStatus)
	readonly status: ETaskStatus

	@IsNotEmpty()
	@IsNumber()
	readonly taskNumber: number

	@IsNotEmpty()
	@IsString()
	readonly description: string

	@IsNotEmpty()
	@IsString()
	readonly deadline: string

	@IsNotEmpty()
	@IsEnum(EPriority)
	readonly priority: EPriority

	@IsNotEmpty()
	@IsBoolean()
	readonly subtaskAllowed: boolean

	@IsNotEmpty()
	@IsNumber()
	readonly projectId: Pick<Project, 'id'>

	@IsNotEmpty()
	@IsNumber()
	readonly authorId: Pick<User, 'id'>
}