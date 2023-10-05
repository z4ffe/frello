import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Task} from '../../task/entities/task.entitiy'
import {User} from '../../user/entities/user.entity'
import {IComment} from '../interfaces/comment.interface'

@Entity()
export class Comment implements IComment {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	text: string

	@ManyToOne(() => Task, (task) => task.comments)
	@JoinColumn({name: 'task_id'})
	taskId: Task

	@ManyToOne(() => User, (user) => user.comments)
	@JoinColumn({name: 'author_id'})
	authorId: User

	@ManyToOne(() => Comment, (comment) => comment.parentId, {nullable: true})
	@JoinColumn({name: 'parent_id'})
	parentId: Comment

	@OneToMany(() => Comment, (comment) => comment.childComments)
	childComments: Comment[]


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

	@Column({default: false})
	deleted: boolean
}