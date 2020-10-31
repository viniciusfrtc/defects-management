const machineRepository = require('../repositories/machine-repository')
const defectRepository = require('../repositories/defect-repository')
const workerRegistryRepository =
	require('../repositories/worker-registry-repository')
const { ERRORS_LIST, createError, handleError } = require('../helpers/errors')
const { info: logInfo } = require('../helpers/logger')
const { defectStatusMap } = require('../helpers/constants')
const MachineInfo =require('../helpers/machine-info')
const { invert } = require('lodash')

const checkIfMachineExists = async machineId => {
	const machine = await machineRepository.getMachine(machineId)
	if (!machine) {
		throw createError(ERRORS_LIST.MACHINE_DOESNT_EXIST_ERROR)
	}
}

const getPersonalWorkerIfExists = async personalNumber => {
	const personalWorker = await workerRegistryRepository.getPersonalWorker(
		personalNumber,
	)
	if (!personalWorker) {
		throw createError(ERRORS_LIST.PERSONAL_WORKER_DOESNT_EXIST_ERROR)
	}
	return personalWorker
}

// originally getDefectInfo
const getMachineDefects = async machineId => {
	try {
		await checkIfMachineExists(machineId)
		const defects = await defectRepository.getDefectsByMachineId(machineId)
		return defects
	} catch (error) {
		throw handleError(
			error,
			ERRORS_LIST.GET_DEFECTS_BY_MACHINE_ID_ERROR,
		)
	}
}

const setDefect = async (personalNumber, description, machineId) => {
	try {
		const personalWorker = await getPersonalWorkerIfExists(personalNumber)
		await checkIfMachineExists(machineId)
		const result = await defectRepository.createDefect(
			personalWorker,
			description,
			machineId,
		)
		if (result) {
			logInfo(
				// eslint-disable-next-line max-len
				`Successfully set the defect for machine ${machineId} with ${description} by ${personalNumber}`,
			)
		}
		return result
	} catch (error) {
		throw handleError(
			error,
			ERRORS_LIST.SET_NEW_DEFECT_ERROR,
		)
	}

}

// originally getDefectStatus
const getMostRecentDefect = async machineId => {
	try {
		await checkIfMachineExists(machineId)
		const mostRecentDefect = await defectRepository
			.getMostRecentDefectByMachineId(machineId)
		return mostRecentDefect || {}
	} catch (error) {
		throw handleError(
			error,
			ERRORS_LIST.GET_MOST_RECENT_DEFECT_ERROR,
		)
	}
}

const setDefectStatus = async (machineId, defectTime, status) => {
	try {
		const [updated] = await defectRepository.setDefectStatus(
			machineId,
			defectTime,
			status,
		)
		const { completed: statusCompleted } = invert(defectStatusMap)
		let machineUpdate
		if (updated && Number(status) === Number(statusCompleted)) {
			const machineInfo = new MachineInfo()
			machineUpdate = await machineInfo.setMachineStatus(machineId, 1)
			if (machineUpdate.success) {
				// eslint-disable-next-line max-len
				const message = `Successfully updated and set the status of the machine ${machineId}`
				logInfo(message)
				return {
					success: message,
				}
			} else {
				throw createError(
					ERRORS_LIST.SET_MACHINE_STATUS_ERROR(machineId),
				)
			}
		}
		if (updated) {
			return {
				success: 'Successfully updated the status of defect',
			}
		} else {
			throw createError(
				ERRORS_LIST.SET_MACHINE_STATUS_ERROR(machineId),
			)
		}
	} catch (error) {
		throw handleError(
			error,
			ERRORS_LIST.SET_DEFECT_STATUS_ERROR,
		)
	}

}

// originally getAllDefect
const getAllDefects = async () => {
	try {
		const possibleDefectStatuses = Object.keys(defectStatusMap)
		const allDefects = await defectRepository.getAllDefectsByStatus(
			possibleDefectStatuses,
		)
		return allDefects.reduce((acc, currentDefect) => {
			const currentDefectName = defectStatusMap[currentDefect.status]
			if (acc[currentDefectName]) {
				acc[currentDefectName].push(currentDefect)
			} else {
				acc[currentDefectName] = [currentDefect]
			}
			return acc
		}, {})
	} catch (error) {
		throw handleError(
			error,
			ERRORS_LIST.GET_ALL_DEFECTS_ERROR,
		)
	}

}

module.exports = {
	getMachineDefects,
	getMostRecentDefect,
	getAllDefects,
	setDefect,
	setDefectStatus,
}
