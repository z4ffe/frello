import {DocumentBuilder} from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
	.setTitle('Frello API')
	.setDescription('Backend for Frello Project')
	.setVersion('1.0')
	.addBearerAuth(
		{
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
			name: 'JWT',
			description: 'Enter JWT access token',
			in: 'header',
		},
		'access-token',
	)
	.build()