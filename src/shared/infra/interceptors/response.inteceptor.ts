import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { HttpsResponse } from 'src/@core/response.core';

export interface NestResponse<T> {
	data: T;
	statusCode: number;
	message: string;
}

@Injectable()
export class ResponseInterceptor<T>
	implements NestInterceptor<T, NestResponse<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<NestResponse<T>> {
		return next.handle().pipe(
			map((data: HttpsResponse<T>) => {
				const response = context.switchToHttp().getResponse<Response>();
				response.status(data.statusCode);

				return {
					data: data.data as T,
					statusCode: data.statusCode,
					message: data.message ?? '',
				};
			}),
		);
	}
}
