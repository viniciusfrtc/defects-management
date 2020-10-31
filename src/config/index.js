module.exports = {
	port: 3000,
	forceDbSync: process.env.FORCE_DB_SYNC || false,
	env: process.env.NODE_ENV || 'dev',
}
