import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from '../token.service';
import { JWTTokenService } from './jwt-token.service';

@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: TokenService,
			useFactory: (config: ConfigService) =>
				new JWTTokenService({
					secret: config.get<string>('auth.jwt.secret') || 'defaultSecret',
				}),
			inject: [ConfigService],
		},
	],
	exports: [TokenService],
})
export class TokenModule {}
