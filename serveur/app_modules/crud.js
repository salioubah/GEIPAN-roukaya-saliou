const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbName = 'geipan_database';
// Connection URL
//const url = 'mongodb://geipan_user:geipan2020@ds113936.mlab.com:13936/' + dbName;
const url = 'mongodb://localhost:27017' + dbName;

const client = new MongoClient(url);
exports.findcasByFilter = function (page, pagesize, dateCasDebut, dateCasFin, classification, zone, resume, callback) {
    let count;
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        let reqClassification = classification ? classification : { $exists: true };
        let reqZone = zone ? { $regex: ".*" + zone + ".*", $options: "i" } : { $exists: true };
        let reqResume = resume ? { $regex: ".*" + resume + ".*", $options: "i" } : { $exists: true };
        let reqDate;
        let queryDate = {};
        if (!dateCasDebut && !dateCasFin) {
            reqDate = { $exists: true };
        }
        if (dateCasDebut) {
            queryDate["$gte"] = dateCasDebut;
            reqDate = queryDate;
        }
        if (dateCasFin) {
            queryDate["$lte"] = dateCasFin;
            reqDate = queryDate;
        }
        console.log(reqDate)
        //let reqDate = (dateCasDebut && dateCasFin) ? { $gte: dateCasDebut, $lte: dateCasFin } : { $exists: true };
        let filter = {
            "cas_classification": reqClassification, "cas_zone_nom": reqZone, "cas_resume": reqResume, "cas_date": reqDate
        }
        let stage =
        {
            $addFields: {
                cas_date: {
                    $dateFromParts: {
                        "year": { $convert: { input: "$cas_AAAA", to: "int", onError: 2000 } },
                        "month": { $convert: { input: "$cas_MM", to: "int", onError: 1 } },
                        "day": { $convert: { input: "$cas_JJ", to: "int", onError: 1 } }
                    }
                }
            }
        }
        /*
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
        */
        db.collection('cas')
            .aggregate(
                [
                    stage,
                    {
                        $match: filter
                    },
                    { $skip: page * pagesize },
                    { $limit: pagesize }
                ]
            )
            .toArray(function (error, cas) {
                assert.equal(null, error);
                db.collection('cas')
                    .aggregate(
                        [
                            stage,
                            {
                                $match: filter
                            }
                        ]
                    )
                    .toArray(function (err, cas2) {
                        assert.equal(null, err);
                        count = cas2.length
                        callback(cas, count)
                    })
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