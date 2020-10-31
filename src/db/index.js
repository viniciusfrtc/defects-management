const Sequelize = require('sequelize')
const appConfig = require('../config')
const dbConfig = require('./../config/database')[appConfig.env]
const modelsFactory = require('./models')
let models

const connectToDatabase = async () => {
	const { database, username, password, dialect } = dbConfig
	try {
		const sequelize = new Sequelize(
			database,
			username,
			password,
			{
				dialect,
				define: {
					freezeTableName: true,
				},
				timezone: 'Europe/Berlin',
			},
		)
		await sequelize.authenticate()
		console.log('Successfully connected to database.')
		models = modelsFactory(sequelize)
		await sequelize.sync({ force: appConfig.forceDbSync })
		console.log('Models are loaded and synced successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}

module.exports = {
	connectToDatabase,
	getModels: () => models,
}
