import { Role as RoleEntity } from '../domain/role.entity';
import { Role as PersistentRole } from '@prisma/client';

export class RoleMapper {
	static toDomain(role: PersistentRole) {
		const roleEntity = RoleEntity.create(
			{
				name: role.name,
				accessLevel: role.accessLevel,
			},
			role.id,
		);

		if (roleEntity.wasSuccess()) {
			return roleEntity.data;
		}

		return null;
	}

	static toPersist(role: RoleEntity) {
		return {
			id: role.id,
			name: role.name,
			accessLevel: role.accessLevel,
		};
	}

	static toResponse(role: RoleEntity) {
		return {
			id: role.id,
			name: role.name,
			accessLevel: role.accessLevel,
		};
	}
}
