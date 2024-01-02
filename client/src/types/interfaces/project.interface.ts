interface Users {
	id: number
	username: string
	firstName: string
	lastName: string
	avatar: string
}

export interface IProject {
	id: number
	name: string
	description: string
	flagged: boolean
	progress: number
	deadline: string
	createdAt: string
	updatedAt: string
	projectAssign: Users[]
	authorId: {
		id: number
		username: string
	}
}