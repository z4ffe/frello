import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {IRole} from '../interfaces/role.interface'

@Entity()
export class Role implements IRole {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string
}