const { DataTypes } = require('sequelize')

module.exports = sequelize => sequelize.define('worker_registry', {
	personal_number: {
		type: DataTypes.TEXT,
		primaryKey: true,
	},
	name: {
		type: DataTypes.TEXT,
	},
})