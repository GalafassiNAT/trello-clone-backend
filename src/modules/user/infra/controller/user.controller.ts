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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { DocumentMethod } from 'src/shared/infra/lib/swagger/documentMethod';
import { GetUsersDetailedDocumentationObject } from '../documentation/user.docs';
import { Role, RolesGuard } from '../middleware/role.guard';
import { AuthGuard } from '../middleware/auth.guard';

@ApiTags('user')
@Controller({
	path: '/users',
	version: '1',
})
export class UserController {
	constructor(
		private readonly getUsersDetailedUseCase: GetUsersDetailedUseCase,
	) {}

	@DocumentMethod(GetUsersDetailedDocumentationObject)
	@Role('full-access')
	@UseGuards(AuthGuard, RolesGuard)
	@Get('/')
	@ApiBearerAuth()
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
