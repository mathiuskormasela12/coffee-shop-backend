// ========== IApp
// import all modules
import { Application } from 'express'

interface IApp {
	app: Application;
	readonly port: number;
	routes(): void;
	listen(): void;
}

export default IApp
