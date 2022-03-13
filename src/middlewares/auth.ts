// ========== Auth Middlewares
// import all modules
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import { body, param, validationResult, header } from 'express-validator'
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
			return response(req, res, 400, false, errors.array()[0].msg)
		}

		next()
	}
]

export const isLogin = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
	const accessToken: string | undefined = req.headers.authorization

	if (accessToken) {
		try {
			const decode: any = await jwt.verify(accessToken, config.accessTokenSecretKey)
			req.app.locals.accessToken = decode
			next()
		} catch (err: any) {
			console.log(err)
			return response(req, res, 400, false, err.message)
		}
	} else {
		return response(req, res, 400, false, 'Forbidden')
	}
}

export const sendForgotPasswordLink = [
	body('email', "The email field can't be empty")
		.notEmpty(),
	body('email', 'The email field is incorrect')
		.isEmail(),
	(req: Request, res: Response, next: NextFunction): void | Response => {
		const errors: any = validationResult(req)

		if (!errors.isEmpty()) {
			return response(req, res, 400, false, errors.array()[0].msg)
		}

		next()
	}
]

export const updatePassword = [
	param('id', 'The id is not a number')
		.isInt(),
	body('currentPassword', "The current password field can't be empty")
		.notEmpty(),
	body('password', "The password field can't be empty")
		.notEmpty(),
	body('currentPassword', 'The current password is too week')
		.isStrongPassword(),
	body('password', 'The password is too week')
		.isStrongPassword(),
	(req: Request, res: Response, next: NextFunction): void | Response => {
		const errors: any = validationResult(req)

		if (!errors.isEmpty()) {
			return response(req, res, 400, false, errors.array()[0].msg)
		}

		next()
	}
]

export const getAccessToken = [
	header('x-refresh-token', "The refresh token can't be empty")
		.notEmpty(),
	header('x-refresh-token', 'The refresh token must be string')
		.isString(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors: any = validationResult(req)

		if (!errors.isEmpty()) {
			return response(req, res, 400, false, errors.array()[0].msg)
		}

		next()
	}
]
