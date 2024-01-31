import {z} from 'zod'

export const loginDefaultValues: loginSchemaType = {
	username: '',
	password: '',
}

export const loginSchema = z.object({
	username: z.string()
		.min(3, 'Nickname must be longer than 3 symbols')
		.max(15, 'Nickname must be shorter than 15 symbols')
		.refine((value) => /^[a-zA-Z0-9а-яёА-ЯЁ\-?!_]+[-'s]?[a-zA-Z0-9а-яёА-ЯЁ\-?!_]+$/.test(value), 'Nickname should contain only letters and digits'),
	password: z.string()
		.min(3, 'Nickname must be longer than 1 symbols')
		.refine((value) => /^[a-zA-Z0-9а-яёА-ЯЁ\-?!_]+[-'s]?[a-zA-Z0-9а-яёА-ЯЁ\-?!_]+$/.test(value), 'Nickname should contain only letters and digits'),

})

export type loginSchemaType = z.infer<typeof loginSchema>