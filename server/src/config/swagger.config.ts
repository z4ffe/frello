import {DocumentBuilder} from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
	.setTitle('Frello API')
	.setDescription('Backend for Frello Project')
	.setVersion('1.0')
	.addTag('api')
	.build()