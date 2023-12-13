import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsNumber} from 'class-validator'

export class UserAssignDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	readonly userId: number

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	readonly projectId: number
}