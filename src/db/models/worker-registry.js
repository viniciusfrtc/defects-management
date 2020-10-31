const { DataTypes } = require('sequelize')

module.exports = sequelize => sequelize.define('worker_registry', {
	personalNumber: {
		type: DataTypes.TEXT,
		unique: true,
		field: 'personal_number',
	},
	name: {
		type: DataTypes.TEXT,
	},
}, {
	underscored: true,
	timestamps: false,
})
