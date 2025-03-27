import {
	CanActivate,
	ExecutionContext,
	Injectable,
	SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RequestWithUser } from '../../@types/user.dto';

export type AccessLevel = 'full-access' | 'partial-access' | 'no-access';

export const Role = (access: AccessLevel) => {
	switch (access) {
		case 'full-access':
			return AccessLevel(10);
		case 'partial-access':
			return AccessLevel(5);
		case 'no-access':
			return AccessLevel(0);
	}
};

export const AccessLevel = (accessLevel: number) =>
	SetMetadata('accessLevel', accessLevel);

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const handler = context.getHandler();

		const accessLevel = this.reflector.get<number>('accessLevel', handler);

		const request: RequestWithUser = context.switchToHttp().getRequest();

		const hasPermission = request.user.role.some(
			(role) => role.accessLevel >= accessLevel,
		);

		return hasPermission;
	}
}
