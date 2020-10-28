const { Sequelize } = require('sequelize')
const { mysqlConfig } = require('../config')

const sequelize = new Sequelize(
	mysqlConfig.database,
	mysqlConfig.username,
	mysqlConfig.password,
	{
		host: mysqlConfig.hostname,
		dialect: 'mysql',
	},
)

module.exports = sequelize