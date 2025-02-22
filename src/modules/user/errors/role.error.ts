import { ErrorSchema } from 'src/@core/error.core';

export type RoleErrors = 'emptyRole' | 'invalidRole';

const RoleErrorSchema: Record<RoleErrors, ErrorSchema> = {
	emptyRole: {
		statusCode: 400,
		message: 'Role não pode ser vazio.',
	},
	invalidRole: {
		statusCode: 400,
		message: 'Role inválido.',
	},
};

export class RoleError extends Error {
	statusCode: number;

	constructor(name: RoleErrors) {
		const errorSchema = RoleErrorSchema[name];
		super(errorSchema.message);
		this.statusCode = errorSchema.statusCode;
	}

	static get schema() {
		return RoleErrorSchema;
	}
}
