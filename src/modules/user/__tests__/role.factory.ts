import { Role, RoleProps } from '../domain/role.entity';

type RoleFactoryGenerateRoleProps = Partial<RoleProps>;

export class RoleFactory {
	static createRole(props?: RoleFactoryGenerateRoleProps): Role | null {
		const role = Role.create({
			name: props?.name ?? 'role',
			accessLevel: props?.accessLevel ?? 0,
		});

		if (role.wasFailure()) {
			return null;
		}

		return role.data;
	}
}
