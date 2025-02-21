import { Result, success } from 'src/@core/result.core';
import { Sanitizer } from 'src/@core/sanitize.core';
import { z } from 'zod';
import { EmailError } from '../errors/email.error';

export type EmailProps = {
	value: string;
};

export class Email extends Sanitizer<EmailProps> {
	private constructor(props: EmailProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}

	/**
	 * Verifica se o email é válido
	 * @param email Email a ser validado
	 * @returns Retorna true se o email é válido, false caso contrário
	 */
	static validate(email: string): boolean {
		const emailRegex = z.string().email();
		return emailRegex.safeParse(email).success;
	}

	static create({ value }: EmailProps): Result<Email, EmailError> {
		const isValid = this.validate(value);
		if (value.length <= 0) {
			return fail(new EmailError('emptyEmail'));
		}

		if (!isValid) {
			return fail(new EmailError('invalidEmail'));
		}

		return success(new Email({ value }));
	}
}
