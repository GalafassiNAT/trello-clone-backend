import { ErrorSchema } from 'src/@core/error.core';

type PasswordErrorNames =
	| 'emptyPassword'
	| 'passwordTooShort'
	| 'invalidPassword';

const passwordErrorSchema: Record<PasswordErrorNames, ErrorSchema> = {
	emptyPassword: {
		statusCode: 400,
		message: 'A senha não pode ser vazia.',
	},
	passwordTooShort: {
		statusCode: 400,
		message: 'A senha deve ter no mínimo 6 caracteres.',
	},
	invalidPassword: {
		statusCode: 400,
		message:
			'O campo senha deve conter uma letra maiúscula, uma letra minúscula, um número e um caractér especial.',
	},
};

export class PasswordError extends Error {
	statusCode: number;

	constructor(name: PasswordErrorNames) {
		const errorSchema = passwordErrorSchema[name];
		super(errorSchema.message);
		this.statusCode = errorSchema.statusCode;
	}

	static get schema() {
		return passwordErrorSchema;
	}
}
