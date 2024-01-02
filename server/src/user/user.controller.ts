import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common'
import {FilesInterceptor} from '@nestjs/platform-express'
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger'
import {AuthGuard} from '../auth/auth.guard'
import {CreateUserDto} from './dto/createUserDto'
import {DeleteUserDto} from './dto/deleteUserDto'
import {UpdateUserDto} from './dto/updateUserDto'
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
	@UseInterceptors(FilesInterceptor('avatar'))
	async createUser(@Body() body: CreateUserDto, @UploadedFiles() avatar: Express.Multer.File[]) {
		return await this.userService.create(body, avatar)
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
