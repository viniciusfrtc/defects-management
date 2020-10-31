const { Defect, WorkerRegistry } = require('../db').getModels()
const { Op } = require("sequelize")
const { invert } = require('lodash')
const { defectStatusMap } = require('../helpers/constants')
const momentTz = require('moment-timezone')

const getDefectsByMachineId = machineId => Defect.findAll({
	where: {
		machine_id: machineId,
	},
})

const getMostRecentDefectByMachineId = machineId =>
	Defect.findOne({
		where: {
			machine_id: machineId,
		},
		order: [['defect_time', 'DESC']],
	})

const getAllDefectsByStatus = statuses =>
	Defect.findAll({
		where: {
			status: {
				[Op.or]: statuses,
			},
		},
		include: [WorkerRegistry],
	})

const createDefect = (personalWorker, description, machineId) =>
	Defect.create({
		personalNumber: personalWorker.personalNumber,
		description,
		machineId: machineId,
		workerRegistryId: personalWorker.id,
		status: invert(defectStatusMap).pending,
		defectTime: new Date(),
	})

const setDefectStatus = (machineId, defectTime, status) =>
	Defect.update({
		status,
	}, {
		where: {
			machineId: machineId,
			defectTime: momentTz(
				new Date(defectTime),
				'Europe/Berlin',
			).toISOString(true),
		},
	})

module.exports = {
	getDefectsByMachineId,
	getMostRecentDefectByMachineId,
	getAllDefectsByStatus,
	createDefect,
	setDefectStatus,
}
