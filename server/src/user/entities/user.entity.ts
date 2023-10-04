import * as bcrypt from 'bcrypt'
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Project} from '../../project/entities/project.entity'
import {IUser} from '../interfaces/user.interface'

enum ERoles {
	Admin = 'admin',
	User = 'user'
}

@Entity()
export class User implements IUser {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	username: string

	@Column()
	password: string

	@Column({default: ERoles.User})
	role: ERoles

	@OneToMany(() => Project, (project) => project.authorId)
	projects: []

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
