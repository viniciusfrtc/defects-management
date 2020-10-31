module.exports = app => {
	const { to } = require('await-to-js')
	const {
		getMachineDefects,
		getMostRecentDefect,
		getAllDefects,
		setDefect,
		setDefectStatus,
	} = require('../services/defect-service')

	app.get('/machines/:machineId/defects', async (req, res, next) => {
		const [error, machineDefects] = await to(
			getMachineDefects(req.params.machineId),
		)
		if (error) {
			return next(error)
		}
		res.json(machineDefects)
	})

	app.post('/defect', async (req, res, next) => {
		const [error, result] = await to(setDefect(
			req.body.personalNumber,
			req.body.description,
			req.body.machineId,
		))
		if (error) {
			return next(error)
		}
		res.json(result)
	})

	app.get('/machines/:machineId/defect/last', async (req, res, next) => {
		const [error, mostRecentDefect] = await to(
			getMostRecentDefect(req.params.machineId),
		)
		if (error) {
			return next(error)
		}
		res.json(mostRecentDefect)
	})

	app.put('/machines/:machineId/defect', async (req, res, next) => {
		const [error, result] = await to(setDefectStatus(
			req.params.machineId,
			req.body.defectTime,
			req.body.defectStatus,
		))
		if (error) {
			return next(error)
		}
		res.json(result)
	})

	app.get('/defects', async (req, res, next) => {
		const [error, allDefects] = await to(getAllDefects())
		if (error) {
			return next(error)
		}
		res.json(allDefects)
	})

	// eslint-disable-next-line no-unused-vars
	app.use((error, req, res, next) => {
		if (error) {
			res.status(error.code).json({
				erroror: {
					code: error.code,
					message: error.message,
				},
			})
		}
	})
}
