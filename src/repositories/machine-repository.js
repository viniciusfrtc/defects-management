const { Machine } = require('../db').getModels()

const getMachine = machineId => Machine.findOne({
	where: {
		id: machineId,
	},
})

module.exports = {
	getMachine,
}
