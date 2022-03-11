// ========== Auth Router
// import all modules
import { Router as ExpressRouter } from 'express'
import RouterModule from './Router'

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
			this.router.get('/auth/register', AuthControllerModule.Auth.register)

			return this.router
		}
	}
}

export default AuthRouterModule
