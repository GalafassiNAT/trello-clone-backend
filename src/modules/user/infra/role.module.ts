import { Module } from '@nestjs/common';
import { RoleController } from './controller/role.controller';
import { PrismaModule } from 'src/shared/infra/providers/prisma/prisma.module';
import { TokenModule } from 'src/shared/infra/providers/token/implementations/token.module';
import { UserModule } from './user.module';
import { RoleRepository } from '../repositories/role.repository';
import { PrismaRoleRepository } from '../repositories/implementations/prisma-role.repository';
import { PrismaService } from 'src/shared/infra/providers/prisma/prisma.service';
import { GetRolesUseCase } from '../usecases/user.usecase';

@Module({
	imports: [PrismaModule, TokenModule, UserModule],
	controllers: [RoleController],
	exports: [RoleRepository],
	providers: [
		{
			provide: RoleRepository,
			useFactory: (prismaService: PrismaService) => {
				return new PrismaRoleRepository(prismaService);
			},
			inject: [PrismaService],
		},
		{
			provide: GetRolesUseCase,
			useFactory: (roleRepository: RoleRepository) => {
				return new GetRolesUseCase(roleRepository);
			},
			inject: [RoleRepository],
		},
	],
})
export class RoleModule {}
