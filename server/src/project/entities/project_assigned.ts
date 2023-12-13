import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm'
import {User} from '../../user/entities/user.entity'
import {IProjectAssigned} from '../interfaces/projectAssigned.interface'
import {Project} from './project.entity'

@Entity()
export class ProjectAssigned implements IProjectAssigned {
	@PrimaryColumn({
		name: 'project_id',
	})
	projectId: number

	@PrimaryColumn({
		name: 'user_id',
	})
	userId: number

	@ManyToOne(() => Project, (project) => project.id, {cascade: true})
	@JoinColumn({
		name: 'project_id',
		referencedColumnName: 'id',
	})
	project: Project

	@ManyToOne(() => User, (user) => user.id, {cascade: true})
	@JoinColumn({
		name: 'user_id',
		referencedColumnName: 'id',
	})
	user: User
}
