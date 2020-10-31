module.exports = class MachineInfo {
	constructor() {
	}

	// eslint-disable-next-line require-await
	async setMachineStatus(status) {
		this.status = status
		return {
			success: true,
		}
	}
}
