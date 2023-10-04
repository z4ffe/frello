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

	async findAll() {
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

	async create(body: CreateProjectDto) {
		const {name, authorId} = body
		const newProject = this.projectRepository.create({
			name,
			authorId,
		})
		return await this.projectRepository.save(newProject)
	}

	async updateName(body: UpdateProjectDto, accessToken: string) {
		const {userId} = this.jwtService.decode(accessToken) as TokenDto
		const {name, id, authorId} = body
		if (+authorId !== userId) {
			throw new UnauthorizedException('Invalid user identifiers')
		}
		const project = await this.projectRepository.findOneBy({id})
		if (!project) {
			throw new NotFoundException('Project not found')
		}
		return await this.projectRepository.update({id}, {name})
	}

	async remove(id: string, accessToken: string) {
		const {userId, role} = this.jwtService.decode(accessToken) as TokenDto
		const project = await this.projectRepository.findOne({
			where: {id: +id},
			relations: ['authorId'],
			select: {
				authorId: {id: true},
			},
		})
		if (!project) {
			throw new NotFoundException('Project not found')
		}
		if (userId === +project.authorId.id || role === ERoles.Admin) {
			return await this.projectRepository.delete({id: +id})
		} else {
			throw new UnauthorizedException('Invalid credentials')
		}
	}
}
