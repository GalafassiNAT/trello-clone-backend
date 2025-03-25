import { z } from 'zod';

const envSchema = z
	.object({
		PORT: z.coerce.number(),
		NODE_ENV: z.enum(['development', 'production', 'test']),
		DB_HOST: z.string().min(1),
		DB_PORT: z.coerce.number(),
		DB_USER: z.string().min(1),
		DB_PASSWORD: z.string().min(1),
		DB_DATABASE: z.string().min(1),
		JWT_SECRET: z.string().min(1),
		JWT_EXPIRES_IN: z.string().min(1),
		ROUND_SALT: z.coerce.number(),
	})
	.readonly();

export const validate = (config: any) => envSchema.parse(config);
