import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsNumber, IsString} from 'class-validator'

export class UpdateProjectDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	id: number

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	authorId: number
}