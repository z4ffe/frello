import {Module} from '@nestjs/common'
import {EnvModule} from './config/config.module'
import {DatabaseModule} from './config/db.module'
import {HealthModule} from './health/health.module'
import {UserModule} from './user/user.module'
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		EnvModule,
		DatabaseModule,
		UserModule,
		HealthModule,
		AuthModule,
	],
})
export class AppModule {
}