import {
	Label as PersistentLabel,
	LabelsOnCard as PersistentLabelsOnCards,
} from '@prisma/client';
import { Label as LabelEntity } from '../domain/label.entity';

import { LabelOnCards as LabelOnCardsEntity } from 'src/modules/cards/domain/labelOnCards.entity';
export class LabelMapperDetailed {
	static toDomain(
		label: PersistentLabel & {
			labelsOnCards: PersistentLabelsOnCards[];
		},
	) {
		const labelOnCards = label.labelsOnCards
			.map((labelOnCard) => {
				const lbc = LabelOnCardsEntity.create({
					cardId: labelOnCard.cardId,
					labelId: labelOnCard.labelId,
				});

				if (lbc.wasSuccess()) {
					return lbc.data;
				}

				return null;
			})
			.filter((card): card is LabelOnCardsEntity => card !== null);

		const labelEntity = LabelEntity.create(
			{
				name: label.name,
				color: label.color,
				cards: labelOnCards,
				isDeleted: false,
			},
			label.id,
		);
		if (labelEntity.wasSuccess()) {
			return labelEntity.data;
		}
		return null;
	}

	static toPersist(label: LabelEntity) {
		return {
			id: label.id,
			name: label.name,
			color: label.color,
			isDeleted: label.isDeleted,
			cards: !(label.cards[0]?.cardId === null)
				? {
						create: label.cards?.map((cards) => {
							return {
								cardId: cards.cardId,
							};
						}),
					}
				: undefined,
		};
	}

	static toResponse(label: LabelEntity) {
		const response = {
			id: label.id,
			name: label.name,
			color: label.color,
			isDeleted: label.isDeleted,
			cards:
				label.cards?.map((card) => {
					return {
						cardId: card.cardId,
					};
				}) || [],
		};

		return response;
	}
}

export class LabelMapper {
	static toDomain(label: PersistentLabel) {
		const labelEntity = LabelEntity.create(
			{
				name: label.name,
				color: label.color,
				isDeleted: label.isDeleted,
			},
			label.id,
		);

		if (labelEntity.wasSuccess()) {
			return labelEntity.data;
		}

		return null;
	}

	static toPersist(label: LabelEntity) {
		return {
			id: label.id,
			name: label.name,
			color: label.color,
			isDeleted: label.isDeleted,
		};
	}

	static toResponse(label: LabelEntity) {
		const response = {
			id: label.id,
			name: label.name,
			color: label.color,
			isDeleted: label.isDeleted,
		};

		return response;
	}
}
