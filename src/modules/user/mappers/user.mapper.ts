import { User as UserEntity } from '../domain/user.entity';
import { EmailFactory } from '../__tests__/email.factory';
import { PasswordFactory } from '../__tests__/password.factory';
import {
	User as PersistentUser,
	Role as PersistentRole,
	Board as PersistentBoard,
	Card as PersistentCard,
} from '@prisma/client';
import { RoleMapper } from './role.mapper';
import { Role } from '../domain/role.entity';
import { CardMapperDetailed } from 'src/modules/cards/mappers/card.mapper';
import { Cards as CardEntity } from 'src/modules/cards/domain/card.entity';
import { BoardMapper } from 'src/modules/boards/mappers/board.mapper';
import { Board } from 'src/modules/boards/domain/board.entity';

export class UserMapper {
	static toDomain(user: PersistentUser) {
		const password = PasswordFactory.createHashedPassword(user.password);
		const email = EmailFactory.createEmail(user.email);

		if (!password || password === null) {
			return null;
		}

		if (!email || email === null) {
			return null;
		}

		const userEntity = UserEntity.create(
			{
				email: email,
				name: user.name,
				password: password,
				profileImage: user.profileImage || undefined,
			},
			user.id,
		);

		if (userEntity.wasSuccess()) {
			return userEntity.data;
		}

		return null;
	}

	static toPersist(user: UserEntity) {
		if (!user.password.isHashed) {
			return null;
		}

		return {
			id: user.id,
			email: user.email.value,
			name: user.name,
			password: user.password.value,
			profileImage: user.profileImage,
		};
	}

	static toResponse(user: UserEntity) {
		return {
			id: user.id,
			email: user.email.value,
			name: user.name,
		};
	}
}

export class UserMapperDetailed {
	static toDomain(
		user: PersistentUser & {
			roles: PersistentRole[];
			boards: PersistentBoard[];
			allowedBoards: PersistentBoard[];
			cards: PersistentCard[];
		},
	) {
		const password = PasswordFactory.createHashedPassword(user.password);
		const email = EmailFactory.createEmail(user.email);
		if (!password || password === null) {
			return null;
		}

		if (!email || email === null) {
			return null;
		}

		const roles = user.roles
			?.map((role) => RoleMapper.toDomain(role))
			.filter((role): role is Role => role !== null);

		const cards = user.cards
			? user.cards
					.map((card) => CardMapperDetailed.toDomain(card))
					.filter((card): card is CardEntity => card !== null)
			: [];

		const boards = user.boards
			? user.boards
					.map((board) => {
						const brd = BoardMapper.toDomain(board);
						if (brd?.id) {
							return brd;
						}
					})
					.filter((board): board is Board => board !== null)
			: [];

		const allowedBoards = user.allowedBoards
			? user.allowedBoards
					.map((board) => {
						const brd = BoardMapper.toDomain(board);
						if (brd?.id) {
							return brd;
						}
					})
					.filter((board): board is Board => board !== null)
			: [];

		const userEntity = UserEntity.create(
			{
				email,
				name: user.name,
				password,
				role: roles,
				profileImage: user.profileImage || undefined,
				cards: cards,
				boards: boards,
				allowedBoards: allowedBoards,
			},
			user.id,
		);

		if (userEntity.wasSuccess()) {
			return userEntity.data;
		}

		return null;
	}

	static toPersist(user: UserEntity) {
		if (!user.password.isHashed) {
			return null;
		}

		return {
			id: user.id,
			email: user.email.value,
			name: user.name,
			password: user.password.value,
			profileImage: user.profileImage,
			role: user.role?.map((role) => RoleMapper.toPersist(role)),
			boards: !(user.boards[0]?.id === null)
				? {
						connect: user.boards.map((board) => {
							return {
								id: board.id,
							};
						}),
					}
				: undefined,
			allowedBoards: !(user.allowedBoards[0]?.id === null)
				? {
						connect: user.allowedBoards.map((board) => {
							return {
								id: board.id,
							};
						}),
					}
				: undefined,
			cards: !(user.cards[0]?.id === null)
				? {
						connect: user.cards.map((card) => {
							return {
								id: card.id,
							};
						}),
					}
				: undefined,
		};
	}

	static toResponse(user: UserEntity) {
		return {
			id: user.id,
			email: user.email.value,
			role: user.role?.map((role) => RoleMapper.toResponse(role)),
			profileImage: user.profileImage,
			name: user.name,
			boards: user.boards.map((board) => {
				return {
					id: board.id,
				};
			}),
			allowedBoards: user.allowedBoards.map((board) => {
				return {
					id: board.id,
				};
			}),
			cards: user.cards.map((card) => {
				return card;
			}),
		};
	}
}
