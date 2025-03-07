import { LabelMapper } from 'src/modules/labels/mappers/label.mapper';
import { Cards as CardEntity } from '../domain/card.entity';
import {
	Label as PersistentLabel,
	Card as PersistentCard,
	User as PersistentUser,
} from '@prisma/client';

import { LabelOnCards } from '../domain/labelOnCards.entity';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { UserCard } from 'src/modules/user/domain/userCards.entity';

export class CardMapperDetailed {
	static toDomain(
		card: PersistentCard & {
			labels?: PersistentLabel[];
			assignees?: PersistentUser[];
		},
	) {
		const labels = card.labels
			? card.labels
					.map((label) => {
						const lb = LabelMapper.toDomain(label);
						if (lb?.id) {
							return {
								cardId: card.id,
								labelId: lb.id,
							};
						}
						return null;
					})
					.filter((label): label is LabelOnCards => label !== null)
			: [];

		const assignees = card.assignees
			? card.assignees
					.map((assignee) => {
						const asgn = UserMapper.toDomain(assignee);
						if (asgn?.id) {
							return {
								cardId: card.id,
								userId: asgn.id,
							};
						}
					})
					.filter((assignee): assignee is UserCard => assignee !== null)
			: [];

		const cardEntity = CardEntity.create(
			{
				title: card.title,
				description: card.description || undefined,
				labels: labels,
				listId: card.listId,
				order: card.order,
				assignees: assignees,
				isDeleted: false,
			},
			card.id,
		);

		if (cardEntity.wasSuccess()) {
			return cardEntity.data;
		}

		return null;
	}

	static toPersist(card: CardEntity) {
		return {
			id: card.id,
			title: card.title,
			description: card.description,
			listId: { connect: { id: card.listId } },
			order: card.order,
			isDeleted: card.isDeleted,
			labels: !(card.labels[0]?.labelId === null)
				? {
						create: card.labels?.map((label) => {
							return {
								labelId: label.labelId,
							};
						}),
					}
				: undefined,
			assignees: !(card.assignees[0]?.userId === null)
				? {
						create: card.assignees?.map((assignee) => {
							return {
								userId: assignee.userId,
							};
						}),
					}
				: undefined,
		};
	}

	static toResponse(card: CardEntity) {
		return {
			id: card.id,
			title: card.title,
			description: card.description,
			listId: card.listId,
			order: card.order,
			labels: card.labels.map((label) => {
				return {
					labelId: label.labelId,
				};
			}),
			assignees: card.assignees.map((assignee) => {
				return {
					userId: assignee.userId,
				};
			}),
		};
	}
}

export class CardMapper {
	static toDomain(card: PersistentCard) {
		const cardEntity = CardEntity.create(
			{
				title: card.title,
				description: card.description || undefined,
				listId: card.listId,
				order: card.order,
				isDeleted: card.isDeleted,
			},
			card.id,
		);

		if (cardEntity.wasSuccess()) {
			return cardEntity.data;
		}

		return null;
	}

	static toPersist(card: CardEntity) {
		return {
			id: card.id,
			title: card.title,
			description: card.description,
			listId: card.listId,
			order: card.order,
			isDeleted: card.isDeleted,
		};
	}

	static toResponse(card: CardEntity) {
		return {
			id: card.id,
			title: card.title,
			description: card.description,
			listId: card.listId,
			order: card.order,
		};
	}
}
