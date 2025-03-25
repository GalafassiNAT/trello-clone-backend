import { Module } from '@nestjs/common';
import { HashModule } from 'src/shared/infra/providers/hash/implementations/hash.module';
import { PrismaModule } from 'src/shared/infra/providers/prisma/prisma.module';
import { TokenModule } from 'src/shared/infra/providers/token/implementations/token.module';

@Module({
	imports: [TokenModule, PrismaModule, HashModule],
})
export class UserModule {}
