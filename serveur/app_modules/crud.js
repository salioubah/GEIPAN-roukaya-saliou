const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbName = 'geipan_database';
// Connection URL
const url = 'mongodb://geipan_user:geipan2020@ds113936.mlab.com:13936/' + dbName;
const client = new MongoClient(url);
exports.findcasByFilter = function (classification, zone, resume, dateCasDebut, dateCasFin, callback) {
    let count;
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        let reqClassification = classification ? classification : { $exists: true };
        let reqZone = zone ? zone : { $exists: true };
        let reqResume = resume ? { $regex: ".*" + resume + ".*", $options: "i" } : { $exists: true };
        let reqDate = (dateCasDebut && dateCasFin) ? { $gte: dateCasDebut, $lte: dateCasFin } : { $exists: true };
        //let filter = { "cas_classification": reqClassification, "cas_zone_nom": reqZone, "cas_resume": reqResume, reqDate }
        db.collection('cas').aggregate(
            [
                {
                    $addFields: {
                        "cas_date": {
                            $dateFromParts: {
                                "cas_AAAA": $year,
                                "cas_MM": $month,
                                "cas_JJ": $day
                            }
                        }
                    }
                },
                {
                    $match:
                    {
                        $and:
                            [
                                { "cas_classification": reqClassification },
                                { "cas_zone_nom": reqZone },
                                { "cas_resume": reqResume },
                                { "cas_date": reqDate }
                            ]
                    }
                }
            ]).toArray().then(cas => {
                count = cas.length
                callback(cas, count)
            })
    });
}
exports.findCasById = function (idCas, callback) { }
exports.findTemoignagesById = function (idTemoignanges, callback) { }
exports.findTemoignagesByCas = function (idCas, callback) { }