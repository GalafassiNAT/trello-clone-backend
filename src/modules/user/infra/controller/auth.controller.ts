import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignUpUseCase, SignUpResponse } from '../../usecases/user.usecase';
import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from '../../@types/user.dto';
import {
	failHttps,
	HttpsResponse,
	successHttps,
} from 'src/@core/response.core';
import { UserError } from '../../errors/user.error';
import { DocumentMethod } from 'src/shared/infra/lib/swagger/documentMethod';
import { SignUpDocumentationObject } from '../documentation/auth.docs';

@ApiTags('auth')
@Controller({
	path: '/auth',
	version: '1',
})
export class AuthController {
	constructor(private readonly signUpUseCase: SignUpUseCase) {}

	@DocumentMethod(SignUpDocumentationObject)
	@Post('/sign-up')
	@ApiBody({ type: SignUpDTO })
	async signUp(
		@Body() signUpDTO: SignUpDTO,
	): Promise<HttpsResponse<SignUpResponse | UserError>> {
		const result = await this.signUpUseCase.execute(signUpDTO);

		if (result.wasFailure()) {
			return failHttps({
				statusCode: result.data.statusCode,
				message: result.data.message,
			});
		}

		return successHttps({
			statusCode: 201,
			data: result.data,
		});
	}
}
