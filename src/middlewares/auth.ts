// ========== Auth Middlewares
// import all modules
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import { body, validationResult } from 'express-validator'
import response from '../helpers/response'

export const registerMiddleware = [
	body('email', "The email field can't be empty")
		.notEmpty(),
	body('password', "The password field can't be empty")
		.notEmpty(),
	body('phoneNumber', "The phone number field can't be empty")
		.notEmpty(),
	body('email', 'The email field is incorrect')
		.isEmail(),
	body('password', 'The password is too week')
		.isStrongPassword(),
	body('phoneNumber', 'The phone number field is incorrect')
		.isMobilePhone('id-ID'),

	(req: Request, res: Response, next: NextFunction): void | Response => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return response(req, res, 200, false, errors.array()[0].msg)
		}

		return next()
	}
]

export const isLogin = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
	const token: string | undefined = req.headers.authorization

	if (token) {
		try {
			const decode: any = await jwt.verify(token, config.secretKey)
			req.app.locals.token = decode
			next()
		} catch (err: any) {
			console.log(err)
			return response(req, res, 400, false, err.message)
		}
	} else {
		return response(req, res, 400, false, 'Forbidden')
	}
}
