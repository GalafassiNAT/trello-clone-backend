export abstract class HashService {
	/**
	 * Gera uma hash utilizando o provedor de hash configurado.
	 * @param value Valor que será convertido em hash.
	 * @returns Retorna uma Promise com a hash gerada.
	 */
	generateHash: (value: string) => Promise<string>;

	/**
	 * Compara um valor com uma hash utilizando o provedor de hash configurado.
	 * @param value Valor que será comparado com o hash.
	 * @param hashedValue Hash que será comparada com o valor.
	 * @returns Retorna `true` se o valor corresponder à hash, caso contrário, retorna `false`.
	 */
	compareHash: (value: string, hashedValue: string) => Promise<boolean>;
}
