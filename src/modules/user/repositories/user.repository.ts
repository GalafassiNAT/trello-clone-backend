import { Repository } from 'src/@core/repository.core';
import { User } from '../domain/user.entity';
import { FindUserDTO } from '../@types/user.dto';

export abstract class UserRepository extends Repository<User> {
	abstract create(user: User): Promise<User | null>;

	abstract findAll(): Promise<User[]>;

	abstract findOne(findOneUserDTO: FindUserDTO): Promise<User | null>;

	abstract findOneDetailed(findOneUserDTO: FindUserDTO): Promise<User | null>;

	abstract findAllDetailed(): Promise<User[]>;

	abstract update(user: User): Promise<User | null>;

	abstract updateRole(user: User): Promise<void>;

	abstract remove(user: User): Promise<boolean>;
}
