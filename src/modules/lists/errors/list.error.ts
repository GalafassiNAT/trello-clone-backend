import { ErrorSchema } from 'src/@core/error.core';

export type ListErrors =
	| 'emptyTitle'
	| 'emptyBoardId'
	| 'emptyOrder'
	| 'invalidOrder'
	| 'invalidList';

const ListErrorSchema: Record<ListErrors, ErrorSchema> = {
	emptyTitle: {
		statusCode: 400,
		message: 'Título não pode ser vazio.',
	},
	emptyBoardId: {
		statusCode: 400,
		message: 'BoardId não pode ser vazio.',
	},
	emptyOrder: {
		statusCode: 400,
		message: 'Order não pode ser vazio.',
	},
	invalidOrder: {
		statusCode: 400,
		message: 'Order inválido.',
	},
	invalidList: {
		statusCode: 400,
		message: 'List inválida.',
	},
};

export class ListError extends Error {
	statusCode: number;

	constructor(name: ListErrors) {
		const errorSchema = ListErrorSchema[name];
		super(errorSchema.message);
		this.statusCode = errorSchema.statusCode;
	}

	static get schema() {
		return ListErrorSchema;
	}
}
