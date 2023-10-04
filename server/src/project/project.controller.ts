import {Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, UseGuards} from '@nestjs/common'
import {AuthGuard} from 'src/auth/auth.guard'
import {Token} from '../decorators/token'
import {CreateProjectDto} from './dto/createProjectDto'
import {UpdateProjectDto} from './dto/updateProjectDto'
import {ProjectService} from './project.service'

@Controller('project')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAllProjects() {
		try {
			return await this.projectService.getAllProjects()
		} catch {
			throw new NotFoundException('Something went wrong')
		}
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(AuthGuard)
	async createProject(@Body() body: CreateProjectDto) {
		return await this.projectService.addNewProject(body)
	}

	@Patch()
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	async updateProject(@Body() body: UpdateProjectDto, @Token('accessToken') accessToken: string) {
		return await this.projectService.updateProjectName(body, accessToken)
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	async deleteProject(@Param() param: {id: string}, @Token('accessToken') accessToken: string) {
		const {id} = param
		return await this.projectService.removeProjectById(id, accessToken)
	}
}
