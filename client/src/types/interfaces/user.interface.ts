export interface ILoginResponse {
	accessToken: string
}

export interface ITokenPayload {
	userId: number
	login: string
	role: 'user' | 'admin'
	iat: number
	exp: number
}

