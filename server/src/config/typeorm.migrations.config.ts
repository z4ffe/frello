import {ConfigService} from '@nestjs/config'
import {config} from 'dotenv'
import {DataSource} from 'typeorm'
import {Comment} from '../comment/entities/comment.entitiy'
import {Project} from '../project/entities/project.entity'
import {ProjectAssignedEntity} from '../project/entities/projectAssigned.entity'
import {Role} from '../role/entities/role.entity'
import {Task} from '../task/entities/task.entitiy'
import {User} from '../user/entities/user.entity'

config({path: '.env.development'})

const configService = new ConfigService()

const dataSource = new DataSource({
	type: 'postgres',
	host: configService.getOrThrow('DB_URI'),
	port: configService.getOrThrow('DB_PORT'),
	username: configService.getOrThrow('DB_USER'),
	password: configService.getOrThrow('DB_PASSWORD'),
	database: configService.getOrThrow('DB_NAME'),
	entities: [User, Project, Task, Comment, ProjectAssignedEntity, Role],
	migrations: ['./src/migrations/**/*{.ts,.js}'],
	synchronize: false,
	ssl: true,
})

export default dataSource
