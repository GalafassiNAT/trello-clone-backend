import { Entity } from 'src/@core/entity.core';

export type UserCardProps = {
	userId: string;
	cardId: string;
	isDeleted: boolean;
};

export class UserCard extends Entity<UserCardProps> {
	private constructor(props: UserCardProps, id?: string) {
		super(props, id);
	}

	get userId(): string {
		return this.props.userId;
	}

	get cardId(): string {
		return this.props.cardId;
	}

	get isDeleted(): boolean {
		return this.props.isDeleted;
	}

	set userId(userId: string) {
		this.props.userId = userId;
	}

	set cardId(cardId: string) {
		this.props.cardId = cardId;
	}

	set isDeleted(isDeleted: boolean) {
		this.props.isDeleted = isDeleted;
	}

	public static create(props: UserCardProps, id?: string): UserCard {
		const userCard = new UserCard(props, id);
		return userCard;
	}
}
