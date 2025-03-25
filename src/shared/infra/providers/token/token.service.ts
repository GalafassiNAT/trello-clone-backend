import { Result } from 'src/@core/result.core';
import { TokenError } from './errors/token.error';

export interface generateTokenOptions {
	expiresIn: number | string;
}

export abstract class TokenService {
	/**
	 * Gera um token utilizando o provedor de token configurado
	 * @param payload Dados que são inseridos no token.
	 * @param options Opções para a geração do token, como o tempo de expiração.
	 * @returns Retorna o token gerado.
	 */
	generateToken: (payload: object, options?: generateTokenOptions) => string;

	/**
	 * Verifica se um token é valido utilizando o provedor de token configurado.
	 * @param token Token que será verificado.
	 * @returns Dados que foram inseridos no token.
	 */
	verifyToken: (token: string) => Result<unknown, TokenError>;
}
