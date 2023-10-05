import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {CreateCommentDto} from './dto/createCommentDto'
import {Comment} from './entities/comment.entitiy'
import {IFilteredComments} from './interfaces/filtretedComments.interface'

@Injectable()
export class CommentService {
	constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) {
	}

	async findAll(id: string) {
		const commentsList = await this.commentRepository.find({
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
		return this.filterCascadeComments(commentsList)
	}

	async create(body: CreateCommentDto) {
		try {
			const newComment = this.commentRepository.create(body)
			return await this.commentRepository.save(newComment)
		} catch (error) {
			throw new NotFoundException(error.detail)
		}
	}

	filterCascadeComments(commentsList: Comment[]) {
		const result: IFilteredComments[] = commentsList.map(el => {
			return {
				id: el.id,
				text: el.text,
				author: el.authorId,
				parent: el.parentId?.id ? el.parentId?.id : null,
				child: [],
			}
		})
		const filterComments = (commList: IFilteredComments[]) => {
			let result = commList.sort((a, b) => a.id - b.id)
			for (let i = result.length - 1; i >= 0; i--) {
				if (result[i].parent) {
					for (let j = result.length - 1; j >= 0; j--) {
						if (result[i].parent === result[j].id) {
							result[j].child.push(result[i])
							result.splice(i, 1)
							break
						}
					}
				}
			}
			return result
		}
		return filterComments(result)
	}
}
