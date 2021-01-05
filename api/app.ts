import express from "express";
import {ATM, ATMListingModel} from "./ATMListingTypes";
import {Branch, BranchListingModel} from "./BranchListingTypes";
import {Settings} from "./SettingsTypes";
import * as AWS from 'aws-sdk';
import cors from "cors";


let bankList: BankData[] = [];
init().then(r => console.log("Init complete."));

const router = express();
router.use(cors());

router.get("/", (req, res) => {
   res.send("<html><a href='http://ciaranlyne.net:80/atm?lat=55.85282300&lng=-4.22867800&dist=10'>http://ciaranlyne.net:80/atm?lat=55.85282300&lng=-4.22867800&dist=10</a></html>");
});

router.get("/atm", (req, res) => {
    const bank = req.query["bank"];
    const lat = parseFloat(req.query["lat"] as string);
    const lng = parseFloat(req.query["lng"] as string);
    const dist = parseFloat(req.query["dist"] as string);

    let filtered: ATMEntry[];
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
    const lat = parseFloat(req.query["lat"] as string);
    const lng = parseFloat(req.query["lng"] as string);
    const dist = parseFloat(req.query["dist"] as string);

    let filtered: BranchEntry[];
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
    const settingsStored: Settings = await getSettings();
    for (let b in settingsStored.Banks) {
        let listingsATM = await getATMListings(settingsStored.Banks[b].BrandName + ".json");
        let listingsBranch = await getBranchListings(settingsStored.Banks[b].BrandName + ".json");

        let newBank : BankData = {
            brandName: settingsStored.Banks[b].BrandName,
            entriesATM: parseEntriesATM(listingsATM),
            entriesBranch: parseEntriesBranch(listingsBranch)
        };

        bankList.push(newBank);
    }
}

interface BankData {
    readonly brandName: string;
    entriesATM: ATMEntry[];
    entriesBranch: BranchEntry[];
}

interface ATMEntry {
    lat: number;
    lng: number;
    atm: ATM;
}

interface BranchEntry {
    lat: number;
    lng: number;
    branch: Branch;
}

async function getATMListings(name: string): Promise<ATMListingModel> {
    const s3: AWS.S3 = new AWS.S3();
    const req: AWS.S3.Types.GetObjectRequest = {
        Bucket: "atmbranch-finder-ciaran",
        Key: `ATMListings/${name}`
    };
    const obj = await s3.getObject(req).promise();
    console.log("Loaded ATM entries: " + name);
    const json = (obj.Body as any).toString('utf-8');
    const listings = JSON.parse(json) as ATMListingModel[];
    return listings[0];
}

async function getBranchListings(name: string): Promise<BranchListingModel> {
    const s3: AWS.S3 = new AWS.S3();
    const req: AWS.S3.Types.GetObjectRequest = {
        Bucket: "atmbranch-finder-ciaran",
        Key: `BranchListings/${name}`
    };
    const obj = await s3.getObject(req).promise();
    console.log("Loaded branch entries: " + name);
    const json = (obj.Body as any).toString('utf-8');
    const listings = JSON.parse(json) as BranchListingModel[];
    return listings[0];
}

async function getSettings(): Promise<Settings> {
    const s3: AWS.S3 = new AWS.S3();
    const req: AWS.S3.Types.GetObjectRequest = {
        Bucket: "atmbranch-finder-ciaran",
        Key: "settings.json"
    };
    const obj = await s3.getObject(req).promise();
    console.log("Loaded settings.json");
    const json = (obj.Body as any).toString('utf-8');
    return JSON.parse(json) as Settings;
}

function parseEntriesATM(listings: ATMListingModel): ATMEntry[] {
    return listings.ATM.map(x => {
        let lat: number;
        let lng: number;
        try {lat = parseFloat(x.Location.PostalAddress.GeoLocation.GeographicCoordinates.Latitude);} catch {lat = 0}
        try {lng = parseFloat(x.Location.PostalAddress.GeoLocation.GeographicCoordinates.Longitude);} catch {lng = 0}
        return {lat, lng, atm: x};
    })
}

function parseEntriesBranch(listings: BranchListingModel): BranchEntry[] {
    return listings.Branch.map(x => {
        let lat: number;
        let lng: number;
        try {lat = parseFloat(x.PostalAddress.GeoLocation.GeographicCoordinates.Latitude);} catch {lat = 0}
        try {lng = parseFloat(x.PostalAddress.GeoLocation.GeographicCoordinates.Longitude);} catch {lng = 0}
        return {lat, lng, branch: x};
    })
}

function distance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);
    let dLon = deg2rad(lon2-lon1);

    let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; //distance in km
}

function deg2rad(deg: number): number {
    return deg * (Math.PI/180);
}
