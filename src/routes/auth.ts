// ========== Auth Router
// import all modules
import { Router as ExpressRouter } from 'express'
import RouterModule from './Router'

// import all middlewares
import { registerMiddleware, sendForgotPasswordLink, updatePassword, getAccessToken } from '../middlewares/auth'

// import all controllers
import AuthControllerModule from '../controllers/auth'

namespace AuthRouterModule {
	export class AuthRouter extends RouterModule.Router {
		protected router: ExpressRouter;

		constructor () {
			super()
			this.router = ExpressRouter()
		}

		public get getRouter (): ExpressRouter {
			this.router.post('/auth/register', registerMiddleware, AuthControllerModule.Auth.register)
			this.router.post('/auth/login', AuthControllerModule.Auth.login)
			this.router.post('/auth/forgot-password', sendForgotPasswordLink, AuthControllerModule.Auth.sendForgotPasswordLink)
			this.router.put('/auth/password/:id', updatePassword, AuthControllerModule.Auth.updatePassword)
			this.router.post('/auth/access-token', getAccessToken, AuthControllerModule.Auth.getAccessToken)

			return this.router
		}
	}
}

export default AuthRouterModule
