import { Entity } from 'src/@core/entity.core';
import { Result, success } from 'src/@core/result.core';
import { BoardError } from '../errors/board.error';
import { User } from 'src/modules/user/domain/user.entity';
import { List } from 'src/modules/lists/domain/list.entity';

export type BoardProps = {
	title: string;
	list?: List[];
	ownerId: string;
	editors?: User[];
	isDeleted: boolean;
};

export class Board extends Entity<BoardProps> {
	private constructor(props: BoardProps, id?: string) {
		super(props, id);
	}

	get title(): string {
		return this.props.title;
	}

	get list(): List[] {
		return this.props.list ?? [];
	}

	get ownerId(): string {
		return this.props.ownerId;
	}

	get editors(): User[] {
		return this.props.editors ?? [];
	}

	get isDeleted(): boolean {
		return this.props.isDeleted;
	}

	set title(title: string) {
		this.props.title = title;
	}

	set list(list: List[]) {
		this.props.list = list;
	}

	set ownerId(ownerId: string) {
		this.props.ownerId = ownerId;
	}

	set editors(editors: User[]) {
		this.props.editors = editors;
	}

	set isDeleted(isDeleted: boolean) {
		this.props.isDeleted = isDeleted;
	}

	static create(props: BoardProps, id?: string): Result<Board, BoardError> {
		if (props.title && props.title.length <= 0) {
			return fail(new BoardError('emptyTitle'));
		}

		return success(new Board(props, id));
	}
}
