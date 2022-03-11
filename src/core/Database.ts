// ========== Database
// import all modules
import mysql, { Connection } from 'mysql2'
import config from '../config'
import ICreateDatabase from './ICreateDatabase'

namespace DatabaseModule {
	export class Database {
		private connection: Connection;

		constructor () {
			this.connection = mysql.createConnection({
				host: config.database.host,
				user: config.database.user,
				password: config.database.password,
				database: config.database.database
			})

			this.connect()
		}

		protected get database (): Connection {
			return this.connection
		}

		public static createDatabase<T extends ICreateDatabase> (database: T): Promise<boolean | Error> {
			const sql: string = `CREATE DATABASE IF NOT EXISTS ${config.database.database} CHARACTER SET utf8 COLLATE utf8_general_ci;`

			return new Promise((resolve, reject) => {
				database.query(sql, (err: Error) => {
					if (err) {
						reject(err)
					} else {
						resolve(true)
					}
				})
			})
		}

		private connect (): void {
			this.connection.connect((err) => {
				if (err) {
					console.log(err)
				} else {
					console.log('The database has been connected')
				}
			})
		}
	}
}

export default DatabaseModule
