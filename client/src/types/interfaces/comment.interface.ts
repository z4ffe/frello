export interface IComment {
	id: number;
	text: string;
	username: string;
	role: string;
	createdAt: string;
	parent: number | null;
	deleted: boolean;
	child: IComment[];
}