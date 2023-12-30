import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'

export class UpdateProjectDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	readonly id: number

	@ApiProperty()
	@IsOptional()
	@IsString()
	readonly name: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	readonly description: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	readonly deadline: string

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	readonly flagged: boolean
}