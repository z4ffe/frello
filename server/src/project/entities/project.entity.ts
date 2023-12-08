import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Task} from '../../task/entities/task.entitiy'
import {User} from '../../user/entities/user.entity'
import {IProject} from '../interfaces/project.interface'

@Entity()
export class Project implements IProject {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	/* @Column()
	description: string */

	@ManyToOne(() => User, (user) => user.projects, {})
	@JoinColumn({name: 'author_id'})
	authorId: User

	@OneToMany(() => Task, (task) => task.projectId)
	tasks: []

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
