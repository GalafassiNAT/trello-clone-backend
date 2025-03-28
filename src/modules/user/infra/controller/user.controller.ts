import {
	failHttps,
	HttpsResponse,
	successHttps,
} from 'src/@core/response.core';

import { UserError } from '../../errors/user.error';
import {
	FindDetailedUsersResponse,
	GetUsersDetailedUseCase,
} from '@user/usecases';

export class UserController {
	constructor(
		private readonly getUsersDetailedUseCase: GetUsersDetailedUseCase,
	) {}

	async getUsersDetailed(): Promise<
		HttpsResponse<FindDetailedUsersResponse[] | UserError>
	> {
		const result = await this.getUsersDetailedUseCase.execute();

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
