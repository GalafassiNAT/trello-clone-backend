import { PrismaService } from 'src/shared/infra/providers/prisma/prisma.service';
import { RoleRepository } from '../role.repository';
import { Role } from '../../domain/role.entity';
import { RoleMapper } from '../../mappers/role.mapper';

export class PrismaRoleRepository implements RoleRepository {
	constructor(private readonly prismaService: PrismaService) {}
	async create(role: Role): Promise<Role | null> {
		const data = RoleMapper.toPersist(role);
		if (!data) {
			return null;
		}

		const createdRole = await this.prismaService.role.create({ data });

		return RoleMapper.toDomain(createdRole);
	}
	async findAll(): Promise<Role[]> {
		const roles = await this.prismaService.role.findMany();

		return roles
			.map((roles) => RoleMapper.toDomain(roles))
			.filter((role): role is Role => role !== null);
	}
	async findOne(id?: string): Promise<Role | null> {
		const role = await this.prismaService.role.findUnique({ where: { id } });

		if (!role) {
			return null;
		}

		return RoleMapper.toDomain(role);
	}
	async update(role: Role): Promise<Role | null> {
		const data = RoleMapper.toPersist(role);
		if (!data) {
			return null;
		}

		const updatedRole = await this.prismaService.role.update({
			where: { id: role.id },
			data,
		});

		return RoleMapper.toDomain(updatedRole);
	}
	async remove(role: Role): Promise<void> {
		await this.prismaService.role.delete({ where: { id: role.id } });
	}
}
