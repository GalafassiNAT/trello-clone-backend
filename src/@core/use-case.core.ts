import { Result } from './result.core';

export abstract class UseCase {
	abstract execute(...args: unknown[]): Promise<Result<unknown, unknown>>;
}
