import {
	failHttps,
	HttpsResponse,
	successHttps,
} from 'src/@core/response.core';
import {
	GetRolesResponse,
	GetRolesUseCase,
} from '../../usecases/getRoles.usecase';
import { RoleError } from '../../errors/role.error';

export class RoleController {
	constructor(private readonly getRolesUseCase: GetRolesUseCase) {}

	async getRoles(): Promise<HttpsResponse<GetRolesResponse[] | RoleError>> {
		const result = await this.getRolesUseCase.execute();

		if (result.wasFailure()) {
			return failHttps({
				statusCode: result.data.statusCode,
				message: result.data.message,
			});
		}

		return successHttps({
			data: result.data,
			statusCode: 200,
		});
	}
}
