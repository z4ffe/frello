import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common'
import {Response} from 'express'
import {Cookies} from '../decorators/cookies'
import {AuthService} from './auth.service'
import {LoginDto} from './dto/loginDto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Post('login')
	async login(@Body() body: LoginDto, @Res() res: Response) {
		const {accessToken, refreshToken} = await this.authService.login(body)
		res.status(HttpStatus.OK).cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24,
		}).json({accessToken})
	}

	@Get('refresh')
	async refreshAccessToken(@Cookies('refreshToken') token: string, @Res() res: Response) {
		const {accessToken, refreshToken} = await this.authService.refreshAccessToken(token)
		res.status(HttpStatus.OK).cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24,
		}).json({accessToken})
	}
}
