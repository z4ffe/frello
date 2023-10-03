import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {Response} from 'express'
import {Cookies} from '../decorators/cookies'
import {UserService} from '../user/user.service'
import {AuthService} from './auth.service'
import {LoginDto} from './dto/loginDto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService, private readonly userService: UserService, private readonly jwtService: JwtService) {
	}

	@Post('login')
	async login(@Body() body: LoginDto, @Res() res: Response) {
		const {accessToken, refreshToken} = await this.authService.login(body)
		res.status(HttpStatus.OK).cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24,
		}).json({accessToken})
	}

	@Get('access-refresh')
	async refreshAccessToken(@Cookies('refreshToken') token: string, @Res() res: Response) {
		const {accessToken, refreshToken} = await this.authService.refreshAccessToken(token)
		res.status(HttpStatus.OK).cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24,
		}).json({accessToken})
	}
}
