const { DataTypes } = require('sequelize')

module.exports = sequelize => sequelize.define('defect', {
	personal_number: {
		type: DataTypes.TEXT,
	},
	description: {
		type: DataTypes.TEXT,
	},
	status: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	machine_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	defect_time: {
		type: DataTypes.DATE,
		allowNull: false,
	},
})