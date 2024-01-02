export enum ETokenRoles {
	'Admin' = 'admin',
	'user' = 'user'
}

export class TokenDto {
	readonly userId: number
	readonly username: string
	readonly role: ETokenRoles
	readonly avatar: string
	readonly iat: number
	readonly exp: number
}