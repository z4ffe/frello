export const validateJSON = (json: string): boolean => {
	let isValidate: boolean
	try {
		JSON.parse(json)
		isValidate = true
	} catch (e) {
		isValidate = false
	}
	return isValidate
}