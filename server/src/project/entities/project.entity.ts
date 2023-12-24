import {Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import {Task} from '../../task/entities/task.entitiy'
import {User} from '../../user/entities/user.entity'
import {IProject} from '../interfaces/project.interface'

@Entity()
export class Project implements IProject {
	@PrimaryGeneratedColumn()
	id: number

	@Column({length: 50})
	name: string

	@Column({length: 255})
	description: string

	@Column({default: false, nullable: true})
	flagged: boolean

	@ManyToOne(() => User, (user) => user.projects)
	@JoinColumn({name: 'author_id'})
	authorId: User

	@OneToMany(() => Task, (task) => task.projectId)
	tasks: []

	@Column()
	deadline: string

	@ManyToMany(() => User, (user) => user.id)
	@JoinTable({
		name: 'project_assign',
		joinColumn: {
			name: 'project_id',
			referencedColumnName: 'id',
		}, inverseJoinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		},
	})
	projectAssign: User[]

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
