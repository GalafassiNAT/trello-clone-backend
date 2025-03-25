import { Entity } from 'src/@core/entity.core';
import { Role } from './role.entity';
import { Result, success } from 'src/@core/result.core';
import { UserError } from '../errors/user.error';
import { Email } from './email.sanitizer';
import { Password } from './password.sanitizer';
import { Board } from 'src/modules/boards/domain/board.entity';
import { Cards } from 'src/modules/cards/domain/card.entity';

export type UserProps = {
	name: string;
	email: Email;
	password: Password;
	profileImage?: string;
	role?: Role[];
	cards?: Cards[];
	boards?: Board[];
	allowedBoards?: Board[];
	isDeleted?: boolean;
};

export class User extends Entity<UserProps> {
	private constructor(props: UserProps, id?: string) {
		super(props, id);
	}

	get name(): string {
		return this.props.name;
	}

	get email(): Email {
		return this.props.email;
	}

	get password(): Password {
		return this.props.password;
	}

	get profileImage(): string | undefined {
		return this.props.profileImage;
	}

	get role(): Role[] {
		return this.props.role ?? [];
	}

	get cards(): Cards[] {
		return this.props.cards ?? [];
	}

	get boards(): Board[] {
		return this.props.boards ?? [];
	}

	get allowedBoards(): Board[] {
		return this.props.allowedBoards ?? [];
	}

	get isDeleted(): boolean {
		return this.props.isDeleted ?? false;
	}

	set name(name: string) {
		this.props.name = name;
	}

	set profileImage(profileImage: string | undefined) {
		this.props.profileImage = profileImage;
	}

	set cards(cards: Cards[]) {
		this.props.cards = cards;
	}

	set boards(boards: Board[]) {
		this.props.boards = boards;
	}

	set allowedBoards(boards: Board[]) {
		this.props.allowedBoards = boards;
	}

	set isDeleted(isDeleted: boolean) {
		this.props.isDeleted = isDeleted;
	}

	public static create(props: UserProps, id?: string): Result<User, UserError> {
		if (props.name.length <= 0) {
			return fail(new UserError('emptyName'));
		}

		const user = new User(
			{ ...props, role: props.role || [], isDeleted: false },
			id,
		);
		return success(user);
	}
}
