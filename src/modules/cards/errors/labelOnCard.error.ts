import { ErrorSchema } from 'src/@core/error.core';

export type LabelOnCardsErrors = 'InvalidCardId' | 'InvalidLabelId';

const labelOnCardsErrorSchema: Record<LabelOnCardsErrors, ErrorSchema> = {
	InvalidCardId: {
		statusCode: 400,
		message: 'CardId inválido.',
	},

	InvalidLabelId: {
		statusCode: 400,
		message: 'LabelId inválido.',
	},
};

export class LabelOnCardsError extends Error {
	statusCode: number;

	constructor(name: LabelOnCardsErrors) {
		const errorSchema = labelOnCardsErrorSchema[name];
		super(errorSchema.message);
		this.statusCode = errorSchema.statusCode;
	}

	static get schema() {
		return labelOnCardsErrorSchema;
	}
}
