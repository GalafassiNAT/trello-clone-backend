import { Option } from 'src/shared/infra/lib/swagger/documentMethod';
import { SignUpDTO } from '../../@types/user.dto';
import { EmailError } from '../../errors/email.error';
import { PasswordError } from '../../errors/password.error';
import { UserError } from '../../errors/user.error';

export const SignUpDocumentationObject: Option = {
	summary: 'Registra um usuário',
	description: 'Registra as informações de um usuário',
	body: {
		type: SignUpDTO,
	},
	responses: {
		success: [
			{
				status: 201,
				description: 'Usuário registrado com sucesso',
				examples: {
					'success response': {
						data: {
							token:
								'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3MWViM2U3LTcxMjItNDk1ZS1iZjc2LWYwYjIzZWMzNTcwMCIsImlhdCI6MTY5MzE1NTI1MywiZXhwIjoxNjkzNzYwMDUzfQ.LlRqsig0ZoHvUQdaGpWcemHTXktFXgNV7DzNqQLRA6I',
							email: 'joedoe@mail.com',
							role: [],
						},
						statusCode: 201,
					},
				},
			},
		],
		fail: [
			{
				status: 400,
				description:
					'Erro ao cadastrar o usuário. Verifique os exemplos possíveis',
				examples: {
					'invalid email': EmailError.schema.invalidEmail,
					'empty password': PasswordError.schema.emptyPassword,
					'invalid password': PasswordError.schema.invalidPassword,
					'too short password': PasswordError.schema.passwordTooShort,
					'empty email': EmailError.schema.emptyEmail,
					'empty name': UserError.schema.emptyName,
					'user already exists': UserError.schema.alreadyExists,
				},
			},
		],
	},
};
