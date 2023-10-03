import {ValidationPipe} from '@nestjs/common'
import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['warn', 'debug', 'error', 'fatal'],
	})
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe())
	app.setGlobalPrefix('/api')
	await app.listen(5005)
}

bootstrap()
