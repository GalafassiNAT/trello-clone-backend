import { Sanitizer } from 'src/@core/sanitize.core';
import { PasswordError } from '../errors/password.error';
import { Result, success } from 'src/@core/result.core';

export type PasswordProps = {
	value: string;
	isHashed?: boolean;
};

export class Password extends Sanitizer<PasswordProps> {
	private constructor(props: PasswordProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}

	get isHashed(): boolean | undefined {
		return this.props.isHashed;
	}

	/**
	 * Verifica se a senha é válida conforme os seguintes critérios:
	 * - Deve ter no mínimo 8 caracteres
	 * - Deve conter pelo menos uma letra maiúscula
	 * - Deve conter pelo menos uma letra minúscula
	 * - Deve conter pelo menos um número
	 * - Deve conter pelo menos um caractér especial
	 * @param password Senha a ser validada
	 * @returns true se a senha é válida, false caso contrário
	 */
	static validate(password: string): boolean {
		return (
			password.length >= 8 &&
			/[A-Z]/.test(password) &&
			/[a-z]/.test(password) &&
			/\d/.test(password) &&
			/[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/.test(password)
		);
	}

	static create({
		value,
		isHashed = false,
	}: PasswordProps): Result<Password, PasswordError> {
		if (isHashed) {
			return success(
				new Password({
					value,
					isHashed,
				}),
			);
		}

		if (value.length <= 0) {
			return fail(new PasswordError('emptyPassword'));
		}

		if (!Password.validate(value)) {
			return fail(new PasswordError('invalidPassword'));
		}

		return success(
			new Password({
				value,
			}),
		);
	}
}
