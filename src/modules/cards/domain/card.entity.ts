import { Entity } from 'src/@core/entity.core';
import { Result, success } from 'src/@core/result.core';
import { LabelOnCard } from 'src/modules/labels/domain/labelOnCard.entity';
import { UserCard } from 'src/modules/user/domain/userCards.entity';
import { CardError } from '../errors/card.error';

export type CardProps = {
	title: string;
	description: string;
	cover?: string;
	listId: string;
	startDate?: Date;
	dueDate?: Date;
	labels: LabelOnCard[];
	order: number;
	assignees: UserCard[];
	isDeleted: boolean;
};

export class Cards extends Entity<CardProps> {
	private constructor(props: CardProps, id?: string) {
		super(props, id);
	}

	get title(): string {
		return this.props.title;
	}

	get description(): string | undefined {
		return this.props.description;
	}

	get cover(): string | undefined {
		return this.props.cover;
	}

	get listId(): string {
		return this.props.listId;
	}

	get labels(): LabelOnCard[] {
		return this.props.labels;
	}

	get order(): number {
		return this.props.order;
	}

	get assignees(): UserCard[] {
		return this.props.assignees;
	}

	get isDeleted(): boolean {
		return this.props.isDeleted;
	}

	set title(title: string) {
		this.props.title = title;
	}

	set description(description: string) {
		this.props.description = description;
	}

	set cover(cover: string) {
		this.props.cover = cover;
	}

	set listId(listId: string) {
		this.props.listId = listId;
	}

	set labels(labels: LabelOnCard[]) {
		this.props.labels = labels;
	}

	set order(order: number) {
		this.props.order = order;
	}

	set assignees(assignees: UserCard[]) {
		this.props.assignees = assignees;
	}

	set isDeleted(isDeleted: boolean) {
		this.props.isDeleted = isDeleted;
	}

	static create(props: CardProps, id?: string): Result<Cards, CardError> {
		if (props.title.length <= 0) {
			return fail(new CardError('emptyTitle'));
		}

		if (!props.order) {
			return fail(new CardError('emptyOrder'));
		}

		if (props.order < 0) {
			return fail(new CardError('invalidOrder'));
		}

		if (props.dueDate && props.startDate && props.dueDate < props.startDate) {
			return fail(new CardError('invalidCardDueDate'));
		}

		const data = {
			...props,
			startDate: props.startDate
				? new Date(props.startDate)
				: new Date(Date.now()),
			dueDate: props.dueDate ? new Date(props.dueDate) : undefined,
		};

		const card = new Cards(data, id);
		return success(card);
	}
}
