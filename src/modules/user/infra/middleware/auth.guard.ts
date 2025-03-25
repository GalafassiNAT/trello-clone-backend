/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
	CanActivate,
	ExecutionContext,
	HttpException,
	Injectable,
} from '@nestjs/common';
import { TokenService } from 'src/shared/infra/providers/token/token.service';
import { UserRepository } from '../../repositories/user.repository';
import { UserError } from '../../errors/user.error';
import { UserTokenPayload } from '../../@types/user.dto';
import { TokenError } from 'src/shared/infra/providers/token/errors/token.error';
import { Result } from 'src/@core/result.core';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly tokenService: TokenService,
		private readonly userRepository: UserRepository,
	) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new HttpException(
				{
					statusCode: UserError.schema.unauthorized.statusCode,
					message: UserError.schema.unauthorized.message,
					data: null,
				},
				UserError.schema.unauthorized.statusCode,
			);
		}

		const payload = this.tokenService.verifyToken(token) as Result<
			UserTokenPayload,
			TokenError
		>;

		if (payload.wasFailure()) {
			throw new HttpException(
				{
					statusCode: UserError.schema.unauthorized.statusCode,
					message: UserError.schema.unauthorized.message,
					data: null,
				},
				UserError.schema.unauthorized.statusCode,
			);
		}

		const user = await this.userRepository.findOneDetailed({
			id: payload.data.id,
		});

		if (!user) {
			throw new HttpException(
				{
					statusCode: UserError.schema.notFound.statusCode,
					message: UserError.schema.notFound.message,
					data: null,
				},
				UserError.schema.notFound.statusCode,
			);
		}

		request.user = user;

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers['authorization']?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
