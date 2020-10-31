const logger = require('./logger')

const ERRORS_LIST = {
	MACHINE_DOESNT_EXIST_ERROR: {
		code: '400',
		message: 'Machine Id doesn\'t exist',
	},
	PERSONAL_WORKER_DOESNT_EXIST_ERROR: {
		code: '400',
		message: 'Personal worker doesn\'t exist',
	},
	GET_DEFECTS_BY_MACHINE_ID_ERROR: {
		code: '500',
		message: 'An error has occurred',
	},
	SET_NEW_DEFECT_ERROR: {
		code: '500',
		message: 'Failed to insert new defect',
	},
	GET_MOST_RECENT_DEFECT_ERROR: {
		code: '500',
		message: 'An error has occurred',
	},
	SET_MACHINE_STATUS_ERROR: machineId => ({
		code: '500',
		message: `Failed to set the status of the machine ${machineId}`,
	}),
	SET_DEFECT_STATUS_ERROR: {
		code: '500',
		message: 'An error has occurred',
	},
	GET_ALL_DEFECTS_ERROR: {
		code: '500',
		message: 'An error has occurred',
	},
}

class CustomError extends Error {
	constructor(message, code) {
		super(message)
		this.code = code
	}
}
const isCustomError = error => error instanceof CustomError

const createError = error => {
	const { message, code } = error
	return new CustomError(message, code)
}

const handleError = (error, standardError) => {
	let formattedError = error
	if (!isCustomError(error)){
		formattedError = createError(standardError)
	}
	if (formattedError.code === '500') {
		logger.error(formattedError)
	}
	throw formattedError
}

module.exports = {
	ERRORS_LIST,
	createError,
	handleError,
}
