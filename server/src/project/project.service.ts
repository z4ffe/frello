import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {TokenDto} from '../auth/dto/tokenDto'
import {ERoles} from '../user/entities/user.entity'
import {CreateProjectDto} from './dto/createProjectDto'
import {UpdateProjectDto} from './dto/updateProjectDto'
import {Project} from './entities/project.entity'

@Injectable()
export class ProjectService {
	constructor(@InjectRepository(Project) private readonly projectRepository: Repository<Project>, private readonly jwtService: JwtService) {
	}

	async getAllProjects() {
		return await this.projectRepository.find({
			relations: ['authorId'],
			select: {
				authorId: {
					id: true,
					username: true,
				},
			},
		})
	}


	async addNewProject(body: CreateProjectDto) {
		const {name, authorId} = body
		const newProject = this.projectRepository.create({
			name,
			authorId,
		})
		return await this.projectRepository.save(newProject)
	}

	async updateProjectName(body: UpdateProjectDto, accessToken: string) {
		const {userId} = this.jwtService.decode(accessToken) as TokenDto
		const {name, id, authorId} = body
		if (authorId !== userId) {
			throw new UnauthorizedException('Invalid user identifiers')
		}
		const project = await this.projectRepository.findOneBy({id})
		if (!project) {
			throw new NotFoundException('Project not found')
		}
		return await this.projectRepository.update({id}, {name})
	}

	async removeProjectById(id: string, accessToken: string) {
		const {userId, role} = this.jwtService.decode(accessToken) as TokenDto
		const project = await this.projectRepository.findOneBy({id: +id})
		if (!project) {
			throw new NotFoundException('Project not found')
		}
		console.log(userId)
		if (userId === +project.authorId || role === ERoles.Admin) {
			return await this.projectRepository.delete({id: +id})
		} else {
			throw new UnauthorizedException('Invalid credentials')
		}
	}
}
