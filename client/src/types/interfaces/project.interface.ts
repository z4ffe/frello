interface projectAssign {
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
	projectAssign: projectAssign[]
	authorId: {
		id: number
		username: string
	}
}