process.env.FORCE_DB_SYNC = true

;(async () => {
	await require('../db').connectToDatabase()
	console.log('Database synced to model defition')
	process.exit(0)
})()
