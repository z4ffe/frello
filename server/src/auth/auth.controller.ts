import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common'
import {ApiTags} from '@nestjs/swagger'
import {Response} from 'express'
import {Cookies} from '../decorators/cookies'
import {AuthService} from './auth.service'
import {LoginDto} from './dto/loginDto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	private readonly cookiesAge: number = 1000 * 60 * 60 * 24 * 30

	constructor(private readonly authService: AuthService) {
	}

	@Post('login')
	async login(@Body() body: LoginDto, @Res() res: Response) {
		const {accessToken, refreshToken} = await this.authService.login(body)
		res.status(HttpStatus.OK).cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: this.cookiesAge,
		}).json({accessToken})
	}

	@Get('refresh')
	async refreshAccessToken(@Cookies('refreshToken') token: string, @Res() res: Response) {
		const {accessToken, refreshToken} = await this.authService.refreshTokens(token)
		res.status(HttpStatus.OK).cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: this.cookiesAge,
		}).json({accessToken})
	}

	@Get('logout')
	async logout(@Res() res: Response) {
		res.status(HttpStatus.OK).clearCookie('refreshToken').json({message: 'Succesfully logged out'})
	}
}
