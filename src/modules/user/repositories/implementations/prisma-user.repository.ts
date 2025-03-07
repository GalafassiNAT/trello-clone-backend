import { PrismaService } from 'src/shared/infra/providers/prisma/prisma.service';
import { UserRepository } from '../user.repository';
import { User } from '../../domain/user.entity';

export class PrismaUserRepository implements UserRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(user: User): Promise<User> {
		const data = 
	}
}
