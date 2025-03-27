import { UserRepository } from './../repositories/user.repository';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HashModule } from 'src/shared/infra/providers/hash/implementations/hash.module';
import { PrismaModule } from 'src/shared/infra/providers/prisma/prisma.module';
import { TokenModule } from 'src/shared/infra/providers/token/implementations/token.module';
import { AuthController } from './controller/auth.controller';
import { PrismaService } from 'src/shared/infra/providers/prisma/prisma.service';
import { PrismaUserRepository } from '../repositories/implementations/prisma-user.repository';
import { SignUpUseCase } from '../usecases/signUp.usecase';
import { HashService } from 'src/shared/infra/providers/hash/hash.service';
import { TokenService } from 'src/shared/infra/providers/token/token.service';
import { SignInUseCase } from '../usecases/signIn.usecase';

@Module({
	imports: [ConfigModule, HashModule, TokenModule, PrismaModule],
	controllers: [AuthController],
	providers: [
		{
			provide: UserRepository,
			useFactory: (prismaService: PrismaService) =>
				new PrismaUserRepository(prismaService),
			inject: [PrismaService],
		},
		{
			provide: SignUpUseCase,
			useFactory: (
				userRepository: UserRepository,
				tokenService: TokenService,
				hashService: HashService,
			) => new SignUpUseCase(userRepository, tokenService, hashService),
			inject: [UserRepository, TokenService, HashService],
		},
		{
			provide: SignInUseCase,
			useFactory: (
				userRepository: UserRepository,
				hashService: HashService,
				tokenService: TokenService,
			) => new SignInUseCase(userRepository, hashService, tokenService),
			inject: [UserRepository, HashService, TokenService],
		},
	],
})
export class AuthModule {}
