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
					photo varchar(255) DEFAULT 'nophoto',
					email varchar(255) NOT NULL UNIQUE,
					phone_number varchar(255) NOT NULL UNIQUE,
					password varchar(255) NOT NULL UNIQUE,
					address text,
					birthday date NOT NULL,
					gender enum('male', 'female')
				);
			`

			return new Promise((resolve, reject) => {
				this.database.query(sql, (err) => {
					if (err) {
						reject(err)
					} else {
						resolve('The User table has been created')
					}
				})
			})
		}
	}
}

export default UserModule
