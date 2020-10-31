const { WorkerRegistry } = require('../db').getModels()

const getPersonalWorker = personalNumber => WorkerRegistry.findOne({
	where: {
		personalNumber,
	},
})

module.exports = {
	getPersonalWorker,
}
