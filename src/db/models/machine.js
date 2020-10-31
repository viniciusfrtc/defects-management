const { DataTypes } = require('sequelize')

module.exports = sequelize => sequelize.define('machine', {
	machine_type: {
		type: DataTypes.TEXT,
	},
	machine_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
	},
	shift: {
		type: DataTypes.INTEGER,
	},
	status: {
		type: DataTypes.INTEGER,
		defaultValue: 3,
	},
	selected_orders: {
		type: DataTypes.ARRAY(DataTypes.TEXT),
	},
	workplace: {
		type: DataTypes.INTEGER,
	},
	parallel_orders: {
		type: DataTypes.BOOLEAN,
	},
})