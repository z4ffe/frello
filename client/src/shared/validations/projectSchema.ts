import {z} from 'zod'

export const projectDefaultValues: projectSchemaType = {
	name: '',
	description: '',
	deadline: new Date(),
	flagged: false,
}

export const projectSchema = z.object({
	name: z.string()
		.min(3, 'Project name must be longer than 5 symbols')
		.max(25, 'Project name must be shorter than 50 symbols'),
	description: z.string()
		.min(5, 'Project description must be longer than 15 symbols')
		.max(100, 'Project description must be shorter than 100 symbols'),
	flagged: z.boolean(),
	deadline: z.date(),
})

export type projectSchemaType = z.infer<typeof projectSchema>