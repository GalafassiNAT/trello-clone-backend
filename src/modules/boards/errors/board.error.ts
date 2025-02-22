import { ErrorSchema } from 'src/@core/error.core';

export type BoardErrors = 'emptyTitle';

const BoardErrorSchema: Record<BoardErrors, ErrorSchema> = {
	emptyTitle: {
		statusCode: 400,
		message: 'Título não pode ser vazio.',
	},
};

export class BoardError extends Error {
	statusCode: number;

	constructor(name: BoardErrors) {
		const errorSchema = BoardErrorSchema[name];
		super(errorSchema.message);
		this.statusCode = errorSchema.statusCode;
	}

	static get schema() {
		return BoardErrorSchema;
	}
}
