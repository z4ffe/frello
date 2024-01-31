export const jwtDecode = (token: string) => {
	if (token) {
		return decodeURIComponent(atob(token
			.split('.')[1]
			.replace('-', '+')
			.replace('_', '/'))
			.split('')
			.map(c => `%${('00' + c.charCodeAt(0).toString(16))
				.slice(-2)}`)
			.join(''))
	}
	return ''
}