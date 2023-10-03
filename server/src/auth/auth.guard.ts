import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {JwtService} from '@nestjs/jwt'
import {AuthService} from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService, private readonly authService: AuthService, private readonly configService: ConfigService) {
	}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const request = ctx.switchToHttp().getRequest()
		const token = await this.authService.extractTokenFromHeader(request)
		try {
			await this.jwtService.verifyAsync(token,
				{
					secret: this.configService.getOrThrow('SECRET_PHRASE'),
				})
		} catch {
			throw new UnauthorizedException('asd')
		}
		return true
	}
}