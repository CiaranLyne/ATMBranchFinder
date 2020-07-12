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
const fs = __importStar(require("fs"));
// import test from "./ATMListings/Barclays UK.json";
const listings = JSON.parse(fs.readFileSync("./ATMListings/Barclays UK.json", "utf-8"));
const entries = prepareListings(listings);
const router = express_1.default();
router.get("/", (req, res) => {
    res.send("<html><a href='http://localhost:3000/atm?lat=55.85282300&lng=-4.22867800&dist=10'>http://localhost:3000/atm?lat=55.85282300&lng=-4.22867800&dist=10</a></html>");
});
router.get("/atm", (req, res, next) => {
    // var bank = req.body.bank;
    const lat = parseFloat(req.query["lat"]);
    const lng = parseFloat(req.query["lng"]);
    const dist = parseFloat(req.query["dist"]);
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
function prepareListings(listings) {
    return listings[0].ATM.map(x => {
        const lat = parseFloat(x.Location.PostalAddress.GeoLocation.GeographicCoordinates.Latitude);
        const lng = parseFloat(x.Location.PostalAddress.GeoLocation.GeographicCoordinates.Longitude);
        return { lat, lng, atm: x };
    });
}
//todo: find where I stole this function from
function distance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
// //console.log(BranchFinder(["RBS"],[55.85282300,-4.22867800],10));
