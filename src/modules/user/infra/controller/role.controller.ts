import {
	failHttps,
	HttpsResponse,
	successHttps,
} from 'src/@core/response.core';
import { GetRolesResponse, GetRolesUseCase } from '../../usecases/user.usecase';
import { RoleError } from '../../errors/role.error';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { DocumentMethod } from 'src/shared/infra/lib/swagger/documentMethod';
import { GetRolesDocumentationObject } from '../documentation/role.docs';
import { Role, RolesGuard } from '../middleware/role.guard';
import { AuthGuard } from '../middleware/auth.guard';

@ApiTags('role')
@Controller({
	path: '/roles',
	version: '1',
})
export class RoleController {
	constructor(private readonly getRolesUseCase: GetRolesUseCase) {}

	@DocumentMethod(GetRolesDocumentationObject)
	@Role('full-access')
	@UseGuards(AuthGuard, RolesGuard)
	@Get('/')
	@ApiBearerAuth()
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
