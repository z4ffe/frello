import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {TokenDto} from '../auth/dto/tokenDto'
import {ERoles, User} from '../user/entities/user.entity'
import {CreateProjectDto} from './dto/createProjectDto'
import {UpdateProjectDto} from './dto/updateProjectDto'
import {UserAssignDto} from './dto/UserAssignDto'
import {Project} from './entities/project.entity'
import {ProjectAssigned} from './entities/project_assigned'

@Injectable()
export class ProjectService {
	constructor(
		@InjectRepository(Project) private readonly projectRepository: Repository<Project>, private readonly jwtService: JwtService,
		@InjectRepository(ProjectAssigned) private readonly projectAssignedRepository: Repository<ProjectAssigned>,
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) {
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
		const {name, authorId, description, deadline, flagged} = body
		const user = await this.userRepository.findOneBy({id: +authorId})
		const newProject = this.projectRepository.create({
			name, authorId, description, deadline, flagged,
		})
		const project = await this.projectRepository.save(newProject)
		await this.projectAssignedRepository.save({userId: user.id, projectId: project.id})
		return {message: 'Project created'}
	}

	async assignUser({userId, projectId}: UserAssignDto, accessToken: string) {
		if (!userId || !projectId) {
			throw new NotFoundException('Something went wrong')
		}
		const project = await this.projectRepository.findOneBy({id: projectId})
		const user = await this.userRepository.findOneBy({id: userId})
		if (!project || !user) {
			throw new NotFoundException('User/Project not found')
		}
		const hasProjectAssigned = await this.projectAssignedRepository.findOne({
			where: {
				userId: user.id,
				projectId: project.id,
			},
		})
		if (hasProjectAssigned) {
			await this.projectAssignedRepository.remove(hasProjectAssigned)
			return {message: 'User unassigned'}
		}
		await this.projectAssignedRepository.save({projectId: project.id, userId: user.id})
		return {message: 'User assigned'}
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
