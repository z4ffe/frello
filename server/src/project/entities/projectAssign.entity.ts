import {CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm'
import {User} from '../../user/entities/user.entity'
import {IProjectAssigned} from '../interfaces/projectAssigned.interface'
import {Project} from './project.entity'

@Entity()
export class ProjectAssign implements IProjectAssigned {
	@PrimaryColumn({
		name: 'project_id',
	})
	projectId: number

	@PrimaryColumn({
		name: 'user_id',
	})
	userId: number

	@ManyToOne(() => Project, (project) => project.projectAssign, {onDelete: 'CASCADE'})
	@JoinColumn({
		name: 'project_id',
		referencedColumnName: 'id',
	})
	project: Project

	@ManyToOne(() => User, (user) => user.projectAssign, {onDelete: 'CASCADE'})
	@JoinColumn({
		name: 'user_id',
		referencedColumnName: 'id',
	})
	user: User

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp',
	})
	createdAt: Date

	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamp',
	})
	updatedAt: Date
}
