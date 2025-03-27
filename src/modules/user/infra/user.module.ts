import { Module } from '@nestjs/common';
import { HashModule } from 'src/shared/infra/providers/hash/implementations/hash.module';
import { PrismaModule } from 'src/shared/infra/providers/prisma/prisma.module';
import { TokenModule } from 'src/shared/infra/providers/token/implementations/token.module';
import { UserRepository } from '../repositories/user.repository';
import { PrismaService } from 'src/shared/infra/providers/prisma/prisma.service';
import { PrismaUserRepository } from '../repositories/implementations/prisma-user.repository';
import { RoleRepository } from '../repositories/role.repository';
import { PrismaRoleRepository } from '../repositories/implementations/prisma-role.repository';

@Module({
	imports: [TokenModule, PrismaModule, HashModule],
	controllers: [],
	exports: [UserRepository],
	providers: [
		{
			provide: UserRepository,
			useFactory: (prismaService: PrismaService) => {
				return new PrismaUserRepository(prismaService);
			},
			inject: [PrismaService],
		},
		{
			provide: RoleRepository,
			useFactory: (prismaService: PrismaService) => {
				return new PrismaRoleRepository(prismaService);
			},
			inject: [PrismaService],
		},
	],
})
export class UserModule {}
