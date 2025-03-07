import { Email } from '../domain/email.sanitizer';

export class EmailFactory {
	static createEmail(value: string) {
		const email = Email.create({ value });

		if (email.wasFailure()) {
			return null;
		}

		return email.data;
	}
}
