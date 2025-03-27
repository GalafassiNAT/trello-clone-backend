import { Repository } from 'src/@core/repository.core';
import { Role } from '../domain/role.entity';

export abstract class RoleRepository extends Repository<Role> {
	abstract create(role: Role): Promise<Role | null>;

	abstract findAll(): Promise<Role[]>;

	abstract findOne(id?: string): Promise<Role | null>;

	abstract update(role: Role): Promise<Role | null>;

	abstract remove(role: Role): Promise<void>;
}
