import express from "express";
import {ATM, ATMListingModel} from "./ATMListingTypes";
import * as AWS from 'aws-sdk';

let entries: Entry[] = [];
init();

const router = express();

router.get("/", (req, res) => {
   res.send("<html><a href='http://localhost:3000/atm?lat=55.85282300&lng=-4.22867800&dist=10'>http://localhost:3000/atm?lat=55.85282300&lng=-4.22867800&dist=10</a></html>");
});

router.get("/atm", (req, res) => {
    // var bank = req.body.bank;
    const lat = parseFloat(req.query["lat"] as string);
    const lng = parseFloat(req.query["lng"] as string);
    const dist = parseFloat(req.query["dist"] as string);

    const filtered = entries.filter(x => distance(x.lat, x.lng, lat, lng) <= dist);
    const response = filtered.map(x => {
       return {
           lat: x.lat,
           lng: x.lng,
           id: x.atm.Identification
       };
    });

    res.send(response);
});

const port = 3000;
router.listen(port, () => console.log(`Listening on port ${port}.`));

async function init() {
    const listings = await getATMListings("Barclays UK.json");
    entries = parseEntries(listings);
}

interface Entry {
    lat: number;
    lng: number;
    atm: ATM;
}

async function getATMListings(name: string): Promise<ATMListingModel> {
    const s3: AWS.S3 = new AWS.S3();
    const req: AWS.S3.Types.GetObjectRequest = {
        Bucket: "branch-finder-colin",
        Key: `ATMListings/${name}`
    };
    const obj = await s3.getObject(req).promise();
    const json = (obj.Body as any).toString('utf-8');
    const listings = JSON.parse(json) as ATMListingModel[];
    return listings[0];
}

function parseEntries(listings: ATMListingModel): Entry[] {
    return listings.ATM.map(x => {
        const lat = parseFloat(x.Location.PostalAddress.GeoLocation.GeographicCoordinates.Latitude);
        const lng = parseFloat(x.Location.PostalAddress.GeoLocation.GeographicCoordinates.Longitude);
        return {lat, lng, atm: x};
    })
}

//todo: find where I stole this function from
function distance(lat1: number, lon1: number, lat2: number, lon2: number): number {
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
}

function deg2rad(deg: number): number {
    return deg * (Math.PI/180);
}
