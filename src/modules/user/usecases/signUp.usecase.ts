import { UseCase } from 'src/@core/use-case.core';
import { Role } from '../domain/role.entity';
import { UserRepository } from '../repositories/user.repository';
import { TokenService } from 'src/shared/infra/providers/token/token.service';
import { HashService } from 'src/shared/infra/providers/hash/hash.service';
import { UserError } from '../errors/user.error';
import { EmailError } from '../errors/email.error';
import { PasswordError } from '../errors/password.error';
import { Password } from '../domain/password.sanitizer';
import { fail, Result, success } from 'src/@core/result.core';
import { Email } from '../domain/email.sanitizer';
import { User } from '../domain/user.entity';

export type SignUpRequest = {
	email: string;
	password: string;
	name: string;
	profileImage?: string;
};

export type SignUpResponse = {
	token: string;
	email: string;
	role: Role[];
};

export class SignUpUseCase implements UseCase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly tokenService: TokenService,
		private readonly hashService: HashService,
	) {}

	async execute({
		email,
		password,
		name,
		profileImage,
	}: SignUpRequest): Promise<
		Result<SignUpResponse, UserError | EmailError | PasswordError>
	> {
		const passwordSanitized = Password.create({ value: password });

		if (passwordSanitized.wasFailure()) {
			return fail(passwordSanitized.data);
		}

		const emailSanitized = Email.create({ value: email });

		if (emailSanitized.wasFailure()) {
			return fail(emailSanitized.data);
		}

		const user = User.create({
			email: emailSanitized.data,
			password: passwordSanitized.data,
			name,
			profileImage,
		});

		if (user.wasFailure()) {
			return fail(user.data);
		}

		const userAlreadyExists = await this.userRepository.findOne({
			email: user.data.email.value,
		});

		if (userAlreadyExists) {
			return fail(new UserError('alreadyExists'));
		}

		const hashedPassword = await this.hashService.generateHash(
			user.data.password.value,
		);

		const hashedPasswordSanitized = Password.create({
			value: hashedPassword,
			isHashed: true,
		});

		if (hashedPasswordSanitized.wasFailure())
			return fail(hashedPasswordSanitized.data);

		const persistentUser = User.create({
			email: user.data.email,
			password: hashedPasswordSanitized.data,
			name: user.data.name,
			profileImage: user.data.profileImage,
		});

		if (persistentUser.wasFailure()) return fail(persistentUser.data);

		await this.userRepository.create(persistentUser.data);

		const token = this.tokenService.generateToken(
			{
				id: persistentUser.data.id,
			},
			{
				expiresIn: '7d',
			},
		);

		return success({
			token,
			email: persistentUser.data.email.value,
			role: persistentUser.data.role,
		});
	}
}
