import {Task} from '../../task/entities/task.entitiy'
import {User} from '../../user/entities/user.entity'
import {Comment} from '../entities/comment.entitiy'

export interface IComment {
	id: number
	text: string
	parentId: Comment
	taskId: Task
	authorId: User
	deleted: boolean
}