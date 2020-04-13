const express = require('express')
const app = express()
const mongoDBModule = require('./app_modules/crud');

app.get('/', function (req, res) {
	res.send('Hello World!')
})

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

	next();
});

app.listen(8888, function () {
	console.log('Example app listening on port 8888!')
})


app.get('/cas', function (req, res) {
	let page = parseInt(req.query.page || 1);
	let pagesize = parseInt(req.query.pagesize || 10);
	let classification = req.query.classification || '';
	let zone = req.query.zone || '';
	let resume = req.query.resume || '';

	let dateCasDebut = req.query.dateCasDebut ? new Date(req.query.dateCasDebut) : '';
	let dateCasFin = req.query.dateCasFin ? new Date(req.query.dateCasFin) : '';

	mongoDBModule.findcasByFilter(page, pagesize, dateCasDebut, dateCasFin, classification, zone, resume, function (cas, count) {
		let responseJson = { "count": count, "page": page, "pagesize": pagesize, "data": cas }
		res.send(JSON.stringify(responseJson));
	})
})

app.get('/cas/:id', function (req, res) {
	const idCas = parseInt(req.params.id);
	mongoDBModule.findCasById(idCas, function (cas) {
		res.send(JSON.stringify(cas));
	})
});

app.get('/cas/:id/temoignages', function (req, res) {
	const idCas = parseInt(req.params.id);
	mongoDBModule.findTemoignagesByCasId(idCas, function (temoignages, count) {
		let responseJson = { "count": count, "data": temoignages }
		res.send(JSON.stringify(responseJson));
	})
});

app.get('/temoignages/:id', function (req, res) {
	const idTemoignage = parseInt(req.params.id);
	mongoDBModule.findTemoignageById(idTemoignage, function (temoignage) {
		res.send(JSON.stringify(temoignage));
	})
});

app.get('/departements', function (req, res) {
    mongoDBModule.findDistinctDepartements(function (temoignages) {
        console.log(temoignages.length)
        res.send(JSON.stringify(temoignages));
    })
});
app.get('/departementCas', function (req, res) {
    let zone = req.query.zone || '';
    mongoDBModule.findcasByDepartement(zone, function (cas, count) {
        let responseJson = { "count": count, "data": cas }
        res.send(JSON.stringify(responseJson));
    })
})