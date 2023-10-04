import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsNumber, IsString} from 'class-validator'

export class UpdateProjectDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	readonly id: number

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	readonly name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	readonly authorId: number
}