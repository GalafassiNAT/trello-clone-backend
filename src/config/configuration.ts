export default () => ({
	enviroment: process.env.NODE_ENV,
	port: parseInt(process.env.PORT || '3000', 10),
	database: {
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT || '5432', 10),
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	},
	auth: {
		jwt: {
			secret: process.env.JWT_SECRET,
			expiresin: process.env.JWT_EXPIRES_IN,
		},
		salt: process.env.ROUND_SALT,
	},
});
