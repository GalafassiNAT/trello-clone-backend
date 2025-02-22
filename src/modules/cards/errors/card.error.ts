import { ErrorSchema } from 'src/@core/error.core';

export type CardErrors =
	| 'emptyTitle'
	| 'emptyListId'
	| 'emptyOrder'
	| 'invalidOrder'
	| 'invalidCard'
	| 'invalidCardDueDate'
	| 'invalidCardOrder';

const CardErrorSchema: Record<CardErrors, ErrorSchema> = {
	emptyTitle: {
		statusCode: 400,
		message: 'Título não pode ser vazio.',
	},
	emptyListId: {
		statusCode: 400,
		message: 'ListId não pode ser vazio.',
	},
	emptyOrder: {
		statusCode: 400,
		message: 'Order não pode ser vazio.',
	},
	invalidOrder: {
		statusCode: 400,
		message: 'Order inválido.',
	},
	invalidCard: {
		statusCode: 400,
		message: 'Card inválido.',
	},
	invalidCardDueDate: {
		statusCode: 400,
		message: 'Data de vencimento do card inválida.',
	},
	invalidCardOrder: {
		statusCode: 400,
		message: 'Ordem do card inválida.',
	},
};

export class CardError extends Error {
	statusCode: number;

	constructor(name: CardErrors) {
		const errorSchema = CardErrorSchema[name];
		super(errorSchema.message);
		this.statusCode = errorSchema.statusCode;
	}

	static get schema() {
		return CardErrorSchema;
	}
}
