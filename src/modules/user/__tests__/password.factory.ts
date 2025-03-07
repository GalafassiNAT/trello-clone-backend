import { Password } from '../domain/password.sanitizer';

export class PasswordFactory {
	static createPassword(value: string) {
		const password = Password.create({ value, isHashed: false });

		if (password.wasFailure()) {
			return null;
		}

		return password.data;
	}

	static createHashedPassword(hashedPassword: string) {
		const password = Password.create({
			value: hashedPassword,
			isHashed: true,
		});

		if (password.wasFailure()) {
			return null;
		}

		return password.data;
	}
}
