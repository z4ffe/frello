import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Comment} from '../../comment/entities/comment.entitiy'
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

	@ManyToOne(() => Project, (project) => project.tasks, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({name: 'project_id'})
	projectId: Project

	@ManyToOne(() => User, (user) => user.tasks)
	@JoinColumn({name: 'author_id'})
	authorId: User

	@OneToMany(() => Comment, (comment) => comment.taskId)
	comments: Comment[]

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