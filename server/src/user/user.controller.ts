import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Res} from '@nestjs/common'
import {Response} from 'express'
import {CreateUserDto} from './dto/createUserDto'
import {DeleteUserDto} from './dto/deleteUserDto'
import {UpdateUserDto} from './dto/updateUserDto'
import {User} from './entities/user.entity'
import {UserService} from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAllUser() {
		return await this.userService.getAllUsers()
	}

	@Post()
	async createUser(@Body() body: CreateUserDto, @Res() res: Response<User>) {
		const createdUser = await this.userService.createUser(body)
		return res.status(HttpStatus.OK).json(createdUser)
	}

	@Patch()
	@HttpCode(HttpStatus.OK)
	async updatePassword(@Body() body: UpdateUserDto) {
		return await this.userService.updateUserPassword(body)
	}

	@Delete()
	@HttpCode(HttpStatus.OK)
	async deleteUser(@Body() body: DeleteUserDto) {
		return await this.userService.removeUserByLogin(body)
	}
}
