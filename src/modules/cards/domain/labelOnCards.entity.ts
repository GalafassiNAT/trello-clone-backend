import { Entity } from 'src/@core/entity.core';
import { Result, success } from 'src/@core/result.core';
import { LabelOnCardsError } from '../errors/labelOnCard.error';

export type LabelOnCardsProps = {
	cardId: string;
	labelId: string;
	isDeleted?: boolean;
};

export class LabelOnCards extends Entity<LabelOnCardsProps> {
	private constructor(props: LabelOnCardsProps, id?: string) {
		super({ ...props, isDeleted: props.isDeleted ?? false }, id);
	}

	get cardId(): string {
		return this.props.cardId;
	}

	get labelId(): string {
		return this.props.labelId;
	}

	set cardId(cardId: string) {
		this.props.cardId = cardId;
	}

	set labelId(labelId: string) {
		this.props.labelId = labelId;
	}

	static create(
		props: LabelOnCardsProps,
		id?: string,
	): Result<LabelOnCards, LabelOnCardsError> {
		if (props.cardId && props.cardId.length <= 0) {
			return fail(new LabelOnCardsError('InvalidCardId'));
		}

		if (props.labelId && props.labelId.length <= 0) {
			return fail(new LabelOnCardsError('InvalidLabelId'));
		}

		const labelOnCards = new LabelOnCards(props, id);

		return success(labelOnCards);
	}
}
