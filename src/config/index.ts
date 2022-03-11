// ========== Server Configurations
// import all modules
import { config } from 'dotenv'

config()

export default {
	env: String(process.env.ENV),
	port: Number(process.env.PORT) || 3000,
	appUrl: String(process.env.APP_URL),
	apiUrl: String(process.env.API_URL),
	publicUrl: String(process.env.PUBLIC_URL),
	secretKey: String(process.env.SECRET_KEY),
	webAppUrl: String(process.env.WEB_APP_URL),
	whiteLists: [
		'http://localhost:3000',
		'http://127.0.0.1:3000',
		'http://192.168.1.35:3000'
	],
	database: {
		host: String(process.env.DB_HOST),
		user: String(process.env.DB_USER),
		password: String(process.env.DB_PASSWORD),
		database: String(process.env.DB_NAME)
	},
	email: {
		host: String(process.env.EMAIL_HOST),
		service: String(process.env.EMAIL_SERVICE),
		email: String(process.env.EMAIL),
		password: String(process.env.EMAIL_PASSWORD)
	}
}
