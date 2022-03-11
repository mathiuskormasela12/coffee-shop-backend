// ========== App
// import all modules
import express, { Application } from 'express'
import path from 'path'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'
import IApp from './IApp'
import config from '../config'
import initDatabase from './initDatabase'

// import all routes
import AuthRoutesModule from '../routes/auth'

const authRoutes = new AuthRoutesModule.AuthRouter()

namespace AppModule{
	export class App implements IApp {
		public app: Application;
		public port: number = config.port;

		constructor () {
			this.app = express()

			// setup several middlewares
			this.app.use(morgan('dev'))
			this.app.use(helmet())
			this.app.use(compression())

			// setup static files
			this.app.use(express.static(path.join(__dirname, '../../public')))

			// setup urlencoded & json
			this.app.use(express.urlencoded({ extended: false }))
			this.app.use(express.json())

			// setup cors
			const corsOption: any = {
				origin: function (origin: string, callback: any): void {
					if (config.whiteLists.indexOf(origin) !== -1 || !origin) {
						callback(null, true)
					} else {
						callback(new Error('Blocked by cors'))
					}
				}
			}

			this.app.use(cors(corsOption))

			// database initialization
			initDatabase()

			this.routes()
		}

		public routes (): void {
			this.app.use('/api/v1', authRoutes.getRouter)
		}

		public listen (): void {
			this.app.listen(this.port, () => {
				console.log(`Coffee Shop Web Service is running on ${config.apiUrl}`)
			})
		}
	}
}

export default AppModule
