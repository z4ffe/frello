import {Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards} from '@nestjs/common'
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger'
import {AuthGuard} from '../auth/auth.guard'
import {CommentService} from './comment.service'
import {CreateCommentDto} from './dto/createCommentDto'

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAllComments(@Query() query: {id: string}) {
		const {id} = query
		return this.commentService.findAll(id)
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(AuthGuard)
	@ApiBearerAuth('access-token')
	async addNewComment(@Body() body: CreateCommentDto) {
		return this.commentService.create(body)
	}
}
