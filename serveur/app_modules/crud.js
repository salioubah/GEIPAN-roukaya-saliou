const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbName = 'geipan_database';
// Connection URL
const url = 'mongodb://geipan_user:geipan2020@ds113936.mlab.com:13936/' + dbName;

const client = new MongoClient(url);

exports.findcasByFilter = function (classification, callback) {

    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        //test = "";
        let req = classification ? classification : { $exists: true };
        let filter = { "cas_classification": req }
        db.collection('cas').find(filter).toArray().then(cas => {
            db.collection('cas').find(filter).count().then(count => callback(cas, count))
        })

    });
}

exports.findCasById = function (idCas, callback) { }

exports.findTemoignagesById = function (idTemoignanges, callback) { }

exports.findTemoignagesByCas = function (idCas, callback) { }