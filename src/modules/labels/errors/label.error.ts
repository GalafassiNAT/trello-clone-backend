import { ErrorSchema } from 'src/@core/error.core';

export type LabelErrorNames = 'emptyName' | 'emptyColor';

const LabelErrorSchema: Record<LabelErrorNames, ErrorSchema> = {
	emptyName: {
		message: 'O nome não pode ser vazio.',
		statusCode: 400,
	},
	emptyColor: {
		message: 'A cor não pode ser vazia.',
		statusCode: 400,
	},
};

export class LabelError extends Error {
	statusCode: number;

	constructor(name: LabelErrorNames) {
		const errorSchema = LabelErrorSchema[name];
		super(errorSchema.message);
		this.statusCode = errorSchema.statusCode;
	}

	static get schema() {
		return LabelErrorSchema;
	}
}
