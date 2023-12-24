import {Injectable, UnauthorizedException} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {JwtService} from '@nestjs/jwt'
import {Request} from 'express'
import {UserService} from '../user/user.service'
import {LoginDto} from './dto/loginDto'
import {TokenDto} from './dto/tokenDto'


@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {
	}

	async login(body: LoginDto) {
		const {username, password} = body
		const user = await this.userService.findByName(username)
		if (!user) {
			throw new UnauthorizedException('Wrong login or password')
		}
		const isPasswordValid = await user.validatePassword(password)
		if (!isPasswordValid) {
			throw new UnauthorizedException('Wrong login or password')
		}
		const userData = {
			userId: user.id,
			username: user.username,
			role: user.role.name,
		}
		const accessToken = await this.jwtService.signAsync(userData)
		const refreshToken = await this.jwtService.signAsync(userData, {expiresIn: '30d'})
		return {accessToken, refreshToken}
	}

	async refreshTokens(token: string) {
		if (!token) {
			throw new UnauthorizedException('Token is not valid')
		}
		try {
			await this.jwtService.verifyAsync(token, {secret: this.configService.getOrThrow('SECRET_PHRASE')})
		} catch {
			throw new UnauthorizedException('Invalid or expired refresh token')
		}
		const decodedToken = this.jwtService.decode(token) as TokenDto
		const userData = {
			userId: decodedToken.userId,
			username: decodedToken.username,
			role: decodedToken.role,
		}
		const accessToken = await this.jwtService.signAsync(userData)
		const refreshToken = await this.jwtService.signAsync(userData, {expiresIn: '30d'})
		return {accessToken, refreshToken}
	}

	async extractTokenFromHeader(req: Request): Promise<string> {
		if (!req.headers.authorization) {
			throw new UnauthorizedException('Invalid token')
		}
		const [type, token] = req.headers.authorization.split(' ')
		if (type !== 'Bearer' || !token || !token.length) {
			throw new UnauthorizedException('Invalid token')
		}
		return token
	}
}
