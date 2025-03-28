import { Option } from 'src/shared/infra/lib/swagger/documentMethod';
import { UserError } from '../../errors/user.error';

export const GetUsersDetailedDocumentationObject: Option = {
	summary: 'Retorna usuários detalhados',
	description: 'Retorna todos os usuários com todas suas informações',
	responses: {
		success: [
			{
				status: 201,
				description: 'Usuários retornados com sucesso',
				examples: {
					'success response': {
						data: [
							{
								id: '56abc8a9-7ef2-4077-beae-b818688dc596',
								name: 'John Doe',
								email: 'johndoe@mail.com',
								profileImage: 'https://example.com/image.jpg',
								role: [
									{
										id: '1',
										name: 'admin',
										accessLevel: 10,
									},
								],
								boards: [
									{
										id: 'b2fc566c-a046-4807-ba92-87daab0a9ade',
									},
								],
								allowedBoards: [
									{
										id: 'cc632505-00ca-40c4-869b-38ab355309c0',
									},
								],
								cards: [
									{
										id: '3d08129f-0dab-4a6e-946a-f74f99a0fa27',
									},
								],
							},
						],
						statusCode: 201,
					},
				},
			},
		],
		fail: [
			{
				status: 404,
				description: 'Nenhum usuário encontrado',
				examples: {
					notFound: {
						statusCode: UserError.schema.notFound.statusCode,
						message: UserError.schema.notFound.message,
					},
				},
			},
			{
				status: 500,
				description: 'Internal Server Error',
				examples: {
					'fail response': {
						statusCode: 500,
						message: 'Internal Server Error',
					},
				},
			},
		],
	},
};
