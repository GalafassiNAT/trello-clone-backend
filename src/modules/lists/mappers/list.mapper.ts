import { List as PersistentList } from '@prisma/client';
import { List as ListEntity } from '../domain/list.entity';
import { Card as PersistentCard } from '@prisma/client';
import { CardMapper } from 'src/modules/cards/mappers/card.mapper';

export class ListMapper {
	static toDomain(list: PersistentList) {
		const listEntity = ListEntity.create({
			title: list.title,
			boardId: list.boardId,
			order: list.order,
			isDeleted: list.isDeleted,
		});

		if (listEntity.wasSuccess()) {
			return listEntity.data;
		}

		return null;
	}

	static toPersist(list: ListEntity) {
		return {
			id: list.id,
			title: list.title,
			boardId: list.boardId,
			order: list.order,
			isDeleted: list.isDeleted,
		};
	}

	static toResponse(list: ListEntity) {
		return {
			id: list.id,
			title: list.title,
			boardId: list.boardId,
			order: list.order,
		};
	}
}

export class ListMapperDetailed {
	static toDomain(list: PersistentList & { cards: PersistentCard[] }) {
		const cards = list.cards
			? list.cards
					.map((card) => {
						const cl = CardMapper.toDomain(card);
						if (cl?.id) {
							return { ...card, id: cl.id, listId: list.id };
						}
						return null;
					})
					.filter((card): card is PersistentCard => card !== null)
			: [];

		const listEntity = ListEntity.create(
			{
				title: list.title,
				boardId: list.boardId,
				order: list.order,
				isDeleted: list.isDeleted,
				cards: cards,
			},
			list.id,
		);

		if (listEntity.wasSuccess()) {
			return listEntity.data;
		}

		return null;
	}

	static toPersist(list: ListEntity) {
		return {
			id: list.id,
			title: list.title,
			boardId: { connect: { id: list.boardId } },
			order: list.order,
			isDeleted: list.isDeleted,
			cards: !(list.cards[0]?.id === null)
				? {
						create: list.cards?.map((card) => {
							return {
								id: card.id,
							};
						}),
					}
				: undefined,
		};
	}
	static toResponse(list: ListEntity) {
		return {
			id: list.id,
			title: list.title,
			boardId: list.boardId,
			order: list.order,
			cards: list.cards.map((card) => {
				return {
					id: card.id,
				};
			}),
		};
	}
}
