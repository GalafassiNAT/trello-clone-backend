import { Board } from 'src/modules/boards/domain/board.entity';
import { UserCard } from '../domain/userCards.entity';
import { User } from '../domain/user.entity';

export interface FindUserDTO {
	id?: string;
	email: string;
}

export interface UserDTO {
	/**
	 * O nome não é um campo único, logo não é possível utilizá-lo como identificador.
	 * @example 'João da Silva'
	 */
	name: string;

	/**
	 * O email é um campo único, logo é possível utilizá-lo como identificador. Campo essencial para a autenticação.
	 * @example 'joaosilva@email.com'
	 */
	email: string;

	/**
	 * A senha é um campo essencial para a autenticação. Ela deve seguir o seguinte critério:
	 * - Ter no mínimo 8 caracteres
	 * - Ter no mínimo 1 letra maiúscula
	 * - Ter no mínimo 1 letra minúscula
	 * - Ter no mínimo 1 número
	 * - Ter no mínimo 1 caractere especial
	 * @example 'Senha123@'
	 */
	password: string;
}

export type SignUpDTO = UserDTO;

export type SignInDTO = Omit<UserDTO, 'name'>;

export type UpdateUserDTO = Partial<UserDTO> & {
	id: string;

	boards?: Board[];
	allowedBoards?: Board[];
	cards?: UserCard[];
};

export interface UpdateUserRoleDTO {
	id: string;
	rolesId: string[];
}

export type UserTokenPayload = {
	id: string;
};

export type RequestWithUser = Request & { user: User };
