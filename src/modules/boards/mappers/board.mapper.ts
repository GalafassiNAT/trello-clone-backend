import { Board as BoardEntity } from '../domain/board.entity';
import {
	Board as PersistentBoard,
	User as PersistentUser,
	List as PersistentList,
} from '@prisma/client';
import { UserMapper } from 'src/modules/user/mappers/user.mapper';
import { ListMapper } from 'src/modules/lists/mappers/list.mapper';
import { User } from 'src/modules/user/domain/user.entity';
import { List } from 'src/modules/lists/domain/list.entity';

export class BoardMapper {
	static toDomain(board: PersistentBoard) {
		const boardEntity = BoardEntity.create(
			{
				title: board.title,
				ownerId: board.ownerId,
				isDeleted: board.isDeleted,
			},
			board.id,
		);

		if (boardEntity.wasSuccess()) {
			return boardEntity.data;
		}

		return null;
	}

	static toPersist(board: BoardEntity) {
		return {
			id: board.id,
			title: board.title,
			ownerId: board.ownerId,
			isDeleted: board.isDeleted,
		};
	}

	static toResponse(board: BoardEntity) {
		return {
			id: board.id,
			title: board.title,
			ownerId: board.ownerId,
			isDeleted: board.isDeleted,
		};
	}
}

export class BoardMapperDetailed {
	static toDomain(
		board: PersistentBoard & {
			owner: PersistentUser;
			editors: PersistentUser[];
			lists: PersistentList[];
		},
	) {
		const editors = board.editors
			? board.editors
					.map((editor) => UserMapper.toDomain(editor))
					.filter((editor): editor is User => editor !== null)
			: [];

		const lists = board.lists
			? board.lists
					.map((list) => ListMapper.toDomain(list))
					.filter((list): list is List => list !== null)
			: [];

		const boardEntity = BoardEntity.create({
			title: board.title,
			ownerId: board.ownerId,
			isDeleted: board.isDeleted,
			editors: editors,
			list: lists,
		});

		if (boardEntity.wasSuccess()) {
			return boardEntity.data;
		}

		return null;
	}

	static toPersist(board: BoardEntity) {
		return {
			id: board.id,
			title: board.title,
			ownerId: { connect: { id: board.ownerId } },
			isDeleted: board.isDeleted,
			list: !(board.list[0]?.id === null)
				? {
						create: board.list?.map((list) => {
							return {
								id: list.id,
							};
						}),
					}
				: undefined,
			editors: !(board.editors[0]?.id === null)
				? {
						connect: board.editors?.map((editor) => {
							return {
								id: editor.id,
							};
						}),
					}
				: undefined,
		};
	}

	static toResponse(board: BoardEntity) {
		return {
			id: board.id,
			title: board.title,
			ownerId: board.ownerId,
			list: board.list.map((list) => {
				return { id: list.id };
			}),
		};
	}
}
