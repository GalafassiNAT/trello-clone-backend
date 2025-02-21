import { ErrorSchema } from 'src/@core/error.core';

export type UserErrorNames =
	| 'emptyName'
	| 'notFound'
	| 'alreadyExists'
	| 'invalidCredentials'
	| 'unauthorized'
	| 'cannotDelete';

const UserErrorSchema: Record<UserErrorNames, ErrorSchema> = {
	emptyName: {
		message: 'O nome não pode ser vazio.',
		statusCode: 400,
	},
	notFound: {
		message: 'Usuário não encontrado.',
		statusCode: 404,
	},
	alreadyExists: {
		message: 'Usuário já existe.',
		statusCode: 400,
	},
	invalidCredentials: {
		message: 'Credenciais inválidas.',
		statusCode: 400,
	},
	unauthorized: {
		message: 'Não autorizado.',
		statusCode: 401,
	},
	cannotDelete: {
		message: 'Não é possível deletar o usuário.',
		statusCode: 400,
	},
};

export class UserError extends Error {
	statusCode: number;

	constructor(name: UserErrorNames) {
		const errorSchema = UserErrorSchema[name];
		super(errorSchema.message);
		this.statusCode = errorSchema.statusCode;
	}

	static get schema() {
		return UserErrorSchema;
	}
}
