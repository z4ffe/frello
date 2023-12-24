import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
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

	@Column({default: false})
	deleted: boolean
}