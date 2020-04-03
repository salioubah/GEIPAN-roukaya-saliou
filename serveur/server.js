const express = require('express')
const app = express()
const mongoDBModule = require('./app_modules/crud');

app.get('/', function (req, res) {
	res.send('Hello World!')
})

app.listen(8888, function () {
	console.log('Example app listening on port 3000!')
})
app.get('/cas', function (req, res) {
	let classification = req.query.classification || '';
	let zone = req.query.zone || '';
	let resume = req.query.resume || '';
	mongoDBModule.findcasByFilter(classification, zone, resume, function (cas, count) {
		let responseJson = { "count": count, "data": cas }
		res.send(responseJson);
	})
})