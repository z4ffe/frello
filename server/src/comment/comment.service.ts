import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {CreateCommentDto} from './dto/createCommentDto'
import {UpdateCommentDto} from './dto/updateCommentDto'
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
				createdAt: true,
				deleted: true,
				parentId: {
					id: true,
				},
				authorId: {
					username: true,
					role: true,
				},
			},
			relations: ['parentId', 'authorId'],
			order: {
				id: 'ASC',
			},
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

	async update(id: string, {text}: UpdateCommentDto) {
		try {
			return this.commentRepository.update({id: +id}, {text})
		} catch (error) {
			throw new NotFoundException(error.detail)
		}

	}

	async remove(id: string) {
		try {
			return this.commentRepository.update({id: +id}, {
				text: 'Comment deleted',
				deleted: true,
			})
		} catch (error) {
			throw new NotFoundException(error.detail)
		}

	}

	filterCascadeComments(commentsList: Comment[]) {
		const resultList: IFilteredComments[] = commentsList.map(el => {
			return {
				id: el.id,
				text: el.text,
				username: el.authorId.username,
				role: el.authorId.role,
				createdAt: el.createdAt,
				parent: el.parentId?.id ? el.parentId?.id : null,
				deleted: el.deleted,
				child: [],
			}
		})
		const filterComments = (commList: IFilteredComments[]) => {
			let result = commList
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
		return filterComments(resultList)
	}
}
