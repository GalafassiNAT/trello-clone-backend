import { UseCase } from 'src/@core/use-case.core';
import { RoleRepository } from '../repositories/role.repository';
import { fail, Result, success } from 'src/@core/result.core';
import { RoleError } from '../errors/role.error';
import { RoleMapper } from '../mappers/role.mapper';

export type GetRolesResponse = {
	id: string;
	name: string;
	accessLevel: number;
};

export class GetRolesUseCase implements UseCase {
	constructor(private readonly roleRepository: RoleRepository) {}

	async execute(): Promise<Result<GetRolesResponse[], RoleError>> {
		const roles = await this.roleRepository.findAll();

		if (!roles || roles?.length <= 0) {
			return fail(new RoleError('notFound'));
		}

		const mapped = roles.map((role) => RoleMapper.toResponse(role));

		return success(mapped);
	}
}
