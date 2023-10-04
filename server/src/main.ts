import {ValidationPipe} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {NestFactory} from '@nestjs/core'
import {SwaggerModule} from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import {AppModule} from './app.module'
import {swaggerConfig} from './config/swagger.config'

async function bootstrap() {
	const PREFIX = new ConfigService().getOrThrow('PREFIX')
	const app = await NestFactory.create(AppModule, {
		logger: ['warn', 'debug', 'error', 'fatal'],
	})
	app.enableCors()
	app.use(cookieParser())
	app.useGlobalPipes(new ValidationPipe())
	app.setGlobalPrefix(`${PREFIX}`)
	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup(`${PREFIX}/docs`, app, document)
	await app.listen(5005)
}

bootstrap()
