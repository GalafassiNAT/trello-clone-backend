import { ErrorSchema } from 'src/@core/error.core';

export type EmailErrorNames = 'invalidEmail' | 'emptyEmail';

const EmailErrorSchema: Record<EmailErrorNames, ErrorSchema> = {
	invalidEmail: {
		statusCode: 400,
		message: 'E-mail inválido.',
	},
	emptyEmail: {
		statusCode: 400,
		message: 'O e-mail não pode ser vazio.',
	},
};

export class EmailError extends Error {
	statusCode: number;

	constructor(name: EmailErrorNames) {
		const errorSchema = EmailErrorSchema[name];
		super(errorSchema.message);
		this.statusCode = errorSchema.statusCode;
	}

	static get schema() {
		return EmailErrorSchema;
	}
}
