interface ProjectAssigned {
	id: number
	username: string
	avatar: null | string
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
	projectAssigned: ProjectAssigned[]
	authorId: {
		id: number
		username: string
	}
}