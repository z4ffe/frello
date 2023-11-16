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

