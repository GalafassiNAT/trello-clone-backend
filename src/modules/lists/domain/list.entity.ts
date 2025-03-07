import { Card } from '@prisma/client';
import { Entity } from 'src/@core/entity.core';
import { Result, success } from 'src/@core/result.core';
import { ListError } from '../errors/list.error';

export type ListProps = {
	title: string;
	boardId: string;
	order: number;
	cards?: Card[];
	isDeleted?: boolean;
};

export class List extends Entity<ListProps> {
	private constructor(props: ListProps, id?: string) {
		super(props, id);
	}

	get title(): string {
		return this.props.title;
	}

	get boardId(): string {
		return this.props.boardId;
	}

	get cards(): Card[] {
		return this.props.cards ?? [];
	}

	get order(): number {
		return this.props.order;
	}

	get isDeleted(): boolean {
		return this.props.isDeleted ?? false;
	}

	set title(title: string) {
		this.props.title = title;
	}

	set boardId(boardId: string) {
		this.props.boardId = boardId;
	}

	set cards(cards: Card[]) {
		this.props.cards = cards;
	}

	set order(order: number) {
		this.props.order = order;
	}

	set isDeleted(isDeleted: boolean) {
		this.props.isDeleted = isDeleted;
	}

	static create(props: ListProps, id?: string): Result<List, ListError> {
		if (props.title && props.title.length <= 0) {
			return fail(new ListError('emptyTitle'));
		}

		if (props.boardId && props.boardId.length <= 0) {
			return fail(new ListError('emptyBoardId'));
		}

		if (props.order && props.order <= 0) {
			return fail(new ListError('emptyOrder'));
		}

		return success(new List({ ...props, isDeleted: false }, id));
	}
}
