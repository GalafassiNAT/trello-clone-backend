import { UseCase } from 'src/@core/use-case.core';
import { Role } from '../domain/role.entity';
import { UserRepository } from '../repositories/user.repository';
import { TokenService } from 'src/shared/infra/providers/token/token.service';
import { HashService } from 'src/shared/infra/providers/hash/hash.service';
import { fail, Result, success } from 'src/@core/result.core';
import { UserError } from '../errors/user.error';

export type SignInRequest = {
	email: string;
	password: string;
};

export type SignInResponse = {
	token: string;
	email: string;
	role: Role[];
};

export class SignInUseCase implements UseCase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly hashService: HashService,
		private readonly tokenService: TokenService,
	) {}

	async execute({
		email,
		password,
	}: SignInRequest): Promise<Result<SignInResponse, UserError>> {
		const user = await this.userRepository.findOneDetailed({ email });

		if (!user) {
			return fail(new UserError('notFound'));
		}

		const isValidPassword = await this.hashService.compareHash(
			password,
			user.password.value,
		);

		if (!isValidPassword) {
			return fail(new UserError('invalidCredentials'));
		}

		const token = this.tokenService.generateToken(
			{
				id: user.id,
			},
			{
				expiresIn: '7d',
			},
		);

		return success({
			token,
			email: user.email.value,
			role: user.role,
		});
	}
}
