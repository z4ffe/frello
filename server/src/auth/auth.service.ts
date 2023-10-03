import {Injectable, UnauthorizedException} from '@nestjs/common'
import {Request} from 'express'

@Injectable()
export class AuthService {
	async login() {
		
	}

	async extractToken(req: Request): Promise<string> {
		if (!req.headers.authorization) {
			throw new UnauthorizedException('Invalid token')
		}
		const [type, token] = req.headers.authorization.split(' ')
		if (type !== 'Bearer' || !token.length) {
			throw new UnauthorizedException('Invalid token')
		}
		return token
	}
}
