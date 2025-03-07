import { Repository } from 'src/@core/repository.core';
import { User } from '../domain/user.entity';
import { FindUserDTO, UpdateUserDTO } from '../@types/user.dto';

export interface UserRepository extends Repository<User> {
	create(user: User): Promise<User>;

	findAll(): Promise<User[]>;

	findOne(findOneUserDTO: FindUserDTO): Promise<User>;

	update(updateUserDTO: UpdateUserDTO): Promise<User>;

	updateRole(user: User): Promise<void>;

	remove(user: User): Promise<void>;
}
