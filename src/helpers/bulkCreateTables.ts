// ========== BulkCreateDatabase
// import all modules
import IBulkCreateTables from './IBulkCreateTables'

function bulkCreateTables<T extends IBulkCreateTables> (databases: T[]): void {
	databases.forEach(item => {
		item.synch()
	})
}

export default bulkCreateTables
