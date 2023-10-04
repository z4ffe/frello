import {ERoles} from '../../user/entities/user.entity'

export class TokenDto {
	readonly userId: number
	readonly username: string
	readonly role: ERoles
	readonly iat: number
	readonly exp: number
}