import { Entity } from 'src/@core/entity.core';
import { Result, success } from 'src/@core/result.core';
import { RoleError } from '../errors/role.error';

export interface RoleProps {
	accessLevel: number;
	name: string;
}

export class Role extends Entity<RoleProps> {
	private constructor(props: RoleProps, id?: string) {
		super(props, id);
	}

	get accessLevel(): number {
		return this.props.accessLevel;
	}

	get name(): string {
		return this.props.name;
	}

	set accessLevel(accessLevel: number) {
		this.props.accessLevel = accessLevel;
	}

	set name(name: string) {
		this.props.name = name;
	}

	static create(props: RoleProps, id?: string): Result<Role, RoleError> {
		if (props.accessLevel < 0) {
			return fail(new RoleError('invalidRole'));
		}

		if (props.name.length == 0) {
			return fail(new RoleError('emptyRole'));
		}

		return success(new Role(props, id));
	}
}
