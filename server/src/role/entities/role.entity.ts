import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import {User} from '../../user/entities/user.entity'
import {IRole} from '../interfaces/role.interface'

@Entity()
export class Role implements IRole {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@OneToMany(() => User, (user) => user.role)
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