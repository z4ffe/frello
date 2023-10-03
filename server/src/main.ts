import {ValidationPipe} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import {AppModule} from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['warn', 'debug', 'error', 'fatal'],
	})
	app.enableCors()
	app.use(cookieParser())
	app.useGlobalPipes(new ValidationPipe())
	app.setGlobalPrefix('/api')
	await app.listen(5005)
}

bootstrap()
