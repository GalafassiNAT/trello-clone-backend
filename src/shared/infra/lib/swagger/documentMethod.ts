import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { DocumentFailResponse, WithErrorSchema } from './documentFailResponse';
import {
	DocumentSuccessResponse,
	WithSuccessSchema,
} from './documentSuccessResponse';
import { applyDecorators } from '@nestjs/common';

export type Option = {
	summary: string;
	description: string;
	body?: {
		type: unknown;
	};
	responses: {
		success: WithSuccessSchema[];
		fail: WithErrorSchema[];
	};
};

export function DocumentMethod(option: Option) {
	const decorators: MethodDecorator[] = [];

	if (option.body) {
		decorators.push(ApiBody({ type: option.body.type as never }));
	}

	decorators.push(
		ApiOperation({
			summary: option.summary,
			description: option.description,
		}),
		DocumentSuccessResponse(option.responses.success),
		DocumentFailResponse(option.responses.fail),
	);

	return applyDecorators(...decorators);
}
