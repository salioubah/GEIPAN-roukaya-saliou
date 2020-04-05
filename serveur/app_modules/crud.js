const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbName = 'geipan_database';
// Connection URL
const url = 'mongodb://geipan_user:geipan2020@ds113936.mlab.com:13936/' + dbName;

const client = new MongoClient(url);
exports.findcasByFilter = function (page, pagesize, classification, zone, resume, callback) {
    let count;
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        let reqClassification = classification ? classification : { $exists: true };
        let reqZone = zone ? zone : { $exists: true };
        let reqResume = resume ? { $regex: ".*" + resume + ".*", $options: "i" } : { $exists: true };
        //let reqDate = (dateCasDebut && dateCasFin) ? { $gte: dateCasDebut, $lte: dateCasFin } : { $exists: true };
        let filter = { "cas_classification": reqClassification, "cas_zone_nom": reqZone, "cas_resume": reqResume }
        db.collection('cas')
            .find(filter)
            .skip(page * pagesize)
            .limit(pagesize)
            .toArray()
            .then(cas => {
                db.collection('cas')
                    .find(filter)
                    .count()
                    .then(count => callback(cas, count))
            })
    });
};

exports.findCasById = function (idCas, callback) {
    client.connect(function (err) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const query = { id_cas: idCas };
        db.collection('cas').findOne(query, (err, item) => {
            callback(item);
        })
    });
};

exports.findTemoignageById = function (idTemoignange, callback) {
    client.connect(function (err) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const query = { id_temoignage: idTemoignange };
        db.collection('temoignages').findOne(query, (err, item) => {
            callback(item);
        })
    }
    )
};

exports.findTemoignagesByCasId = function (idCas, callback) {
    client.connect(function (err) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const query = { id_cas: idCas };
        db.collection('temoignages').find(query).toArray().then(items => {
            callback(items, items.length);
        })
    })
};