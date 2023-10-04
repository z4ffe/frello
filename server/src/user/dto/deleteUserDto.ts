import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty} from 'class-validator'

export class DeleteUserDto {
	@ApiProperty()
	@IsNotEmpty()
  @IsString()
	readonly username: string
  
  @ApiProperty()
	@IsNotEmpty()
  @IsString()
	readonly password: string

	@ApiProperty()
	@IsNotEmpty()
  @IsString()
	readonly password: string
}