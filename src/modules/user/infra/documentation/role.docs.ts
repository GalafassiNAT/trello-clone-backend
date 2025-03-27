import { Option } from 'src/shared/infra/lib/swagger/documentMethod';
import { RoleError } from '../../errors/role.error';

export const GetRolesDocumentationObject: Option = {
	summary: 'Retorna todos os cargos encontrados',
	description:
		'Retorna todos os cargos cadastrados no banco de dados. Só é possível acessar essa rota sendo um administrador.',
	responses: {
		success: [
			{
				status: 200,
				description: 'Retorna todos os cargos cadastrados.',
				examples: {
					'success response': {
						data: [
							{
								id: '991e0f1d-8965-4f33-8c29-89daf102ed31',
								name: 'admin',
								accessLevel: 10,
							},
							{
								id: '991e0f1d-8965-4f33-8c29-89daf102ed31',
								name: 'user',
								accessLevel: 0,
							},
						],
						statusCode: 200,
					},
				},
			},
		],
		fail: [
			{
				status: 400,
				description:
					'Erro ao buscar cargos. Veja os exemplos de erros possíveis.',
				examples: {
					notFound: RoleError.schema.notFound,
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
