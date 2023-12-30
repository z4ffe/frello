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
	iat: number
	exp: number
}

export interface IUsers {
	id: number
	firstName: string
	lastName: string
	createdAt: string
	projectAssign: boolean
	projectsCount: number
}
