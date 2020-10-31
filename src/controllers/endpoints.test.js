const expect = require('expect')
const supertest = require('supertest')
let app, server, request

describe('defect endpoints test', () => {
	before(async () => {
		const port = 3000
		await require('../db').connectToDatabase()
		const app = require('./index.js')
		server = app.listen(port)
		request = supertest(app)
	})
	describe('getMachineDefects', () => {
		it('should fetch defects by machineId', async () => {
			const res = await request.get('/machines/1/defects')
			expect(res.body).toHaveLength(2)
		})
		it('should return error if machine doesn\'t exist', async () => {
			const res = await request.get('/machines/123/defects')
			expect(res.body).toHaveProperty('error')
			expect(res.body.error.code).toEqual('400')
			expect(res.body.error.message).toEqual('Machine Id doesn\'t exist')
		})
		it('should return default error if some other error occurs', async () => {
			const res = await request.get('/machines/asd/defects')
			expect(res.body).toHaveProperty('error')
			expect(res.body.error.code).toEqual('500')
			expect(res.body.error.message).toEqual('An error has occurred')
		})
	})
	describe('setDefect', () => {
		it('should create new defect', async () => {
			const res = await request
				.post('/defect')
				.send({
					personalNumber: '12345',
					description: 'new defect',
					machineId: 1,
				})
			expect(res.body).toHaveProperty('id')
		})
		it('should return error if personal worker doesn\'t exist', async () => {
			const res = await request
				.post('/defect')
				.send({
					personalNumber: '112345',
					description: 'new defect',
					machineId: 1,
				})
			expect(res.body).toHaveProperty('error')
			expect(res.body.error.code).toEqual('400')
			expect(res.body.error.message).toEqual('Personal worker doesn\'t exist')
		})
		it('should return error if machine doesn\'t exist', async () => {
			const res = await request
				.post('/defect')
				.send({
					personalNumber: '12345',
					description: 'new defect',
					machineId: 12,
				})
			expect(res.body).toHaveProperty('error')
			expect(res.body.error.code).toEqual('400')
			expect(res.body.error.message).toEqual('Machine Id doesn\'t exist')
		})
		it('should return default error if some other error occurs', async () => {
			const res = await request
				.post('/defect')
				.send({
					personalNumber: '12345',
					description: {},
					machineId: 1,
				})
			expect(res.body).toHaveProperty('error')
			expect(res.body.error.code).toEqual('500')
			expect(res.body.error.message).toEqual('Failed to insert new defect')
		})
	})
	describe('getMostRecentDefect', () => {
		it('should return most recent defect', async () => {
			const res = await request.get('/machines/1/defect/last')
			expect(res.body).toHaveProperty('id')
		})
		it('should return empty object if there are no defects for given machine', async () => {
			const res = await request.get('/machines/3/defect/last')
			expect(Object.keys(res.body)).toHaveLength(0)
		})
		it('should return default error if some other error occurs', async () => {
			const res = await request.get('/machines/asd/defect/last')
			expect(res.body).toHaveProperty('error')
			expect(res.body.error.code).toEqual('500')
			expect(res.body.error.message).toEqual('An error has occurred')
		})
	})
	describe('setDefectStatus', () => {
		it('should successfully update defect and machine status', async () => {
			const {body: defect} = await request.get('/machines/1/defect/last')
			const res = await request
				.put(`/machines/${defect.machineId}/defect`)
				.send({
					defectTime: defect.defectTime,
					status: 3,
				})
			expect(res.body).toHaveProperty('success')
			expect(res.body.success).toEqual('Successfully updated and set the status of the machine 1')
		})
		it('should successfully update defect status', async () => {
			const {body: defect} = await request.get('/machines/1/defect/last')
			const res = await request
				.put(`/machines/${defect.machineId}/defect`)
				.send({
					defectTime: defect.defectTime,
					status: 2,
				})
			expect(res.body).toHaveProperty('success')
			expect(res.body.success).toEqual('Successfully updated the status of defect')
		})
		it('should return error if update fails (db error)', async () => {
			const {body: defect} = await request.get('/machines/1/defect/last')
			const res = await request
				.put(`/machines/${defect.machineId}/defect`)
				.send({
					defectTime: defect.defectTime,
					status: {},
				})
			expect(res.body).toHaveProperty('error')
			expect(res.body.error.code).toEqual('500')
			expect(res.body.error.message).toEqual('An error has occurred')
		})
		it('should return error if update is performed', async () => {
			const {body: defect} = await request.get('/machines/1/defect/last')
			const res = await request
				.put(`/machines/${defect.machineId}/defect`)
				.send({
					defectTime: new Date(),
					status: 2,
				})
			expect(res.body).toHaveProperty('error')
			expect(res.body.error.code).toEqual('500')
			expect(res.body.error.message).toEqual(`Failed to set the status of the machine ${defect.machineId}`)
		})
	})
	describe('getAllDefects', () => {
		it('should return all defects with status 1, 2, 3', async () => {
			const res = await request.get('/defects')
			expect(res.body).toHaveProperty('pending')
			expect(res.body.pending).toHaveLength(1)
			expect(res.body).toHaveProperty('in_process')
			expect(res.body.in_process).toHaveLength(2)
			expect(res.body).toHaveProperty('completed')
			expect(res.body.completed).toHaveLength(1)
		})
	})
	after(() => {
		process.exit(0)
	})
})