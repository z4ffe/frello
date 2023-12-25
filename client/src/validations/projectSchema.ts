import {z} from 'zod'

export const projectDefaultValues: projectSchemaType = {
	title: '',
	description: '',
}

export const projectSchema = z.object({
	title: z.string()
		.min(3, 'Project name must be longer than 5 symbols')
		.max(15, 'Project name must be shorter than 50 symbols')
		.refine((value) => /^[a-zA-Z0-9а-яёА-ЯЁ\-?!_]+[-'s]?[a-zA-Z0-9а-яёА-ЯЁ\-?!_]+$/.test(value), 'Nickname should contain only letters and digits'),
	description: z.string()
		.min(15, 'Project description must be longer than 15 symbols')
		.max(100, 'Project description must be shorter than 100 symbols'),
})

export type projectSchemaType = z.infer<typeof projectSchema>