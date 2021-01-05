"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AWS = __importStar(require("aws-sdk"));
const cors_1 = __importDefault(require("cors"));
let bankList = [];
init().then(r => console.log("Init complete."));
const router = express_1.default();
router.use(cors_1.default());
router.get("/", (req, res) => {
    res.send("<html><a href='http://ciaranlyne.net:80/atm?lat=55.85282300&lng=-4.22867800&dist=10'>http://ciaranlyne.net:80/atm?lat=55.85282300&lng=-4.22867800&dist=10</a></html>");
});
router.get("/atm", (req, res) => {
    const bank = req.query["bank"];
    const lat = parseFloat(req.query["lat"]);
    const lng = parseFloat(req.query["lng"]);
    const dist = parseFloat(req.query["dist"]);
    let filtered;
    let response = {};
    for (let i in bankList) {
        if (bankList[i].brandName == bank) {
            filtered = bankList[i].entriesATM.filter(x => distance(x.lat, x.lng, lat, lng) <= dist);
            filtered = filtered.filter(x => (x.lat != 0) && (x.lng != 0));
            response = filtered.map(x => {
                return {
                    lat: x.lat,
                    lng: x.lng,
                    id: x.atm.Identification
                };
            });
        }
    }
    res.send(response);
});
router.get("/branch", (req, res) => {
    const bank = req.query["bank"];
    const lat = parseFloat(req.query["lat"]);
    const lng = parseFloat(req.query["lng"]);
    const dist = parseFloat(req.query["dist"]);
    let filtered;
    let response = {};
    for (let i in bankList) {
        if (bankList[i].brandName == bank) {
            filtered = bankList[i].entriesBranch.filter(x => distance(x.lat, x.lng, lat, lng) <= dist);
            filtered = filtered.filter(x => (x.lat != 0) && (x.lng != 0));
            response = filtered.map(x => {
                return {
                    lat: x.lat,
                    lng: x.lng,
                    id: x.branch.Identification
                };
            });
        }
    }
    res.send(response);
});
const port = 80;
router.listen(port, () => console.log(`Listening on port ${port}.`));
async function init() {
    const settingsStored = await getSettings();
    for (let b in settingsStored.Banks) {
        let listingsATM = await getATMListings(settingsStored.Banks[b].BrandName + ".json");
        let listingsBranch = await getBranchListings(settingsStored.Banks[b].BrandName + ".json");
        let newBank = {
            brandName: settingsStored.Banks[b].BrandName,
            entriesATM: parseEntriesATM(listingsATM),
            entriesBranch: parseEntriesBranch(listingsBranch)
        };
        bankList.push(newBank);
    }
}
async function getATMListings(name) {
    const s3 = new AWS.S3();
    const req = {
        Bucket: "atmbranch-finder-ciaran",
        Key: `ATMListings/${name}`
    };
    const obj = await s3.getObject(req).promise();
    console.log("Loaded ATM entries: " + name);
    const json = obj.Body.toString('utf-8');
    const listings = JSON.parse(json);
    return listings[0];
}
async function getBranchListings(name) {
    const s3 = new AWS.S3();
    const req = {
        Bucket: "atmbranch-finder-ciaran",
        Key: `BranchListings/${name}`
    };
    const obj = await s3.getObject(req).promise();
    console.log("Loaded branch entries: " + name);
    const json = obj.Body.toString('utf-8');
    const listings = JSON.parse(json);
    return listings[0];
}
async function getSettings() {
    const s3 = new AWS.S3();
    const req = {
        Bucket: "atmbranch-finder-ciaran",
        Key: "settings.json"
    };
    const obj = await s3.getObject(req).promise();
    console.log("Loaded settings.json");
    const json = obj.Body.toString('utf-8');
    return JSON.parse(json);
}
function parseEntriesATM(listings) {
    return listings.ATM.map(x => {
        let lat;
        let lng;
        try {
            lat = parseFloat(x.Location.PostalAddress.GeoLocation.GeographicCoordinates.Latitude);
        }
        catch (_a) {
            lat = 0;
        }
        try {
            lng = parseFloat(x.Location.PostalAddress.GeoLocation.GeographicCoordinates.Longitude);
        }
        catch (_b) {
            lng = 0;
        }
        return { lat, lng, atm: x };
    });
}
function parseEntriesBranch(listings) {
    return listings.Branch.map(x => {
        let lat;
        let lng;
        try {
            lat = parseFloat(x.PostalAddress.GeoLocation.GeographicCoordinates.Latitude);
        }
        catch (_a) {
            lat = 0;
        }
        try {
            lng = parseFloat(x.PostalAddress.GeoLocation.GeographicCoordinates.Longitude);
        }
        catch (_b) {
            lng = 0;
        }
        return { lat, lng, branch: x };
    });
}
function distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1);
    let dLon = deg2rad(lon2 - lon1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; //distance in km
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
