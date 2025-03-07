import { Entity } from 'src/@core/entity.core';
import { LabelOnCards } from 'src/modules/cards/domain/labelOnCards.entity';
import { Result, fail, success } from 'src/@core/result.core';
import { LabelError } from '../errors/label.error';

export type LabelProps = {
	/**
	 * @description Campo destinado para o nome da label.
	 */
	name: string;

	/**
	 * @description Campo destinado para a cor da label. (HEX)
	 */
	color: string;

	/**
	 * @description Campo destinado à associar uma label a um card.
	 */
	cards?: LabelOnCards[] | [];

	/**
	 * @description Campo destinado para soft delete da label.
	 */
	isDeleted: boolean;
};

export class Label extends Entity<LabelProps> {
	private constructor(props: LabelProps, id?: string) {
		super(props, id);
	}

	get name(): string {
		return this.props.name;
	}

	get color(): string {
		return this.props.name;
	}

	get cards(): LabelOnCards[] {
		return this.props.cards || [];
	}

	set name(name: string) {
		this.props.name = name;
	}

	set color(color: string) {
		this.props.color = color;
	}

	set cards(cards: LabelOnCards[]) {
		this.props.cards = cards;
	}

	set isDeleted(isDeleted: boolean) {
		this.props.isDeleted = isDeleted;
	}

	static create(props: LabelProps, id?: string): Result<Label, LabelError> {
		if (props.name && props.name.length == 0)
			return fail(new LabelError('emptyName'));

		if (props.color && props.color.length == 0)
			return fail(new LabelError('emptyColor'));

		const data = {
			...props,
			cards: props.cards || [],
			isDeleted: false,
		};

		const label = new Label(data, id);

		return success(label);
	}
}
