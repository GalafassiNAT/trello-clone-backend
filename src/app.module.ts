import { Module } from '@nestjs/common';
import { PrismaService } from './shared/infra/providers/prisma/prisma.service';

@Module({
	imports: [],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
