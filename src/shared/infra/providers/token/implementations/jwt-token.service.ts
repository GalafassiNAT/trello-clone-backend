import * as jwt from 'jsonwebtoken';
import { TokenService, generateTokenOptions } from '../token.service';
import { fail, Result, success } from 'src/@core/result.core';
import { TokenError } from '../errors/token.error';

export type JWTServiceProps = {
	secret: string;
};

export class JWTTokenService implements TokenService {
	constructor(private readonly props: JWTServiceProps) {}

	generateToken(payload: object, options: generateTokenOptions): string {
		const token = jwt.sign(
			payload,
			this.props.secret,
			options as jwt.SignOptions,
		);
		return token;
	}

	verifyToken(token: string): Result<unknown, TokenError> {
		try {
			return success(jwt.verify(token, this.props.secret));
		} catch (error) {
			if (error instanceof jwt.TokenExpiredError)
				return fail(new TokenError('expiredToken'));

			return fail(new TokenError('invalidToken'));
		}
	}
}
