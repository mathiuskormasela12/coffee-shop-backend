// ========== Auth Middlewares
// import all modules
import { Request, Response, NextFunction } from 'express'
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

	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return response(req, res, 200, false, errors.array()[0].msg)
		}

		return next()
	}
]
