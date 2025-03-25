import { PrismaService } from 'src/shared/infra/providers/prisma/prisma.service';
import { UserRepository } from '../user.repository';
import { User } from '../../domain/user.entity';
import { UserMapper, UserMapperDetailed } from '../../mappers/user.mapper';
import { FindUserDTO } from '../../@types/user.dto';

export class PrismaUserRepository implements UserRepository {
	constructor(private readonly prismaService: PrismaService) {}
	async create(user: User): Promise<User | null> {
		const data = UserMapper.toPersist(user);
		if (!data) {
			return null;
		}
		const createdUser = await this.prismaService.user.create({ data });

		return UserMapper.toDomain(createdUser);
	}
	async findAll(): Promise<User[]> {
		const users = await this.prismaService.user.findMany({
			where: { isDeleted: false },
			include: { roles: true, boards: true, cards: true, allowedBoards: true },
		});

		const usersDomain = users
			.map((user) => UserMapperDetailed.toDomain(user))
			.filter((user): user is User => user !== null);

		return usersDomain;
	}

	async findOne(findOneUserDTO: FindUserDTO): Promise<User | null> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: findOneUserDTO.id,
				email: findOneUserDTO.email,
				isDeleted: false,
			},
		});
		if (!user) {
			return null;
		}
		return UserMapper.toDomain(user);
	}

	async findOneDetailed(findOneUserDTO: FindUserDTO): Promise<User | null> {
		const user = await this.prismaService.user.findUnique({
			where: {
				id: findOneUserDTO.id,
				email: findOneUserDTO.email,
				isDeleted: false,
			},
			include: {
				roles: true,
				boards: true,
				cards: true,
				allowedBoards: true,
			},
		});

		if (!user) {
			return null;
		}

		return UserMapperDetailed.toDomain(user);
	}

	async update(user: User): Promise<User | null> {
		const data = UserMapperDetailed.toPersist(user);

		if (!data) {
			return null;
		}

		const updatedUser = await this.prismaService.user.update({
			where: {
				id: user.id,
			},
			data: {
				email: data?.email,
				name: data?.name,
				password: data?.password,
				profileImage: data?.profileImage,
				roles: {
					connect: (data?.role ?? []).map((role) => ({ id: role.id })),
				},
				boards:
					data.boards && data.boards.connect[0].id !== null
						? {
								connect: data.boards.connect.map((board) => ({ id: board.id })),
							}
						: undefined,
				allowedBoards:
					data.allowedBoards && data.allowedBoards.connect[0].id !== null
						? {
								connect: data.allowedBoards.connect.map((board) => ({
									id: board.id,
								})),
							}
						: undefined,
				cards:
					data.cards && data.cards.connect[0].id !== null
						? {
								connect: data.cards.connect.map((card) => ({ id: card.id })),
							}
						: undefined,
			},
		});

		if (!updatedUser) {
			return null;
		}
		return UserMapper.toDomain(updatedUser);
	}

	async updateRole(user: User): Promise<void> {
		const data = UserMapperDetailed.toPersist(user);
		const userToUpdate = await this.prismaService.user.findUnique({
			where: { id: user.id },
			include: { roles: true },
		});
		await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				roles: {
					set: data?.role.map((role) => ({ id: role.id })),
					disconnect: userToUpdate?.roles
						.filter(
							(existingRole) =>
								!data?.role.some((newRole) => newRole.id === existingRole.id),
						)
						.map((role) => ({ id: role.id })),
				},
			},
		});
	}
	async remove(user: User): Promise<boolean> {
		try {
			await this.prismaService.user.update({
				where: { id: user.id },
				data: { isDeleted: true, deletedAt: new Date(Date.now()) },
			});
			return true;
		} catch {
			return false;
		}
	}
}
