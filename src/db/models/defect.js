const { DataTypes } = require('sequelize')
const momentTz = require('moment-timezone')

module.exports = sequelize => sequelize.define('defect', {
	personalNumber: {
		type: DataTypes.TEXT,
		field: 'personal_number',
	},
	description: {
		type: DataTypes.TEXT,
	},
	status: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	defectTime: {
		type: DataTypes.DATE,
		allowNull: false,
		field: 'defect_time',
		get() {
			return momentTz
				.tz(new Date(this.getDataValue('defectTime')), 'Europe/Berlin')
				.toISOString(true)
		},
	},
	workerRegistryId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: 'worker_registry_id',
	},
	machineId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: 'machine_id',
	},
}, {
	underscored: true,
	timestamps: false,
})
