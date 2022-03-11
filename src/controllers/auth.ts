// ========== Auth Controllers
// import all modules
import { Request, Response, NextFunction } from 'express'
import response from '../helpers/response'
import bcryptjs from 'bcryptjs'

// import all models
import users from '../models/User'

namespace AuthControllerModule {
	export class Auth {
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
	}
}

export default AuthControllerModule
