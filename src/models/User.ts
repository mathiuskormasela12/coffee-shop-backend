// ========== User
// import all modules
import DatabaseModule from '../core/Database'

namespace UserModule {
	export class User extends DatabaseModule.Database {
		public synch (): Promise<any> {
			const sql: string = `
				CREATE TABLE IF NOT EXISTS users(
					id int(11) AUTO_INCREMENT PRIMARY KEY,
					first_name varchar(255),
					last_name varchar(255),
					display_name varchar(255),
					photo varchar(255) DEFAULT 'nophoto.png',
					email varchar(255) NOT NULL UNIQUE,
					phone_number varchar(255) NOT NULL UNIQUE,
					password varchar(255) NOT NULL UNIQUE,
					address text,
					birthday date,
					gender enum('male', 'female')
				);
			`

			return new Promise((resolve: any, reject: any) => {
				this.database.query(sql, (err: any) => {
					if (err) {
						reject(err)
					} else {
						resolve('The User table has been created')
					}
				})
			})
		}

		public async findOneByEmail (email: string): Promise<any> {
			const sql: string = 'SELECT * FROM users WHERE email = ?'

			return new Promise((resolve: any, reject: any) => {
				this.database.query(sql, email, (err: any, results: any) => {
					if (err) {
						reject(err)
					} else {
						resolve(results[0])
					}
				})
			})
		}

		public async findOne (condition: any): Promise<any> {
			const sql: string = `SELECT * FROM users WHERE ${Object.keys(condition).map((item, index) => `${item}='${Object.values(condition)[index]}'`).join(' AND ')}`

			return new Promise((resolve: any, reject: any) => {
				this.database.query(sql, (err: any, results: any) => {
					if (err) {
						reject(err)
					} else {
						resolve(results[0])
					}
				})
			})
		}

		public async findAll (condition: any): Promise<any> {
			const sql: string = `SELECT * FROM users WHERE ${Object.keys(condition).map((item, index) => `${item}='${Object.values(condition)[index]}'`).join(' AND ')}`

			return new Promise((resolve: any, reject: any) => {
				this.database.query(sql, (err: any, results: any) => {
					if (err) {
						reject(err)
					} else {
						resolve(results)
					}
				})
			})
		}

		public async create (data: any): Promise<any> {
			const sql: string = 'INSERT INTO users SET ?'

			return new Promise((resolve: any, reject: any) => {
				this.database.query(sql, data, (err: any, results: any) => {
					if (err) {
						reject(err)
					} else {
						resolve(results)
					}
				})
			})
		}

		public async update (id: number, data: any): Promise<any> {
			const sql: string = 'UPDATE users SET ? WHERE id = ?'

			return new Promise((resolve: any, reject: any) => {
				this.database.query(sql, [data, id], (err: any, results: any) => {
					if (err) {
						reject(err)
					} else {
						resolve(results)
					}
				})
			})
		}

		public async delete (id: number): Promise<any> {
			const sql: string = 'DELETE users WHERE id = ?'

			return new Promise((resolve: any, reject: any) => {
				this.database.query(sql, id, (err: any, results: any) => {
					if (err) {
						reject(err)
					} else {
						resolve(results)
					}
				})
			})
		}
	}
}

export default new UserModule.User()
