import {Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {UserService} from '../user/user.service'
import {AuthService} from './auth.service'
import {LoginDto} from './dto/loginDto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService, private readonly userService: UserService, private readonly jwtService: JwtService) {
	}

	@Post()
	@HttpCode(HttpStatus.OK)
	async login(@Body() body: LoginDto) {
		const {login, password} = body
		const user = await this.userService.findUserByLogin(login)
		if (!user) {
			throw new UnauthorizedException('Wrong login or password')
		}
		const isPasswordValid = await user.validatePassword(password)
		if (!isPasswordValid) {
			throw new UnauthorizedException('Wrong login or password')
		}
		const userData = {
			userId: user.id,
			login: user.login,
			role: user.role,
		}
		const accessToken = await this.jwtService.signAsync(userData)
		return {accessToken}
	}
}
