import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate as validateEnv } from './config/env-validation';
import { TokenModule } from './shared/infra/providers/token/implementations/token.module';
import { AuthModule } from './modules/user/infra/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './shared/infra/interceptors/response.inteceptor';
import { RoleModule } from './modules/user/infra/role.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			validate: validateEnv,
		}),
		TokenModule,
		AuthModule,
		RoleModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
	],
})
export class AppModule {}
