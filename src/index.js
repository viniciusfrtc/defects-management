
(async () => {
	const port = 3000
	await require('./db').connectToDatabase()
	const app = require('./controllers')
	app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`)
	})
})()
