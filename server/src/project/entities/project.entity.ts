import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {User} from '../../user/entities/user.entity'
import {IProject} from '../interfaces/project.interface'

@Entity()
export class Project implements IProject {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string
	
	@ManyToOne(() => User, (user) => user.projects)
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
