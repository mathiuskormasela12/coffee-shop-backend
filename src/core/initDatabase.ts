// ========== initDatabase
// import all modules
import mysql from 'mysql2'
import DatabaseModule from './Database'
import config from '../config'
import bulkCreateTables from '../helpers/bulkCreateTables'

// import all models
import users from '../models/User'

async function initDatabase (): Promise<void> {
	const databaseConnection = mysql.createConnection({
		host: config.database.host,
		user: config.database.user,
		password: config.database.password
	})

	try {
		// create the coffeeshop database
		await DatabaseModule.Database.createDatabase(databaseConnection)

		bulkCreateTables([users])
		console.log('The database and the tables have been created successfully!')
	} catch (err) {
		console.log(err)
	}
}

export default initDatabase
