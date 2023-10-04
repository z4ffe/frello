import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString} from 'class-validator'
import {Project} from '../../project/entities/project.entity'
import {User} from '../../user/entities/user.entity'
import {EPriority, ETaskStatus} from '../interfaces/task.interface'

export class CreateTaskDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly title: string

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum(ETaskStatus)
	readonly status: ETaskStatus

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	readonly taskNumber: number

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly description: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly deadline: string

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum(EPriority)
	readonly priority: EPriority

	@ApiProperty()
	@IsNotEmpty()
	@IsBoolean()
	readonly subtaskAllowed: boolean

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	readonly projectId: Pick<Project, 'id'>

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	readonly authorId: Pick<User, 'id'>
}