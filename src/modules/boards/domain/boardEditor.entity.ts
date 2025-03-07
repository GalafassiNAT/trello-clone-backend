import { Entity } from 'src/@core/entity.core';
import { Result, success } from 'src/@core/result.core';
import { BoardEditorError } from '../errors/boardEditor.error';

export type BoardEditorProps = {
	boardId: string;
	editorId: string;
	isDeleted?: boolean;
};

export class BoardEditor extends Entity<BoardEditorProps> {
	private constructor(props: BoardEditorProps, id?: string) {
		super({ ...props, isDeleted: props.isDeleted ?? false }, id);
	}

	get boardId(): string {
		return this.boardId;
	}

	get editorId(): string {
		return this.editorId;
	}

	get isDeleted(): boolean {
		return this.props.isDeleted ?? false;
	}

	set boardId(boardId: string) {
		this.props.boardId = boardId;
	}

	set editorId(editorId: string) {
		this.props.editorId = editorId;
	}

	static create(
		props: BoardEditorProps,
		id?: string,
	): Result<BoardEditor, BoardEditorError> {
		if (props.boardId && props.boardId.length <= 0) {
			return fail(new BoardEditorError('invalidBoardId'));
		}

		if (props.editorId && props.editorId.length <= 0) {
			return fail(new BoardEditorError('invalidEditorId'));
		}

		const boardEditor = new BoardEditor(props, id);

		return success(boardEditor);
	}
}
