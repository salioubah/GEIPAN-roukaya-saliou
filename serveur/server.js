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
	mongoDBModule.findcasByFilter(classification, function (cas, count) {
		console.log(count)
		res.send(JSON.stringify(cas));
	})
})