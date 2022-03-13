// ========== Auth Controllers
// import all modules
import { Request, Response, NextFunction } from 'express'
import response from '../helpers/response'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config'
import sendEmail from '../helpers/mailer'

// import all models
import users from '../models/User'

namespace AuthControllerModule {
	export class Auth {
		private static refreshTokens: string[] = [];

		public static async register (req: Request, res: Response, next: NextFunction): Promise<Response> {
			try {
				const results: any = await users.findOneByEmail(req.body.email)

				if (results) {
					return response(req, res, 400, false, 'The email already exists')
				}

				try {
					const data: any = {
						email: req.body.email,
						phone_number: req.body.phoneNumber,
						password: await bcryptjs.hash(req.body.password, 10)
					}
					const results: any = await users.create(data)

					if (results.affectedRows > 0) {
						return response(req, res, 200, true, 'The user is successfully registered', {
							id: results.insertId,
							...data,
							password: undefined
						})
					} else {
						return response(req, res, 500, false, 'Failed to register a user')
					}
				} catch (err) {
					console.log(err)
					return response(req, res, 500, false, 'Failed to register a user, server error')
				}
			} catch (err) {
				console.log(err)
				return response(req, res, 500, false, 'Failed to getting a user by email, server error')
			}
		}

		public static async login (req: Request, res: Response): Promise<Response> {
			try {
				const isExists: any = await users.findOneByEmail(req.body.email)

				if (!isExists || !(await bcryptjs.compare(req.body.password, isExists.password))) {
					return response(req, res, 400, false, 'The email or password is wrong')
				}

				const accessToken: string = jwt.sign({ id: isExists.id, email: isExists.email }, config.accessTokenSecretKey, config.accessTokenOption)

				const refreshToken: string = jwt.sign({ id: isExists.id, email: isExists.email }, config.refreshTokenSecretKey, config.refreshTokenOption)

				Auth.refreshTokens.push(refreshToken)

				return response(req, res, 200, true, 'Login Successfully', { accessToken, refreshToken })
			} catch (err: any) {
				console.log(err)
				return response(req, res, 500, false, 'Login Failed')
			}
		}

		public static async sendForgotPasswordLink (req: Request, res: Response): Promise<Response> {
			try {
				const user = await users.findOneByEmail(req.body.email)

				if (!user) {
					return response(req, res, 400, false, 'The user does not exist')
				}

				try {
					const info: any = await sendEmail(user.id, req.body.email)
					console.log(info)
					return response(req, res, 200, true, 'The message link has been sent')
				} catch (err: any) {
					console.log(err)
					return response(req, res, 500, false, err.message)
				}
			} catch (err) {
				console.log(err)
				return response(req, res, 500, false, 'Failed to get a user data')
			}
		}

		public static async updatePassword (req: Request, res: Response): Promise<Response> {
			try {
				const user = await users.findOne({ id: req.params.id })

				if (!user) {
					return response(req, res, 400, false, 'The user does not exist')
				}

				if (!(await bcryptjs.compare(req.body.currentPassword, user.password))) {
					return response(req, res, 400, false, "The current password doesn't match")
				}

				const data: any = {
					password: await bcryptjs.hash(req.body.password, 10)
				}

				try {
					const results: any = await users.update(user.id, data)

					if (results.affectedRows < 1) {
						return response(req, res, 400, false, 'Failed to update the password')
					}

					return response(req, res, 200, true, 'The password has been updated')
				} catch (err: any) {
					console.log(err)
					return response(req, res, 500, false, err.message)
				}
			} catch (err) {
				console.log(err)
				return response(req, res, 500, false, 'Failed to get a user data')
			}
		}

		public static async getAccessToken (req: Request, res: Response): Promise<Response> {
			const refreshToken: any = req.headers['x-refresh-token']

			if (Auth.refreshTokens.indexOf(String(refreshToken)) === -1) {
				return response(req, res, 400, false, 'Invalid refresh token')
			}

			try {
				const decodeRefreshToken: any = await jwt.verify(refreshToken, config.refreshTokenSecretKey)
				const accessToken: any = jwt.sign({ id: decodeRefreshToken.id, email: decodeRefreshToken.email }, config.accessTokenSecretKey)

				return response(req, res, 200, true, 'The access token is created successfully', { accessToken })
			} catch (err: any) {
				console.log(err)
				return response(req, res, 500, false, err.message)
			}
		}
	}
}

export default AuthControllerModule
