export type LabelOnCardProps = {
	cardId: string;
	labelId: string;
};

export class LabelOnCard {
	private _cardId: string;
	private _labelId: string;

	constructor(props: LabelOnCardProps) {
		this._cardId = props.cardId;
		this._labelId = props.labelId;
	}

	get cardId() {
		return this._cardId;
	}

	get labelId() {
		return this._labelId;
	}

	set cardId(cardId: string) {
		this._cardId = cardId;
	}

	set labelId(labelId: string) {
		this._labelId = labelId;
	}

	static create(props: LabelOnCardProps): LabelOnCard {
		return new LabelOnCard(props);
	}
}
