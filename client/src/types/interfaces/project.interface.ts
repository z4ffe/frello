export interface IProject {
	id: number
	name: string
	createdAt: string
	updatedAt: string
	authorId: {
		id: number
		username: string
	}
}