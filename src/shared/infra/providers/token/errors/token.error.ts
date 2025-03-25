import { ErrorSchema } from 'src/@core/error.core';

export type TokenErrorNames = 'expiredToken' | 'invalidToken';

const TokenErrorSchema: Record<TokenErrorNames, ErrorSchema> = {
	expiredToken: {
		statusCode: 401,
		message: 'Token expired',
	},
	invalidToken: {
		statusCode: 401,
		message: 'Invalid token',
	},
};

export class TokenError extends Error {
	statusCode: number;

	constructor(name: TokenErrorNames) {
		const errorSchema = TokenErrorSchema[name];
		super(errorSchema.message);
		this.statusCode = errorSchema.statusCode;
	}

	static get schema() {
		return TokenErrorSchema;
	}
}
