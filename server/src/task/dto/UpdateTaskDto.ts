import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean, IsEnum, IsOptional, IsString} from 'class-validator'
import {EPriority, ETaskStatus} from '../interfaces/task.interface'

export class UpdateTaskDto {
	@ApiProperty()
	@IsOptional()
	@IsString()
	readonly title?: string

	@ApiProperty()
	@IsOptional()
	@IsEnum(ETaskStatus)
	readonly status?: ETaskStatus

	@ApiProperty()
	@IsOptional()
	@IsString()
	readonly description?: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	readonly deadline?: string

	@ApiProperty()
	@IsOptional()
	@IsEnum(EPriority)
	readonly priority?: EPriority

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	readonly subtaskAllowed?: boolean
}