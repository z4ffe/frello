import {ERoles} from '../../user/entities/user.entity'

export class TokenDto {
	userId: number
	username: string
	role: ERoles
	iat: number
	exp: number
}