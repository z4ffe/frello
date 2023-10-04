import {ValidationPipe} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {SwaggerModule} from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import {AppModule} from './app.module'
import {swaggerConfig} from './config/swagger.config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['warn', 'debug', 'error', 'fatal'],
	})
	app.enableCors()
	app.use(cookieParser())
	app.useGlobalPipes(new ValidationPipe())
	app.setGlobalPrefix('/api')
	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('/swagger', app, document)
	await app.listen(5005)
}

bootstrap()
