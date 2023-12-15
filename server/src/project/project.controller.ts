import {BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query, UseGuards} from '@nestjs/common'
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger'
import {AuthGuard} from 'src/auth/auth.guard'
import {Token} from '../decorators/token'
import {CreateProjectDto} from './dto/createProjectDto'
import {UpdateProjectDto} from './dto/updateProjectDto'
import {UserAssignDto} from './dto/UserAssignDto'
import {ProjectService} from './project.service'

@ApiTags('Project')
@Controller('project')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAllProjects(@Query() query: {user: string}) {
		const {user} = query
		if (isNaN(+user)) {
			throw new BadRequestException()
		}
		return await this.projectService.findAll(+user)
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async createProject(@Body() body: CreateProjectDto) {
		return await this.projectService.create(body)
	}

	@Patch('/assign')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async assignUserToProject(@Body() body: UserAssignDto, @Token('accessToken') accessToken: string) {
		return await this.projectService.assignUser(body, accessToken)
	}

	@Patch()
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async updateProject(@Body() body: UpdateProjectDto, @Token('accessToken') accessToken: string) {
		return await this.projectService.updateName(body, accessToken)
	}

	@Delete('')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async deleteProject(@Query() query: {id: string}, @Token('accessToken') accessToken: string) {
		const {id} = query
		return await this.projectService.remove(id, accessToken)
	}
}
