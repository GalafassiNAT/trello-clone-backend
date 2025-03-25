import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HashService } from '../hash.service';
import { BcryptHashService } from './bcrypt-hash.service';

@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: HashService,
			useFactory: (config: ConfigService) => {
				return new BcryptHashService({
					roundSalt: parseInt(config.get<string>('auth.salt') || '10', 10),
				});
			},
			inject: [ConfigService],
		},
	],
	exports: [HashService],
})
export class HashModule {}
