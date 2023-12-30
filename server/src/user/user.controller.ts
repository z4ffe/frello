import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query, Res, UseGuards} from '@nestjs/common'
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger'
import {Response} from 'express'
import {AuthGuard} from '../auth/auth.guard'
import {CreateUserDto} from './dto/createUserDto'
import {DeleteUserDto} from './dto/deleteUserDto'
import {UpdateUserDto} from './dto/updateUserDto'
import {User} from './entities/user.entity'
import {UserService} from './user.service'

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAssignedUsers(@Query('project') project: string) {
		if (!project) {
			return this.userService.findAll()
		}
		return await this.userService.findAllAssignedToProject(project)
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async createUser(@Body() body: CreateUserDto, @Res() res: Response<Record<string, string>>) {
		const createdUser = await this.userService.create(body)
		return res.json(createdUser)
	}

	@Patch()
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async updatePassword(@Body() body: UpdateUserDto) {
		return await this.userService.updatePassword(body)
	}

	@Delete()
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async deleteUser(@Body() body: DeleteUserDto) {
		return await this.userService.remove(body)
	}
}
