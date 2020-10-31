const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'dev'
const config = require('./../config/database')[env]
const modelsFactory = require('./models')
let models

const connectToDatabase = async () => {
	const { database, username, password, dialect } = config
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
			},
		)
		await sequelize.authenticate()
		console.log('Successfully connected to database.')
		models = modelsFactory(sequelize)
		await sequelize.sync({ force: true })
		console.log('Models are loaded and synced successfully.')
	} catch (error) {
		console.error('Unable to connect to the database:', error)
	}
}

module.exports = {
	connectToDatabase,
	getModels: () => models,
}
