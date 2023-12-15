import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm'
import {User} from '../../user/entities/user.entity'
import {IProjectAssigned} from '../interfaces/projectAssigned.interface'
import {Project} from './project.entity'

@Entity()
export class ProjectAssignedEntity implements IProjectAssigned {
	@PrimaryColumn({
		name: 'project_id',
	})
	projectId: number

	@PrimaryColumn({
		name: 'user_id',
	})
	userId: number

	@ManyToOne(() => Project, (project) => project.id)
	@JoinColumn({
		name: 'project_id',
		referencedColumnName: 'id',
	})
	projects: Project[]

	@ManyToOne(() => User, (user) => user.id)
	@JoinColumn({
		name: 'user_id',
		referencedColumnName: 'id',
	})
	users: User[]
}
