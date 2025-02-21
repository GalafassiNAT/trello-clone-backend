import { randomUUID } from 'node:crypto';

export abstract class Entity<T> {
	protected readonly _id: string;
	public readonly props: T;

	get id(): string {
		return this._id;
	}

	constructor(props: T, id?: string) {
		this._id = id || randomUUID();
		this.props = props;

		Object.freeze(this);
	}

	public equals(entity?: Entity<T>): boolean {
		if (entity == null || entity == undefined) return false;

		if (this === entity) return true;

		if (!(entity instanceof Entity)) return false;

		return this._id === entity._id;
	}
}
