module.exports = {
	error: error => console.log({
		level: 'error',
		message: error.toString(),
	}),
	info: message => console.log({
		level: 'info',
		message,
	}),
}
