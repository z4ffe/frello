import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Project} from '../../project/entities/project.entity'
import {User} from '../../user/entities/user.entity'
import {EPriority, ETaskStatus, ITask} from '../interfaces/task.interface'

@Entity()
export class Task implements ITask {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column()
	description: string

	@Column({name: 'task_number'})
	taskNumber: number

	@Column()
	deadline: Date

	@Column()
	subtaskAllowed: boolean

	@Column()
	priority: EPriority

	@Column()
	status: ETaskStatus

	@ManyToOne(() => Project, (project) => project.tasks)
	@JoinColumn({name: 'project_id'})
	projectId: Project

	@ManyToOne(() => User, (user) => user.tasks)
	@JoinColumn({name: 'author_id'})
	authorId: User

	@Column({
		name: 'created_at',
		default: () => 'CURRENT_TIMESTAMP(3)',
	})
	createdAt: Date

	@Column({
		name: 'updated_at',
		default: () => 'CURRENT_TIMESTAMP(3)',
		onUpdate: 'CURRENT_TIMESTAMP(3)',
	})
	updatedAt: Date
}