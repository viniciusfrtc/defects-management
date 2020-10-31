module.exports = {
	up: async (queryInterface) => {
		await queryInterface.bulkInsert('machine', [
			{
				id: 1,
				machine_type: 'machine_type',
				shift: 2,
				selected_orders: ['order1', 'order2'],
				workplace: 2,
				parallel_orders: true,
			},
			{
				id: 2,
				machine_type: 'machine_type',
				shift: 2,
				selected_orders: ['order1', 'order2'],
				workplace: 2,
				parallel_orders: true,
			},
			{
				id: 3,
				machine_type: 'machine_type',
				shift: 2,
				selected_orders: ['order1', 'order2'],
				workplace: 2,
				parallel_orders: true,
			},
		], {})
		await queryInterface.bulkInsert('worker_registry', [
			{
				personal_number: '12345',
				name: 'John',
				id: 1,
			},
			{
				personal_number: '123456',
				name: 'James',
				id: 2,
			},
			{
				personal_number: '1234567',
				name: 'Joseph',
				id: 3,
			},
		], {})
		await queryInterface.bulkInsert('defect', [
			{
				personal_number: '12345',
				description: 'defect machine id 1',
				machine_id: 1,
				status: 2,
				worker_registry_id: 1,
				defect_time: new Date('2019-10-31T13:35:52.982Z'),
			},
			{
				personal_number: '123456',
				description: 'defect machine id 1',
				machine_id: 1,
				status: 3,
				worker_registry_id: 2,
				defect_time: new Date(),
			},
			{
				personal_number: '1234567',
				description: 'defect machine id 2',
				machine_id: 2,
				worker_registry_id: 3,
				status: 1,
				defect_time: new Date(),
			},
		], {})
	},

	down: async (queryInterface) => {
		await queryInterface.bulkDelete('machine', null, {})
		await queryInterface.bulkDelete('worker_registry', null, {})
		await queryInterface.bulkDelete('defect', null, {})
	},
}
