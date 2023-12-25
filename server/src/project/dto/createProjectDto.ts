import {ApiProperty} from '@nestjs/swagger'
import {IsBoolean, IsNotEmpty, IsString} from 'class-validator'

export class CreateProjectDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly description: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly deadline: string

	@ApiProperty()
	@IsBoolean()
	readonly flagged: boolean
}