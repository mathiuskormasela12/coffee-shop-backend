// ========== Auth Controllers
// import all modules
import { Request, Response, NextFunction } from 'express'
import response from '../helpers/response'

namespace AuthControllerModule {
	export class Auth {
		public static register (req: Request, res: Response, next: NextFunction): Response {
			return response(req, res, 200, true, 'Welcome to the Coffee Shop RESTful API')
		}
	}
}

export default AuthControllerModule
