import { ErrorSchema } from 'src/@core/error.core';

export type BoardEditorErrors = 'invalidBoardId' | 'invalidEditorId';

const boardEditorErrorSchema: Record<BoardEditorErrors, ErrorSchema> = {
	invalidBoardId: {
		statusCode: 400,
		message: 'BoardId inválido.',
	},

	invalidEditorId: {
		statusCode: 400,
		message: 'EditorId inválido.',
	},
};

export class BoardEditorError extends Error {
	statusCode: number;

	constructor(name: BoardEditorErrors) {
		const errorSchema = boardEditorErrorSchema[name];
		super(errorSchema.message);
		this.statusCode = errorSchema.statusCode;
	}

	static get schema() {
		return boardEditorErrorSchema;
	}
}
