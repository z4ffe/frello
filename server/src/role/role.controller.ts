import {BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common'
import {AuthGuard} from '../auth/auth.guard'
import {CreateRoleDto} from './dto/CreateRoleDto'
import {RoleService} from './role.service'

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {
	}

	@Post()
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.CREATED)
	async addNewRole(@Body() body: CreateRoleDto) {
		if (!body.name) {
			throw new BadRequestException('Something went wrong')
		}
		return this.roleService.create(body)
	}
}
