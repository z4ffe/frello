import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Query, UnprocessableEntityException, UseGuards} from '@nestjs/common'
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger'
import {AuthGuard} from '../auth/auth.guard'
import {CommentService} from './comment.service'
import {CreateCommentDto} from './dto/createCommentDto'
import {UpdateCommentDto} from './dto/updateCommentDto'

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAllComments(@Query() query: {id: string}) {
		const {id} = query
		if (!id) {
			throw new UnprocessableEntityException('ID is not provided')
		}
		return await this.commentService.findAll(id)
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async addNewComment(@Body() body: CreateCommentDto) {
		return await this.commentService.create(body)
	}

	@Patch()
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async updateCommentText(@Query() query: {id: string}, @Body() body: UpdateCommentDto) {
		const {id} = query
		return await this.commentService.update(id, body)
	}

	@Delete()
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async deleteComment(@Query() query: {id: string}) {
		const {id} = query
		return await this.commentService.remove(id)
	}
}
