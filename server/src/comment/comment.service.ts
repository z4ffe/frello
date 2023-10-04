import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {CreateCommentDto} from './dto/createCommentDto'
import {Comment} from './entities/comment.entitiy'

@Injectable()
export class CommentService {
	constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {
	}

	async findAll(id: string) {
		return await this.commentRepository.find({
			where: {
				taskId: {
					id: +id,
				},
			},
			select: {
				id: true,
				text: true,
				parentId: {
					id: true,
				},
			},
			relations: ['parentId'],
		})
	}

	async create(body: CreateCommentDto) {
		try {
			const newComment = this.commentRepository.create(body)
			return await this.commentRepository.save(newComment)
		} catch (error) {
			throw new NotFoundException(error.detail)
		}
	}
}
