module.exports = sequelize => {
	const Machine = require('./machine')(sequelize)
	const Defect = require('./defect')(sequelize)
	const WorkerRegistry = require('./worker-registry')(sequelize)

	Machine.hasMany(Defect)
	Defect.belongsTo(Machine)

	WorkerRegistry.hasMany(Defect)
	Defect.belongsTo(WorkerRegistry)

	return {
		Machine,
		Defect,
		WorkerRegistry,
	}
}
