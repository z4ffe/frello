import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {ETokenRoles, TokenDto} from '../auth/dto/tokenDto'
import {Task} from '../task/entities/task.entitiy'
import {ETaskStatus} from '../task/interfaces/task.interface'
import {User} from '../user/entities/user.entity'
import {CreateProjectDto} from './dto/createProjectDto'
import {UpdateProjectDto} from './dto/updateProjectDto'
import {UserAssignDto} from './dto/UserAssignDto'
import {Project} from './entities/project.entity'
import {ProjectAssign} from './entities/projectAssign.entity'
import {IProjectResponse} from './interfaces/project.interface'

@Injectable()
export class ProjectService {
	constructor(
		@InjectRepository(Project) private readonly projectRepository: Repository<Project>, private readonly jwtService: JwtService,
		@InjectRepository(ProjectAssign) private readonly projectAssignedRepository: Repository<ProjectAssign>,
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@InjectRepository(Task) private readonly taskRepository: Repository<Task>,
	) {
	}

	async findAll(userId: number) {
		const projects = await this.projectRepository.find({
			relations: {
				projectAssign: true,
				authorId: true,
			},
			select: {
				projectAssign: {
					id: true,
					username: true,
					firstName: true,
					lastName: true,
					avatar: true,
				},
				authorId: {
					id: true,
					username: true,
				},
			},
			order: {
				flagged: 'DESC',
			},
		})
		return await this.filterAssignedProjects(userId, projects)
	}


	async create(body: CreateProjectDto, accessToken: string) {
		const {name, description, deadline, flagged} = body
		const {userId} = this.jwtService.decode(accessToken) as TokenDto
		const user = await this.userRepository.findOneBy({id: userId})
		const newProject = this.projectRepository.create({
			name,
			description,
			deadline,
			flagged,
			authorId: user,
		})
		const project = await this.projectRepository.save(newProject)
		await this.projectAssignedRepository.save({userId: userId, projectId: project.id})
		return {message: `Project ${newProject.name} created`}
	}

	async assignUser({userId, projectId}: UserAssignDto) {
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

	async update(body: UpdateProjectDto, accessToken: string) {
		const {userId, role} = this.jwtService.decode(accessToken) as TokenDto
		const {id} = body
		const project = await this.projectRepository.findOne({where: {id}, relations: {authorId: true}})
		if (!project) {
			throw new NotFoundException('Project not found')
		}
		const hasProjectAssigned = await this.projectAssignedRepository.findOne({
			where: {
				userId,
				projectId: project.id,
			},
		})
		if (!hasProjectAssigned && role !== ETokenRoles.Admin) {
			throw new BadRequestException('You are not allowed')
		}
		await this.projectRepository.update({id}, {...body})
		return {message: `Project ${project.name} updated`}
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
		if (userId === +project.authorId.id || role === ETokenRoles.Admin) {
			return await this.projectRepository.delete({id: +id})
		} else {
			throw new UnauthorizedException('Invalid credentials')
		}
	}

	async filterAssignedProjects(userId: number, projects: Project[]) {
		const result: IProjectResponse[] = []
		for (let project of projects) {
			const progress = await this.calculateProgress(project.id)
			project.projectAssign.forEach(user => {
				if (user.id === userId) {
					result.push({...project, progress: progress})
				}
			})
		}
		return result
	}

	async calculateProgress(project: number) {
		let completed = 0
		const tasks = await this.taskRepository.find({
			where: {
				projectId: {
					id: project,
				},
			},
		})
		if (!tasks.length) {
			return 0
		}
		tasks.forEach(task => {
			if (task.status === ETaskStatus.Done) {
				completed++
			}
		})
		return Math.round(completed / tasks.length * 100)
	}
}
