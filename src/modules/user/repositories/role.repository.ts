import { Repository } from 'src/@core/repository.core';
import { Role } from '../domain/role.entity';

export interface RoleRepository extends Repository<Role> {
	create(role: Role): Promise<Role>;

	findAll(): Promise<Role[]>;

	findOne(id?: string): Promise<Role>;

	update(role: Role): Promise<Role>;

	remove(role: Role): Promise<void>;
}
