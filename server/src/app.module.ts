import {Module} from '@nestjs/common'
import {EnvModule} from './config/config.module'
import {DatabaseModule} from './config/db.module'
import {HealthModule} from './health/health.module'
import {UserModule} from './user/user.module'
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { CommentModule } from './comment/comment.module';
import { TaskModule } from './task/task.module';

@Module({
	imports: [
		EnvModule,
		DatabaseModule,
		UserModule,
		HealthModule,
		AuthModule,
		ProjectModule,
		CommentModule,
		TaskModule,
	],
})
export class AppModule {
}