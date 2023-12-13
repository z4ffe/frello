import * as bcrypt from 'bcrypt'
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Comment} from '../../comment/entities/comment.entitiy'
import {Project} from '../../project/entities/project.entity'
import {Task} from '../../task/entities/task.entitiy'
import {IUser} from '../interfaces/user.interface'

export enum ERoles {
	Admin = 'admin',
	User = 'user'
}

@Entity()
export class User implements IUser {
	@PrimaryGeneratedColumn()
	id: number

	@Column({length: 50})
	username: string

	@Column({name: 'first_name', length: 25})
	firstName: string

	@Column({name: 'last_name', length: 25})
	lastName: string

	@Column({length: 255})
	password: string

	@Column()
	country: string

	@Column({nullable: true})
	avatar: string

	@Column({default: ERoles.User})
	role: ERoles

	@OneToMany(() => Project, (project) => project.authorId)
	projects: []

	@OneToMany(() => Task, (task) => task.authorId)
	tasks: []

	@OneToMany(() => Comment, (comment) => comment.authorId)
	comments: Comment[]

	@ManyToMany(() => Project, (project) => project.id)
	@JoinTable({
		name: 'project_assigned',
		joinColumn: {
			name: 'user_id',
			referencedColumnName: 'id',
		}, inverseJoinColumn: {
			name: 'project_id',
			referencedColumnName: 'id',
		},
	})
	projectsAssigned: Project[]

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

	async validatePassword(password: string) {
		return await bcrypt.compare(password, this.password)
	}
}
