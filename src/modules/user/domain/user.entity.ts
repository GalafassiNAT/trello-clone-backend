import { Entity } from 'src/@core/entity.core';
import { UserCard } from './userCards.entity';

export type UserProps = {
	name: string;
	email: string;
	password: string;
	profileImage?: string;
	cards: UserCard[];
	isDeleted: boolean;
};

export class Users extends Entity<UserProps> {
	private constructor(props: UserProps, id?: string) {
		super(props, id);
	}

	get name(): string {
		return this.props.name;
	}

	get email(): string {
		return this.props.email;
	}

	get password(): string {
		return this.props.password;
	}

	get profileImage(): string | undefined {
		return this.props.profileImage;
	}

	get cards(): UserCard[] {
		return this.props.cards;
	}

	get isDeleted(): boolean {
		return this.props.isDeleted;
	}

	set name(name: string) {
		this.props.name = name;
	}

	set email(email: string) {
		this.props.email = email;
	}

	set password(password: string) {
		this.props.password = password;
	}

	set profileImage(profileImage: string | undefined) {
		this.props.profileImage = profileImage;
	}

	set cards(cards: UserCard[]) {
		this.props.cards = cards;
	}

	set isDeleted(isDeleted: boolean) {
		this.props.isDeleted = isDeleted;
	}

	public static create(props: UserProps, id?: string): Users {
		const user = new Users({ ...props, isDeleted: false }, id);
		return user;
	}
}
