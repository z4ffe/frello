export interface CommentChild {
	id: number
	text: string
	parent: number
	child: CommentChild[]
}

export interface IFilteredComments {
	id: number
	text: string
	parent: number
	child: CommentChild[]
}