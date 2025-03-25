import * as bcrypt from 'bcrypt';
import { HashService } from '../hash.service';

export type BcryptHashServiceProps = {
	roundSalt: number;
};

export class BcryptHashService implements HashService {
	constructor(private readonly props: BcryptHashServiceProps) {}

	async generateHash(value: string): Promise<string> {
		const saltRounds = this.props.roundSalt;
		const hashedValue = await bcrypt.hash(value, saltRounds);
		return hashedValue;
	}

	async compareHash(value: string, hashedValue: string): Promise<boolean> {
		const isMatch = await bcrypt.compare(value, hashedValue);
		return isMatch;
	}
}
