import {createParamDecorator, ExecutionContext} from '@nestjs/common'
import {Request} from 'express'

export const Token = createParamDecorator(
	(data: 'accessToken' | 'refreshToken', ctx: ExecutionContext) => {
		if (data === 'accessToken') {
			const request = ctx.switchToHttp().getRequest() as Request
			return request.headers.authorization.split(' ')[1]
		} else if (data === 'refreshToken') {
			const request = ctx.switchToHttp().getRequest()
			return data ? request.cookies?.[data] : request.cookies
		}
	},
)