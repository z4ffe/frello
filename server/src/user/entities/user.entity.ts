import * as bcrypt from 'bcrypt'
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import {Comment} from '../../comment/entities/comment.entitiy'
import {Project} from '../../project/entities/project.entity'
import {Role} from '../../role/entities/role.entity'
import {Task} from '../../task/entities/task.entitiy'
import {IUser} from '../interfaces/user.interface'

export enum ERoles {
	Admin = 1,
	User = 2
}

@Entity()
export class User implements IUser {
	@PrimaryGeneratedColumn()
	id: number

	@Column({length: 50, unique: true})
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

	@ManyToOne(() => Role, (role) => role.id, {nullable: false})
	@JoinColumn({name: 'role_id'})
	role: Role

	@OneToMany(() => Project, (project) => project.authorId)
	projects: []

	@OneToMany(() => Task, (task) => task.authorId)
	tasks: []

	@OneToMany(() => Comment, (comment) => comment.authorId)
	comments: Comment[]

	@ManyToMany(() => Project, (project) => project.id)
	projectAssign: Project[]

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

	async validatePassword(password: string) {
		return await bcrypt.compare(password, this.password)
	}
}
