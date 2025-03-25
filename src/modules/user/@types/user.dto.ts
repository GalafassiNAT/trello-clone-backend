import { Board } from 'src/modules/boards/domain/board.entity';
import { UserCard } from '../domain/userCards.entity';
import { User } from '../domain/user.entity';
import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';

export type FindUserDTO = {
	id?: string;
	email?: string;
};

export class UserDTO {
	/**
	 * O nome não é um campo único, logo não é possível utilizá-lo como identificador.
	 * @example 'João da Silva'
	 */
	@ApiProperty({ example: 'Astolfo da Silva', description: 'Nome do usuário' })
	name: string;

	/**
	 * O email é um campo único, logo é possível utilizá-lo como identificador. Campo essencial para a autenticação.
	 * @example 'joaosilva@email.com'
	 */
	@ApiProperty({
		example: 'astolfo@email.com',
		description: 'Email do usuário',
	})
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
	@ApiProperty({ example: 'abC123!', description: 'Senha do password' })
	password: string;

	/**
	 * O campo de imagem de perfil é opcional. Ele deve ser uma URL válida.
	 * @example 'https://www.google.com.br/image'
	 */
	@ApiProperty({
		example: 'https://www.google.com.br/image',
		description: 'Imagem de perfil do usuário',
	})
	profileImage?: string;
}

export class SignUpDTO extends UserDTO {}

export class SignInDTO extends OmitType(SignUpDTO, ['name'] as const) {}

export class RecoverPasswordDTO extends PickType(SignUpDTO, [
	'email',
] as const) {}

export class UpdateUserDTO extends PartialType(UserDTO) {
	/**
	 * O campo 'id' é necessário para identificar o usuário a ser atualizado.
	 * @example '33924e-a9d9-4e3d-8b3c-2f4d3e3d3e3d'
	 */
	id: string;

	boards?: Board[];
	allowedBoards?: Board[];
	cards?: UserCard[];
}

export class UpdateUserRoleDTO {
	/**
	 * O campo 'id' é necessário para identificar o usuário que será atualizado.
	 * @example 3c13c2ad-e003-432a-a3e0-ce9210e47ccc
	 */
	id: string;

	/**
	 * O campo 'rolesId' é necessário para identificar as roles que serão atualizadas.
	 * @example ['3c13c2ad-e003-432a-a3e0-ce9210e47ccc']
	 */
	rolesId: string[];
}

export type UserTokenPayload = {
	id: string;
};

export type RequestWithUser = Request & { user: User };
