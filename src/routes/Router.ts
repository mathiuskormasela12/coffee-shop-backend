// ========== Router
// import all modules
import { Router as ExpressRouter } from 'express'

namespace RouterModule {
	export abstract class Router {
		protected abstract router: ExpressRouter

		public abstract get getRouter(): ExpressRouter;
	}
}

export default RouterModule
