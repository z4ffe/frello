export interface ILoginResponse {
	accessToken: string
}

export interface ILogoutResponse {
	message: string
}

export interface ITokenPayload {
	userId: number
	username: string
	role: 'user' | 'admin'
	avatar: string
	iat: number
	exp: number
}

export interface IUsers {
	id: number
	firstName: string
	lastName: string
	avatar: string
	createdAt: string
	projectAssign: boolean
	projectsCount: number
}
