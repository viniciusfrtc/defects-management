module.exports = sequelize => {
	const Machine = require('./machine')(sequelize)
	const Defect = require('./defect')(sequelize)
	const WorkerRegistry = require('./worker-registry')(sequelize)

	Defect.belongsTo(Machine, {
		foreignKey: 'machine_id',
	})
	WorkerRegistry.hasMany(Defect, {
		foreignKey: 'personal_number',
	})

	return {
		Machine,
		Defect,
		WorkerRegistry,
	}
}