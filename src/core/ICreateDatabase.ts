// ========== ICreateDatabase

interface ICreateDatabase {
	query(sql: string, callback: Function): void
}

export default ICreateDatabase
