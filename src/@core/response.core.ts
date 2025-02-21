export type ResponseProps<T> = {
	statusCode: number;
	data: T | null;
	message: string;
};

export class HttpsResponse<T> {
	statusCode: number;
	data: T | null;
	message: string;

	constructor({ statusCode, data, message }: ResponseProps<T>) {
		this.data = data;
		this.statusCode = statusCode;
		this.message = message;
	}
}

type SuccessHttpsResponseProps<T> = Omit<ResponseProps<T>, 'message'>;
class SuccessHttpsResponse<T> extends HttpsResponse<T> {
	constructor({ statusCode, data }: SuccessHttpsResponseProps<T>) {
		super({ statusCode, data, message: '' });
	}
}

type FailHttpsResponseProps<T> = Omit<ResponseProps<T>, 'data'>;
class ErrorHttpsResponse<T> extends HttpsResponse<T> {
	constructor({ statusCode, message }: FailHttpsResponseProps<T>) {
		super({ statusCode, data: null, message });
	}
}

export function successHttps<T>({
	statusCode,
	data,
}: SuccessHttpsResponseProps<T>): SuccessHttpsResponse<T> {
	return new SuccessHttpsResponse({ statusCode, data });
}

export function failHttps<T>({
	statusCode,
	message,
}: FailHttpsResponseProps<T>): ErrorHttpsResponse<T> {
	return new ErrorHttpsResponse({ statusCode, message });
}
