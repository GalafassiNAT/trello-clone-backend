/**
 * @module result
 * @description
 * Módulo responsável por implementar o Padrão Result, que é um tipo de dado que retorna um sucesso ou falha.
 */
class SuccessResult<S, E> {
	readonly data: S;

	constructor(data: S) {
		this.data = data;
	}

	wasSuccess(): this is SuccessResult<S, E> {
		return true;
	}

	wasFailure(): this is FailResult<S, E> {
		return false;
	}
}

/**
 * @module result
 * @description
 * Módulo responsável por implementar o Padrão Result, que é um tipo de dado que retorna um sucesso ou falha.
 */
class FailResult<S, E> {
	readonly data: E;

	constructor(data: E) {
		this.data = data;
	}

	wasSuccess(): this is SuccessResult<S, E> {
		return false;
	}

	wasFailure(): this is FailResult<S, E> {
		return true;
	}
}

/**
 * Result é um tipo de dado que pode ser um sucesso ou falha. Caso seja um sucesso, o tipo de dado é S, caso seja uma falha, o tipo de dado é E.
 * As abreviações S e E significam Success e Error respectivamente.
 *
 * @desc Este padrão se chama originalmente como Either monad (conceito tirado dentro da programação funcional), mas foi renomeado e adaptado para Result para que seja mais fácil de entender.
 *
 * @param S Tipo de dado que será retornado caso seja um sucesso
 * @param E Tipo de dado que será retornado caso seja uma falha
 *
 * @example
 * // Exemplo de uso de Result
 *
 * // Função que retorna um Result
 * function divide(a: number, b: number): Result<number, string> {
 *  if (b === 0) {
 *   // Caso seja uma falha, retorna uma string (tipo E, ou o lado direito do Result)
 *   return fail('Não é possível dividir por 0');
 *  }
 *
 *  // Caso seja um sucesso, retorna um número (tipo S, ou o lado esquerdo do Result)
 *  return success(a / b);
 * }
 *
 * // Chamada da função divide
 * const result = divide(10, 2);
 *
 * // Verifica se o resultado foi um sucesso
 * if (result.wasSuccess()) {
 *  // É implicado que o tipo de dado é number, pois foi verificado que o resultado foi um sucesso, então o tipo de dado é o lado esquerdo do Result (tipo S, neste caso number)
 *  // Caso seja um sucesso, imprime o resultado
 *  console.log(result.data);
 * } else {
 *  // É implicado que o tipo de dado é string, pois foi verificado que o resultado foi uma falha, então o tipo de dado é o lado direito do Result (tipo E, neste caso string)
 *  // Caso seja uma falha, imprime o erro
 *  console.log(result.data);
 * }
 */
export type Result<S, E> = SuccessResult<S, E> | FailResult<S, E>;

/**
 * Função que retorna um Result de sucesso com o tipo de dado S.
 * @param data Dado que será retornado no Result
 * @returns Result de sucesso com o tipo de dado S.
 */
export function success<S, E>(data: S): Result<S, E> {
	return new SuccessResult<S, E>(data);
}

/**
 * Função que retorna um Result de falha com o tipo de dado E.
 * @param data Dado que será retornado no Result
 * @returns Result de falha com o tipo de dado E.
 */
export function fail<S, E>(data: E): Result<S, E> {
	return new FailResult<S, E>(data);
}
