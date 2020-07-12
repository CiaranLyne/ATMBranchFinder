/*
    Intended ATM Params:
        - BrandName
        - Longitude
        - Latitude
        - Services
        - Wheelchair
        - Currency

*/


//todo: find where I stole this function from
function distance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lon2-lon1); 

    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
};
  
function deg2rad(deg) {
    return deg * (Math.PI/180);
};

var fs = require('fs');

function ATMFinder(inputBrandNames,inputLoc,inputDistance) {
    /*
        inputBrandNames //String array, using bank codes
        inputLoc //Float array, x for lat y for lng
        inputDistance //0 means ignore distance, km, Integer
    */

    const dir = './ATMListings/';
    var ATMArray = [];

    var files = fs.readdirSync(dir)
        
    files.forEach(file => {
        fileJSON = JSON.parse(fs.readFileSync(dir + file));
        var i;

        if(inputBrandNames.includes(fileJSON['0']['BrandName'])) {
            for(i = 0; i < fileJSON['0']['ATM'].length; i++) {
                if((inputDistance != 0) && (distance(
                    inputLoc[0],
                    inputLoc[1],
                    parseFloat(fileJSON['0']['ATM'][i]['Location']['PostalAddress']['GeoLocation']['GeographicCoordinates']['Latitude']),
                    parseFloat(fileJSON['0']['ATM'][i]['Location']['PostalAddress']['GeoLocation']['GeographicCoordinates']['Longitude']))
                    ) < inputDistance) {
                        ATMArray.push(fileJSON['0']['ATM'][i]);
                } else if (inputDistance == 0) {
                    ATMArray.push(fileJSON['0']['ATM'][i]);
                };
            };
        };
    });

    console.log(ATMArray.length);

    return JSON.stringify(ATMArray);
};

function BranchFinder(inputBrandNames,inputLoc,inputDistance) {
    /*
        inputBrandNames //String array, using bank codes
        inputLoc //Float array, x for lat y for lng
        inputDistance //0 means ignore distance, km, Integer
    */

    const dir = './BranchListings/';
    var BranchArray = [];

    var files = fs.readdirSync(dir)
        
    files.forEach(file => {
        fileJSON = JSON.parse(fs.readFileSync(dir + file));
        var i;

        if(inputBrandNames.includes(fileJSON['0']['BrandName'])) {
            for(i = 0; i < fileJSON['0']['Branch'].length; i++) {

                console.log(fileJSON['0']['Branch'][i]['PostalAddress']);

                if(fileJSON['0']['Branch'][i]['PostalAddress'].hasOwnProperty('GeoLocation')) {
                    if((inputDistance != 0) && (distance(
                        inputLoc[0],
                        inputLoc[1],
                        parseFloat(fileJSON['0']['Branch'][i]['PostalAddress']['GeoLocation']['GeographicCoordinates']['Latitude']),
                        parseFloat(fileJSON['0']['Branch'][i]['PostalAddress']['GeoLocation']['GeographicCoordinates']['Longitude']))
                        ) < inputDistance) {
                            BranchArray.push(fileJSON['0']['Branch'][i]);
                    } else if (inputDistance == 0) {
                        BranchArray.push(fileJSON['0']['Branch'][i]);
                    };
                };
            };
        };
    });

    console.log(BranchArray.length);

    return JSON.stringify(BranchArray);
};

var express = require('express');
var bodyParser = require('body-parser')
var router = express();

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post("/atm", function(req, res, next){
    var bank = req.body.bank;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var dist = req.body.dist;

    console.log(req.body.bank);

    res.send(ATMFinder([bank],[lat,lng],dist));
});

router.post("/branch", function(req, res, next){
    var bank = req.body.bank;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var dist = req.body.dist;

    console.log(req.body.bank);

    res.send(BranchFinder([bank],[lat,lng],dist));
});

const port = 3000;

router.listen(port, () => console.log(`Listening on port ${port}.`));

//console.log(BranchFinder(["RBS"],[55.85282300,-4.22867800],10));