import { Repository } from 'src/@core/repository.core';
import { Role } from '../domain/role.entity';

export interface RoleRepository extends Repository<Role> {
	create(role: Role): Promise<Role | null>;

	findAll(): Promise<Role[]>;

	findOne(id?: string): Promise<Role | null>;

	update(role: Role): Promise<Role | null>;

	remove(role: Role): Promise<void>;
}
