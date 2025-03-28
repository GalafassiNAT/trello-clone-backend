import { UseCase } from 'src/@core/use-case.core';
import { UserRepository } from '../repositories/user.repository';
import { Result, success, fail } from 'src/@core/result.core';
import { UserError } from '../errors/user.error';
import { UserMapperDetailed } from '../mappers/user.mapper';

export type FindDetailedUsersResponse = {
	id: string;
	email: string;
	profileImage?: string;
	role: {
		id: string;
		name: string;
		accessLevel: number;
	}[];
	boards: {
		id: string;
	}[];
	allowedBoards: {
		id: string;
	}[];
	cards: {
		id: string;
	}[];
};
export class GetUsersDetailedUseCase implements UseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(): Promise<Result<FindDetailedUsersResponse[], UserError>> {
		const users = await this.userRepository.findAllDetailed();

		if (!users || users?.length <= 0) {
			return fail(new UserError('notFound'));
		}

		const mapped = users.map((user) => UserMapperDetailed.toResponse(user));

		return success(mapped);
	}
}
