const { DataTypes } = require('sequelize')

module.exports = sequelize => sequelize.define('machine', {
	machineType: {
		type: DataTypes.TEXT,
		field: 'machine_type',
	},
	shift: {
		type: DataTypes.INTEGER,
	},
	status: {
		type: DataTypes.INTEGER,
		defaultValue: 3,
	},
	selectedOrders: {
		type: DataTypes.ARRAY(DataTypes.TEXT),
		field: 'selected_orders',
	},
	workplace: {
		type: DataTypes.INTEGER,
	},
	parallelOrders: {
		type: DataTypes.BOOLEAN,
		field: 'parallel_orders',
	},
}, {
	underscored: true,
	timestamps: false,
})
